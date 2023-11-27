import { useRouter } from "next/router";
import {  useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Akun/Navbar";
import Head from "next/head";
import { openApiCompany } from "@/erp/company";
import { PrefixContext }  from "@/components/context/PrefixContext";

export async function getServerSideProps({req, res} :any) {

  let company = await openApiCompany(req.headers.host);
  

  return { props: { company:company } };
}

export default function App({company}:any) {
  const router = useRouter();

  const prefix = useContext(PrefixContext)

  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [topik, setTopik] = useState('');
  const [detail, setDetail] = useState('');
  const [lampiran, setLampiran] = useState('');

  const [errorNamaLengkap, setErrorNamaLengkap] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorWhatsapp, setErrorWhatsapp] = useState('');
  const [errorTopik, setErrorTopik] = useState('');
  const [errorDetail, setErrorDetail] = useState('');
  const [errorLampiran, setErrorLampiran] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if(!namaLengkap){
      setErrorNamaLengkap("Nama harus diisi!");
    }

    if(!email){
      setErrorEmail("Email harus diisi!");
    }

    if(!whatsapp){
      setErrorWhatsapp("Whatsapp harus diisi!");
    }

    if(!topik){
      setErrorWhatsapp("Topik harus diisi!");
    }
    if(!detail){
      setErrorWhatsapp("Detail Topik harus diisi!");
    }

    const response = await fetch('/api/questions', {
      method: 'POST',
      body: JSON.stringify({
        name: namaLengkap,
        email: email,
        whatsapp_number: whatsapp,
        topik: topik,
        detail: detail,
        lampiran: lampiran
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(result => {
      toast.success("Data Berhasil dikirim", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setErrorNamaLengkap("");
      setErrorEmail("");
      setErrorWhatsapp("");
      setErrorTopik("");
      setErrorDetail("");
      setErrorLampiran("");
      setNamaLengkap("");
      setEmail("");
      setWhatsapp("");
      setTopik("");
      setDetail("");
      setLampiran("");
    }).catch(error => {
      toast.error("Data Gagal dikirim", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };
  return (
    <>
      <Head><title>Form Bantuan</title>
      <link rel="icon" href={company.favicon_url} /></Head>
      <div className="bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md min-h-screen">
          <Navbar colorPrimary={company.primary_colour} route={`/${prefix}/akun/bantuan`} title={"Bantuan"} />
          <ToastContainer />
          <div className="mx-4 my-4  pt-12">
            <p className="text-base mb-4 font-medium">
              Pertanyaan lain atau saran kepada kami
            </p>
            <form onSubmit={handleSubmit}>
              <p>Nama Lengkap</p>
              <input
                type="text"
                name="nama"
                value={namaLengkap}
                onChange={(event) =>
                  setNamaLengkap(event.target.value)
                }
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                placeholder="Nama Lengkap"
              />
              {errorNamaLengkap && (
                  <p className="text-xs text-red-500">{errorNamaLengkap}</p>
                )}
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value) 
                }
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                placeholder="jhon@mail.com"
              />
              {errorEmail && (
                <p className="text-xs text-red-500">{errorEmail}</p>
              )}
              <p>No Whatsapp</p>
              <input
                type="tel"
                name="whatsapp_number"
                value={whatsapp}
                onChange={(event) =>
                  setWhatsapp(event.target.value)
                }
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                placeholder="082323xxxxxx"
              />
              {errorWhatsapp && (
                <p className="text-xs text-red-500">{errorWhatsapp}</p>
              )}
              <p>Topik Pertanyaan</p>
              <input
                type="text"
                name="topik"
                value={topik}
                onChange={(event) =>
                 setTopik(event.target.value)
                }
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                placeholder="Topik"
              />
              {errorTopik && (
                <p className="text-xs text-red-500">{errorTopik}</p>
              )}
              <p>Detail Pertanyaan</p>
              <textarea
                name="topik"
                value={detail}
                onChange={(event) =>
                  setDetail(event.target.value) 
                }
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                placeholder="Detail Pertanyaan"
              />
              {errorDetail && (
                <p className="text-xs text-red-500">{errorDetail}</p>
              )}
              <p>Lampiran Pertanyaan</p>
              <input
                type="file"
                name="lampiran"
                value={lampiran}
                onChange={(event) =>
                  setLampiran(event.target.value)
                }
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                placeholder="Lampiran Pertanyaan"
              />
              {errorLampiran && (
                <p className="text-xs text-red-500">{errorLampiran}</p>
              )}
              <button
                type="submit"
                className={`rounded-[4px]  w-full p-2 my-2 text-white`}
                style={{backgroundColor:company.accent_colour}}
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
