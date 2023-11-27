import React, { useState, useContext } from "react";
import { IoCopyOutline, IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/router";
import { CgDanger } from "react-icons/cg"
import { PrefixContext } from "@/components/context/PrefixContext";

const colorPrimary = process.env.PUBLIC_THEME_PRIMARY_COLOR;
const colorSecondary = process.env.PUBLIC_THEME_SECONDARY_COLOR;

export default function Intruction() {
    const [nominal, setNominal] = useState("Rp1.000");
    const [iddonasi, setIdDonasi] = useState("453136095277");
    const [rekening, setRekening] = useState("1393652946");
    const router = useRouter();
    const ref = router.query.source ?? ''

    const id_donasi = iddonasi

    const prefix = useContext(PrefixContext)
    function cekStatus() {
        router.push(`${prefix}/donation/${id_donasi}${ref !== '' ? `?source=${ref}` : ''}`);
    }

    const copyIdDonasi = async () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(iddonasi);
            } catch (err) {
            }
        }
    };
    const copyRekening = async () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(rekening);
            } catch (err) {
            }
        }
    };

    const copyToClipboard = async () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(nominal);
            } catch (err) {
            }
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const [caraBayar, setCaraBayar] = useState(false);

    const toggleCaraBayar = () => {
        setCaraBayar(!caraBayar);
    };

    return (
      <div className="bg-gray-100">
        <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
          <div className={`w-full max-h-[110px] h-full bg-[#${colorPrimary}]`}>
            <div className="text-white p-4 text-sm">
              <p className="mb-2">Batas Waktu Pembayaran</p>
              <p className="font-semibold">Senin, 16 Januari 2023 14:24 WIB</p>
            </div>
          </div>
          <div className="rounded-t-[10px] bg-white z-50 px-4 pt-6 pb-4">
            <div className="flex pb-4 items-center">
              <img
                className="max-h-7 h-full w-auto max-w-[90px] mr-4"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png"
                alt="logo"
              />
              <div className="text-sm">
                <p className="text-gray-400">BCA</p>
                <p className="">Citra Niaga Teknologi</p>
              </div>
            </div>
            <div className="w-full p-4 bg-gray-100 mt-4 rounded flex justify-between items-center drop-shadow-md">
              <div>
                <p className="text-sm">Nomor Rekening</p>
                <p className="font-bold text-xl">1393652946</p>
              </div>
              <button
                onClick={copyRekening}
                className="text-[#2972b6] flex justify-center items-center gap-2"
              >
                <p>Salin</p>
                <IoCopyOutline />
              </button>
            </div>
            <div className="w-full p-4 bg-gray-100 mt-4 rounded drop-shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">Jumlah Donasi</p>
                  <p className="font-bold text-xl">Rp1.000</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="text-[#2972b6] flex justify-center items-center gap-2"
                >
                  <p>Salin</p>
                  <IoCopyOutline />
                </button>
              </div>
              <div className="w-full p-4 mt-4 bg-[#FFEFBC] rounded items-center flex gap-2">
                <CgDanger className="w-6 h-6 text-orange-400 flex-shrink-0" />
                <p className="text-sm">
                  <b>PENTING !</b> Pastikan transfer tepat sampai 3 digit
                  terakhir agar donasi terverifikasi
                </p>
              </div>
            </div>
          </div>
          <div className="border-[2px]" />
          <div className="p-4">
            <button className="w-full" onClick={toggleCaraBayar}>
              <div
                className={`p-4 flex border bg-white justify-between items-center ${
                  caraBayar ? "rounded-t" : "drop-shadow-md rounded"
                }`}
              >
                <div>
                  <p className="text-sm">Cara Pembayaran</p>
                </div>
                <div className="text-gray-500">
                  {caraBayar ? (
                    <IoChevronForward className="w-5 h-5 rotate-90" />
                  ) : (
                    <IoChevronForward className="w-5 h-5" />
                  )}
                </div>
              </div>
            </button>
            <div className={`${caraBayar ? "" : "hidden"} `}>
              <div className="w-full border-x border-b text-sm px-4 py-2">
                <p className="font-semibold">Cara Pembayaran</p>
                <ol style={{ listStyleType: "decimal" }} className="pl-4">
                  <li>
                    Lakukan pembayaran melalui ATM / mobile banking / SMS
                    banking / kantor bank terdekat.
                  </li>
                  <li>Pilih Menu transfer.</li>
                  <li>
                    Isi <b>nomor rekening</b> tujuan sesuai yang ada di halaman
                    pembayaran <b>(a.n Citra Niaga Teknologi).</b>
                  </li>
                  <li>
                    Masukan <b>nominal donasi</b> sesuai jumlah donasimu,
                    termasuk <b>3 digit terakhir.</b>
                  </li>
                  <li>
                    Pembayaran akan diverifikasi. Waktu verifikasi paling lambat
                    1x24 jam untuk sesama bank, dan 2x24 jam dihari jika antar
                    bank berbeda.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="border-[2px]" />
          <div className="p-4">
            <div className="text-sm flex items-center mb-4">
              <p className="mr-2">Kode Donasi</p>
              <button
                onClick={copyIdDonasi}
                className="text-[#2972b6] font-semibold gap-1 flex justify-center items-center "
              >
                <p>{iddonasi}</p>
                <IoCopyOutline />
              </button>
            </div>
            <button
              className={`w-full ${isOpen ? "" : "pb-16"}`}
              onClick={toggleAccordion}
            >
              <div
                className={`p-4 flex border bg-white justify-between items-center ${
                  isOpen ? "rounded-t" : "drop-shadow-md rounded"
                }`}
              >
                <div>
                  <p className="text-sm">Rincian Donasi</p>
                </div>
                <div className="text-gray-500">
                  {isOpen ? (
                    <IoChevronForward className="w-5 h-5 rotate-90" />
                  ) : (
                    <IoChevronForward className="w-5 h-5" />
                  )}
                </div>
              </div>
            </button>
            <div className={`pb-16 ${isOpen ? "" : "hidden"} `}>
              <div className="w-full border-x border-b text-sm px-4 py-2">
                <p>Nama</p>
                <p className="font-semibold">Muhammad Dwi Prasetyo</p>
              </div>
              <div className="w-full border-x border-b text-sm px-4 py-2">
                <p>Nominal Donasi</p>
                <p className="font-semibold">Rp1.000</p>
              </div>
              <div className="w-full border-x border-b text-sm px-4 py-2">
                <p>Metode Pembayaran</p>
                <p className="font-semibold">Gopay</p>
              </div>
              <div className="w-full border-x border-b text-sm px-4 py-2">
                <p>Tanggal Donasi</p>
                <p className="font-semibold">16 Januari 2022, 10:32</p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={cekStatus}
            className="max-w-md w-full bottom-0 fixed"
          >
            <div className="bg-[#ED6C56] hover:bg-red-500 text-white m-4 p-3 rounded">
              <p>Cek Status pembayaran</p>
            </div>
          </button>
        </div>
      </div>
    );
}