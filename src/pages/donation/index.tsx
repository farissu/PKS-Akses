import BottomNavbar from "@/components/Home/BottomNavbar";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import cookie from "js-cookie";
import Loading from "./loading";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CompanyContext } from "@/components/context/CompanyContext";
import { PrefixContext } from "@/components/context/PrefixContext";

export default function cekdonasi() {
  const router = useRouter();
  const prefix = useContext(PrefixContext)
  const [isLoading, setIsLoading] = useState(false);
  const company: any = useContext(CompanyContext)
  const [inputKodeDonasi, setKodeDonasi] = useState("");
  const [isDataExist, setIsDataExist] = useState(false);

  useEffect(() => {
    if (cookie.get('tokensso') || cookie.get('email')) {
      setIsLoading(true)
      router.push(`${prefix}/akun/donasi`)
    }
  }, [])


  if (isLoading) {
    return <Loading />;
  }

  //untuk input kode donasi

  // step

  //  const find = await findByIDDonasi(inputKodeDonasi) ini harus di baut ke api ka yang kang nendi kemarin
  // check response findId donasi ada atau ngga ada .
  // do isDataExist , setIsDataExist
  // if ga exist io bikin element" Data tidak ada"
  // if ada datanya io direct ke halaman donasi detail .

  const handleInputChangeKodeDonasi = (event: any) => {
    setKodeDonasi(event.target.value.replace(/[^0-9]/gi, ""));
  };
  const id_donasi = inputKodeDonasi;
  const ref = router.query.source ?? "";

  let handleClick = function () {
    fetch("/api/donasi/check?id_donasi=" + id_donasi)
      .then((res) => res.json())
      .then((data) => {
        if (data.transaction) {
          router.push(
            `/donation/${id_donasi}${ref !== "" ? `?source=${ref}` : ""}`
          );
        } else {
          setIsDataExist(true);
          toast.error("Kode tidak ditemukan", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <>
      <AnimatePresence>

        <Head>
          <title>Cek Donasi</title>
          <link rel="icon" href={company.favicon_url} />
        </Head>
        <div className="bg-gray-100 flex flex-col justify-center items-center">
          <div className="w-full max-w-md ">
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
                <ToastContainer />

                <nav
                  className={`h-[60px] flex items-center px-4 sm:px-4 py-2.5 bg-white shadow-md`}
                >
                  <Link href="/">
                    <img src={company.image_url} width="80" height="36" />
                  </Link>
                </nav>
                <div className="border-[2px]" />
                <div className="bg-white rounded p-4">
                  <div className="flex flex-col">
                    <p className="font-ui-sans block text-black font-bold mb-1">
                      Masuk dan Dapatkan
                    </p>

                    <p className="font-ui-sans block text-sm text-black mb-4">
                      Kemudahan mengelola donasi anda serta,<br></br>mengakses lebih
                      banyak fitur
                    </p>
                    <a href={`${prefix}/akun${ref !== "" ? `?source=${ref}` : ""}`}>
                      <button
                        className={`font-ui-sans mx-auto w-full text-white py-2 mb-4 rounded`}
                        style={{ backgroundColor: company.accent_colour }}
                      >
                        Masuk
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            <BottomNavbar active="Donasi" colour={company.accent_colour} />
          </div>
        </div>

      </AnimatePresence>
    </>
  );
}
