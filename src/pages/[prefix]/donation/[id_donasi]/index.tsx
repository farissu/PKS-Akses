import React, { useContext, useEffect, useState } from "react";
import { findMendesak } from "@/erp/program";
import formatRupiah from "@/erp/Helpers/formatRupiah";
import { useRouter } from "next/router";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import ProgramCard from "@/components/Home/ProgramCard";
import { IoArrowBack } from "react-icons/io5";
import BottomNavbar from "@/components/Home/BottomNavbar";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { openApiCompany } from "@/erp/company";
import Loading from "../loading";
import { PrefixContext } from "@/components/context/PrefixContext";
export async function getServerSideProps({ params, req }: any) {
  const id_donasi = params.id_donasi as string;

  const pilihan = await findMendesak('true' ,req.headers.host);

  let company = await openApiCompany(req.headers.host);

  return {
    props: {
      pilihan,
      company,
      id_donasi,
    },
  };
}

export default function DetailDonasi({
  pilihan,
  company,
  id_donasi,
}: any) {
  const router = useRouter();
  const ref = router.query.source ?? "";
  const [transaksi, setTransaksi] = useState<any>({});
  const [date, setDate] = useState("");
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const prefix = useContext(PrefixContext)
  function handleBackClick() {
    router.back();
  }
  function Donasi() {
    router.push(
      `${prefix != null && prefix != "" ? prefix + "/" : "/program/"}${transaksi.slug}${ref !== "" ? `?source=${ref}` : ""}`
    );
  }

  useEffect(() => {
    fetch("/api/donasi/detail?id_donasi=" + id_donasi)
      .then((res) => res.json())
      .then((data) => {
        setTransaksi(data.transaction);
        let date = new Date(data.transaction.create_date);
        date.setHours(date.getHours() + 7);
        if (date) {
          let create_date = format(date, "d MMM yyyy, HH:mm", { locale: id });
          setDate(create_date);
        }
        setState(data.transaction.state);
        setIsLoading(false);
      });
  }, [date]);

  if (isLoading) {
    return <Loading />
  }


  return (
    <>
      <Head>
        <title>Detail Donasi</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <AnimatePresence>
        <motion.div initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.2 }} className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md">
              <nav
                style={{ backgroundColor: company.primary_colour }}
                className={`fixed max-w-md w-full max-h-[60px] h-full top-0 flex items-center shadow-md z-50 p-4 text-white`}
              >
                <button onClick={handleBackClick}>
                  <IoArrowBack className="w-6 h-6 mr-4" />
                </button>
                <h1 className="text-white font-semibold">Detail Donasi</h1>
              </nav>
              {transaksi ? (
                <div className="bg-white shadow-md rounded p-4 pt-20">
                  <div className="mb-4">
                    <div className="border border-gray-300 rounded-md p-4">
                      <div className="text-ig flex justify-between">
                        <div className="text-left">Tanggal</div>
                        <div className="text-right">{date}</div>
                      </div>

                      <hr className="my-2 border-gray-300" />

                      <div className="text-ig flex justify-between">
                        <div className="text-left">Kode Donasi</div>
                        <div className="text-right">{transaksi.id_donasi}</div>
                      </div>

                      <hr className="my-2 border-gray-300" />

                      <div className="text-ig flex justify-between">
                        <div className="text-left">Status</div>
                        <div
                          className="text-righ"
                          style={{
                            color:
                              state === "Pending"
                                ? "gray"
                                : state === "Paid"
                                  ? "blue"
                                  : "red",
                          }}
                        >
                          {state === "Pending"
                            ? "Dibatalkan"
                            : state === "Paid"
                              ? "Berhasil"
                              : "Diproses"}
                        </div>
                      </div>
                    </div>

                    <hr className="my-4 border-gray-300" />

                    <p className=" block text-black font-bold text-lg mb-4">
                      Program
                    </p>
                    <div className="border rounded flex items-center bg-white leading-[1.25em] border-gray-200 max-h-full mb-4">
                      <figure className="m-0 mr-5 flex aspect-[16/10] h-fit flex-1 items-center justify-center">
                        <Image
                          src={transaksi.program_url}
                          alt={transaksi.name}
                          width={200}
                          height={125}
                          decoding="async"
                          data-nimg="1"
                          quality={30}
                          priority
                          className="h-full w-full object-fill rounded-bl rounded-tl"
                        />
                      </figure>
                      <div className="pr-2 py-2 max-w-[65%] flex-col flex-1">
                        <h3 className="font-semibold text-xs h-8 w-full line-clamp-2">
                          {transaksi.name}
                        </h3>
                        <div className="mt-2 flex flex-col w-full text-sm md:max-w-[360px]:text-[10px]">
                          <a
                            onClick={() => {
                              router.push(
                                `${prefix != null && prefix != "" ? prefix + "/" : "/program/"}${transaksi.slug}${ref !== "" ? `?source=${ref}` : ""
                                }`
                              );
                            }}
                          >
                            <button
                              style={{ backgroundColor: company.primary_colour }}
                              className={`px-3 py-1  hover:contrast-50 text-white rounded text-sm`}
                            >
                              Donasi Lagi
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>

                    <hr className="my-4 border-gray-300" />

                    <p className=" block text-black font-bold text-lg">
                      Rincian Donasi
                    </p>

                    <div className="mt-4 border border-gray-300 rounded-md p-4">
                      <div className="text-ig flex justify-between">
                        <div className="text-left">Metode Pembayaran</div>
                        <div className="text-right">{transaksi.nama_payment}</div>
                      </div>

                      <hr className="my-2 border-gray-300" />

                      <div className="text-ig flex justify-between">
                        <div className="text-left">Nominal Donasi</div>
                        <div className="text-right">{transaksi.amount}</div>
                      </div>

                      <hr className="my-2 border-gray-300" />

                      <div className="text-ig flex justify-between">
                        <div className="text-left">Kode Unik</div>
                        <div className="text-right">{transaksi.kode_unik ? transaksi.kode_unik : 0}</div>
                      </div>

                      <hr className="my-2 border-gray-300" />

                      <div className="text-ig flex justify-between">
                        <div className="text-left font-bold">Total Donasi</div>
                        <div className="text-right font-bold">
                          {transaksi.amount}
                        </div>
                      </div>
                    </div>

                    <hr className="my-4 border-gray-300" />

                    <p className="block text-lg text-black font-bold mb-4">
                      Mungkin Anda Tertarik
                    </p>
                    <div className="grid grid-cols-2 grid-flow-row gap-4 mb-20">
                      {pilihan.slice(0, 4).map((item: any) => {
                        return (
                          <ProgramCard
                            key={item.id}
                            thumbnail={item.image_url.replace(/https:\/\/[^/]+\/web\/image\//, item.url_web)}
                            name={item.name}
                            category_ids={item.categoryname || null}
                            total_funded={formatRupiah(item.total_funded)}
                            slug={item.slug}
                            expire_date={item.days_to_expire}
                            target={formatRupiah(item.target)}
                            colorPrimary={company.primary_colour}
                            bgColour={item.color}
                            textColour={item.text_color}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white"></div>
              )}
              <BottomNavbar />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </>
  );
}
