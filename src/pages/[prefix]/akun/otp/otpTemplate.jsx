import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import Footer from "@/components/Home/Footer";
import { getEnvironment } from "@/erp/environment";
import Navbar from "@/components/Akun/Navbar";

const colorPrimary = process.env.PUBLIC_THEME_PRIMARY_COLOR;

export async function getServerSideProps() {
  let environment = await getEnvironment();

  return { props: { colorPrimary: colorPrimary, } };
}
export default function App({  }) {
  return (
    <div className="m-4 flex flex-col ">
      <nav className={`bg-[#${colorPrimary}] w-full max-h-[60px] h-full top-0 flex items-center shadow-md z-50 p-4 mb-4`}>
        <h1 className="text-white font-semibold">Citra Niaga Teknologi</h1>
      </nav>
      <p>Assalamualaikum Bapak/Ibu,</p>
      <p className="text-2xl font-bold mb-4">
        Masukkan kode OTP berikut untuk melakukan verifikasi akun.
      </p>
      <div className=" text-center mx-auto w-full items-center bg-white border border-gray-200 rounded-lg shadow max-w-md mb-4">
        <div className=" justify-between p-4 leading-normal">
          <h1 className="mb-3 text-gray-700 ">
            @otp
          </h1>
        </div>
      </div>
      <p className="font-bold">Penting!</p>
      <p className="mb-2">
        Kode hanya dapat berlaku selama 10 menit. Harap pastikan kode tidak
        ditunjukkan kepada siapapun, termasuk pihak yang mengatas namakan.
        
      </p>
      <p>
        Email ini dibuat otomatis, mohon tidak membalas. Jika terdapat
        pertanyaan atau kendala dalam prosesnya, Bapak dapat menghubungi nomor
        berikut untuk terhubung dengan kami. Whatsapp kami:{" "}
        <a href="wa.me/65127532898" className="text-blue-500">
          wa.me/65127532898
        </a>
      </p>
      {/* <Footer company={company} environment={environment}/> */}
    </div>
  );
}
