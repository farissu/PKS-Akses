import { useRouter } from "next/router";
import { Suspense, useState, useContext } from "react";
import Navbar from "@/components/Akun/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'cookies'
import Head from "next/head";
import Loading from "./loading";
import { openApiCompany } from "@/erp/company";
// import { useSession, signOut, getSession } from "next-auth/react";
import { findOrCreateByEmail } from "@/erp/donatur";
import { PrefixContext }  from "@/components/context/PrefixContext";
import jwtDecode from "jwt-decode";
export async function getServerSideProps(context: any) {
  const { req , res } = context;
  const prefix = context.params?.prefix;

  let donatur = "";
  let company = await openApiCompany(req.headers.host);

  // const session = await getSession(context);
  // const myCookie = req.headers.cookie;
  let nama = "";
  let affiliate_id = false;
  // @ts-ignore
  const cookies = new Cookies(req, res)
  const token = cookies.get('tokensso')
  const emailFromOtp = cookies.get('email')
    let dataDonatur;
   if (emailFromOtp) {

    const email = emailFromOtp ?? "";
    const name = "";
    dataDonatur = await findOrCreateByEmail(email, name, req.headers.host);
    donatur = dataDonatur;
    
    nama = String(dataDonatur?.name);
  } else if (token) {

    const userInfo: any = jwtDecode(token);
    const email = userInfo.email;
    const name = userInfo.name;
    dataDonatur = await findOrCreateByEmail(email, name, req.headers.host);
    donatur = dataDonatur;
    
    nama = String(dataDonatur?.name);
  } else{
    return {
      redirect: {
        destination: `${prefix ? "/" + prefix + '/akun' : '/akun'}`,
        permanent: false,
      }
    }
  }

  return { props: { donatur: donatur, company } };
}

export default function App({ donatur, company }: any) {
  const prefix = useContext(PrefixContext)
  const router = useRouter();
  const [namaLengkap, setNamaLengkap] = useState(donatur.name);
  const [namaLengkapError, setNamaLengkapError] = useState("");
  const [email, setEmail] = useState(donatur.email);
  const [emailError, setEmailError] = useState("");
  const [whatsapp, setWhatsapp] = useState(donatur.phone);
  const [whatsappError, setWhatsappError] = useState("");
  const [idDonatur, setidDonatur] = useState(donatur.id);
  // const [errors, setErrors] = useState({});

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!namaLengkap) {
      setNamaLengkapError("Nama harus diisi!");
      return;
    }

    if (!email) {
      setEmailError("Email harus diisi!");
      return;
    }

    if (!whatsapp) {
      setWhatsappError("Whatsapp harus diisi!");
      return;
    }

    const response = await fetch("/api/edit-profile", {
      method: "POST",
      body: JSON.stringify({
        id: donatur.id,
        name: namaLengkap,
        email: email,
        whatsapp: whatsapp,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        toast.success("Data Sudah diubah!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        toast.error("Data Gagal diubah", {
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
      <Head>
        <title>Edit Profile</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <Suspense fallback={<Loading />}>
      <div className="bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md min-h-screen">
            <Navbar colorPrimary={company.primary_colour} route={`/${prefix}/akun/profile`} title={"Edit Profile"} />
            <div className="mx-4 pt-16">
              <ToastContainer />
              <form onSubmit={handleSubmit}>
                <p>ID Donatur</p>
                <input
                  type="text"
                  name="id_donatur"
                  readOnly
                  value={idDonatur}
                  className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                  placeholder="ID Donatur"
                />
                <p>
                  Nama Lengkap<span>*</span>
                </p>
                <input
                  type="text"
                  name="nama"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                  placeholder="Nama Lengkap anda"
                />
                {namaLengkapError && (
                  <p className="text-xs text-red-500">{namaLengkapError}</p>
                )}
                <p>
                  Email<span>*</span>
                </p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                  placeholder="jhon@mail.com"
                />

                {emailError && (
                  <p className="text-xs text-red-500">{emailError}</p>
                )}
                <p>
                  No Whatsapp<span>*</span>
                </p>
                <input
                  type="tel"
                  name="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                  placeholder="082323xxxxxx"
                />
                {whatsappError && (
                  <p className="text-xs text-red-500">{whatsappError}</p>
                )}
                {/* <p>Tanggal Lahir</p>
              <input
                type="date"
                name="tgl_lahir"
                onChange={(e) => setTglLahir(e.target.value)}
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                placeholder="dd/mm/yyyy"
              />
              <p>Jenis Kelamin</p>
              <input
                type="text"
                name="jenis_kelamin"
                onChange={(e) => setJenisKelamin(e.target.value)}
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-grey-200 mb-2"
                placeholder="jhon@mail.com"
              /> */}

                <button
                  type="submit"
                  className="rounded-[4px] bg-[#ED6C56] w-full p-2 my-2 text-white"
                >
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </Suspense>
    </>
  );
}
