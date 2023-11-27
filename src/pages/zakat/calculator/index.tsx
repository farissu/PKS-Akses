import React, { useState, SetStateAction, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { IoArrowBack, IoClose } from "react-icons/io5";
import formatRupiah, { Currency } from "@/erp/Helpers/formatRupiah";
import { openApiProgram, openApiProgramAll } from "@/erp/program";
import Loading from "./loading";
import Head from "next/head";
import { openApiCompany } from "@/erp/company";
import { PrefixContext } from "@/components/context/PrefixContext";

export async function getServerSideProps({req}:any) {
  let program = await openApiProgramAll(req.headers.host);

  let company = await openApiCompany(req.headers.host);
  let colorPrimary = company.primary_colour;

  if (program) {
    program.forEach((item:any) => {
      item.categoryname = item.categoryname ?? null;
    });
  }

  return { props: { program: program, colorPrimary: colorPrimary, company } };
}

export default function CalculatorZakat({ program, colorPrimary, company }: any) {
  const datas = program.map((item: any) => item);
  const zakat = datas.filter((item: any) => {
    const categoryname = item.categoryname ?? "";
    return categoryname.toLowerCase() === "zakat";
  });
  const [isLoading, setLoading] = useState(false);
  const infaq = datas?.filter((item: any) => {
    const categoryname = item.categoryname ?? "";
    return categoryname.toLowerCase() === "infaq";
  });
  const zakatFilter = datas.filter((item: any) => {
    const slug = item.slug?.toLowerCase();
    const categoryname = item.categoryname?.toLowerCase();
    return slug === "zakat-penghasilan" && categoryname === "zakat";
  });

  const [showPopupHeader, setShowPopupHeader] = useState(false);
  const router = useRouter();
  function handlePopupCloseHeader() {
    setShowPopupHeader(false);
  }
  function handleIconClickHeader() {
    setShowPopupHeader(true);
  }
  const prefix = useContext(PrefixContext)
  const [hargaEmas, setHargaEmas] = useState<number>(0);
  const [penghasilan, setPenghasilan] = useState<number | null>(null);
  const [pendapatan, setPendapatan] = useState<number | null>(null);
  const [hutang, setHutang] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [hasilPendapatan, setHasilPendapatan] = useState<number>(0);
  const [hasilPenghasilan, setHasilPenghasilan] = useState<number>(0);
  const [totalHutang, setTotalHutang] = useState<number>(0);
  const [isWajibZakat, setIsWajibZakat] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [sum, setSum] = useState<number>(0);
  const [directZakat, setDirectZakat] = useState<string>(
    zakatFilter.length > 0 ? zakatFilter[0].slug ?? "" : ""
  );

  const [directInfaq, setDirectInfaq] = useState<string>(
    infaq.length > 0 ? infaq[0].slug ?? "" : datas[0]?.slug ?? ""
  );
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const hasilPenghasilan = penghasilan ? penghasilan * 0.025 : 0;
    const hasilPendapatan = pendapatan ? pendapatan * 0.025 : 0;
    const totalHutang = hutang ? hutang * 0.025 : 0;
    const sum = (penghasilan ?? 0) + (pendapatan ?? 0) - (hutang ?? 0);
    const total = hasilPenghasilan + hasilPendapatan - totalHutang;

    if (sum < 0 || total < 0) {
      setHasilPendapatan(0);
      setHasilPenghasilan(0);
      setTotalHutang(0);
    } else {
      setHasilPendapatan(hasilPendapatan);
      setHasilPenghasilan(hasilPenghasilan);
      setTotalHutang(totalHutang);
    }

    setTotal(total);
    setSum(sum);
    const bulanan = (hargaEmas * 85) / 12;
    if (sum > bulanan || sum > bulanan * 12) {
      setIsWajibZakat(true);
      setButtonText("Tunaikan Zakat");
    } else if (total == 0) {
      setButtonText("Masukan Nominal");
    } else {
      setIsWajibZakat(false);
      setButtonText("Infaq Sekarang");
    }
  }, [
    penghasilan,
    pendapatan,
    hutang,
    sum,
    hargaEmas,
    directZakat,
    router,
    total,
  ]);

  useEffect(() => {
    setLoading(true);
    const fetchPrice = async () => {
      try {
        const response = await fetch("/api/emas");
        const data = await response.json();
        setHargaEmas(data.price);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrice();
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasErrors = false;

    if (total == null || total == 0) {
      setError("*Mohon diisi terlebih dahulu");
      hasErrors = true;
    } else {
      setError("");
    }
    if (!hasErrors) {
      handleZakat();
    }
  };
  const ref = router.query.source ?? "";
  function handleZakat() {
    if (isWajibZakat == true) {
      router.push(
        `${prefix != null && prefix != "" ?  prefix +"/" : "/program/" }${directZakat}/donasi?total=${total}${
          ref !== "" ? `?source=${ref}` : ""
        }`
      );
    } else {
      router.push(
        `${prefix != null && prefix != "" ?  prefix +"/" : "/program/" }${directInfaq}/donasi?total=${total}${
          ref !== "" ? `?source=${ref}` : ""
        }`
      );
    }
  }

  if (isLoading) return <Loading />;
  return (
    <>
      <Head>
        <title>Kalkulator Zakat</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <div className="bg-gray-100">
        <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
          <div className="bg-white shadow-md min-h-screen">
            <header className={`flex items-center justify-between  text-white p-4`} style={{backgroundColor:colorPrimary}}>
              <div className="flex items-center">
                <button
                  className="flex items-center"
                  onClick={handleIconClickHeader}
                >
                  <IoArrowBack className="w-6 h-6 hover:text-white inline-block align-middle transform mr-2" />
                </button>
                <p className="text-lg font-ui-sans">Zakat</p>
              </div>
            </header>

            {showPopupHeader && (
              <>
                <div className="fixed top-0 left-0 w-full h-full z-10 ">
                  <div className="max-w-md mx-auto bg-gray-700 opacity-50 h-full" />
                </div>
                <div className="popup fixed z-50 top-1/2 left-1/2 transform w-full max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-lg shadow-lg">
                  <p className="text-lg font-medium mb-4 flex items-center justify-center">
                    Yakin Mau Keluar
                  </p>
                  <p className="text-sm mb-7 text-center">
                    Apakah anda yakin ingin meninggalkan donasi ini ?
                  </p>
                  <div className="justify-center">
                    <button
                      onClick={handlePopupCloseHeader}
                      className={`w-full mb-3 text-white px-4 py-2 rounded mr-4`}
                      style={{backgroundColor:colorPrimary}}
                    >
                      Lanjutkan Donasi
                    </button>
                    <button
                      onClick={() => router.back()}
                      className="w-full text-white px-4 py-2 rounded"
                      style={{backgroundColor:colorPrimary}}
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </>
            )}
            <form onSubmit={handleSubmit}>
              <div className="bg-white shadow-md rounded p-4">
                <p className="mb-2">Pendapatan per bulan*</p>
                <div
                  className={`${
                    error
                      ? "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md"
                      : "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md mb-4"
                  }`}
                >
                  <input
                    className="font-ui-sans text-sm w-full px-4 py-4 outline-none"
                    type="text"
                    placeholder="Masukkan penghasilan utama anda"
                    value={Currency(pendapatan)}
                    onChange={(event) =>
                      setPendapatan(
                        parseFloat(event.target.value.replace(/[^0-9]/g, "")) ||
                          0
                      )
                    }
                  />
                </div>
                {error && <span className="text-red-600 text-xs">{error}</span>}
                <p className="mb-2">Penghasilan Lain per bulan</p>
                <div className="font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md mb-4">
                  <input
                    className="font-ui-sans text-sm w-full px-4 py-4 outline-none"
                    type="text"
                    placeholder="Masukkan penghasilan lain jika ada"
                    value={Currency(penghasilan)}
                    onChange={(event) =>
                      setPenghasilan(
                        parseFloat(event.target.value.replace(/[^0-9]/g, "")) ||
                          0
                      )
                    }
                  />
                </div>
                <p className="mb-2">Kebutuhan (Utang / Cicilan)</p>
                <div className="font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md mb-4">
                  <input
                    className="font-ui-sans text-sm w-full px-4 py-4 outline-none"
                    type="text"
                    placeholder="Masukkan Utang / Cicilan jika ada"
                    value={Currency(hutang)}
                    onChange={(event) =>
                      setHutang(
                        parseFloat(event.target.value.replace(/[^0-9]/g, "")) ||
                          0
                      )
                    }
                  />
                </div>
              </div>
              <div className="border-[2px]" />
              <div className="m-4 border-x border px-4 py-2 bg-gray-200 text-base">
                <p className="font-bold">Note</p>
                <ol style={{ listStyleType: "decimal" }} className="pl-4">
                  <li>
                    Perhitungan zakat diupdate otomatis berdasarkan update harga
                    emas.
                  </li>
                  <li>
                    Harga emas per gram saat ini {formatRupiah(hargaEmas)}{" "}
                    (www.harga-emas.org).
                  </li>
                </ol>
              </div>
              <div className="text-center mb-36">
                <h6 className="total-zakat text-sm">
                  Total {isWajibZakat ? "Zakat Penghasilan Sebulan" : " "}
                </h6>
                <h3 className="font-bold">{formatRupiah(total)}</h3>
              </div>
              <div className="bg-white max-w-md w-full bottom-0 fixed">
                <div className="w-full p-4">
                  <button
                    type="submit"
                    className=" w-full hover:bg-red-500 text-white p-3 rounded"
                    style={{backgroundColor:colorPrimary}}
                  >
                    <p>{buttonText}</p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
