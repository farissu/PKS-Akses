import BottomNavbar from "@/components/Home/BottomNavbar";
import { useRouter } from "next/router";
import { ImProfile } from "react-icons/im";
import { FaHandHoldingHeart, FaPeopleCarry } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { UrlObject } from "url";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Navbar from "@/components/Akun/Navbar";
import {  getSession } from "next-auth/react";
import { findOrCreateByEmail } from "@/erp/donatur";
import { useContext } from "react";

//@ts-ignore
import Cookies from "cookies";

import Head from "next/head";
import { openApiCompany } from "@/erp/company";

import { PrefixContext } from "@/components/context/PrefixContext";
import jwtDecode from "jwt-decode";
import Link from "next/link";

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const prefix = context.params?.prefix;
  //@ts-ignore
  const cookies = new Cookies(req, res)
  const session = await getSession(context);
  const myCookie = req.headers.cookie;

  const token = cookies.get('tokensso')
  const emailFromOtp = cookies.get('email')
  // const session = await getSession(context);
  let nama = "";
  let affiliate_id = false;

  if (emailFromOtp) {
    const email = emailFromOtp ?? "";
    const name = "";
    let dataDonatur = await findOrCreateByEmail(email, name, req.headers.host);
    nama = String(dataDonatur?.name);

  } else if (token) {
    const userInfo: any = jwtDecode(token);
    const email = userInfo.email;
    const name = userInfo.name;
    let dataDonatur = await findOrCreateByEmail(email, name, req.headers.host);
    nama = String(dataDonatur?.name);
  } else {
    return {
      redirect: {
        destination: `${prefix ? "/" + prefix + '/akun' : '/akun'}`,
        permanent: false,
      }
    }
  }


  let company = await openApiCompany(req.headers.host);

  return {
    props: { namaLengkap: nama, affiliate_id, company },
  };
}

export default function App({ namaLengkap, company, affiliate_id }: any) {
  const router = useRouter();
  // const { data: session, status } = useSession();
  const prefix = useContext(PrefixContext)

  // if (status == "loading") {
  //   return <Loading />;
  // }


  function logout() {
    window.document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.document.cookie = "tokensso=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.push(`${prefix}/akun`)
    // signOut({ callbackUrl: "https://cf2-cnt-fe-dev3.cnt.id/akun" });

  }
  function handleClick(link: string | UrlObject) {
    router.push(link);
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <div className="bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md min-h-screen">
            <Navbar colorPrimary={company.primary_colour} route={""} title={"Profile"} />
            <div className="m-4 pt-12">
              <div>
                <a
                  href="#"
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl"
                >
                  {/* <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src="/docs/images/blog/image-4.jpg"
                    alt=""
                  /> */}
                  <div className="flex flex-col justify-between p-4 bg-white">

                    {namaLengkap != "undefined" ? (
                      <h5 className="mb-2 text-2xl font-bold text-gray-900">
                        {namaLengkap}
                      </h5>
                    ) : (
                      <>
                        <p className="font-bold">Selamat datang,</p>
                        <p> Orang baik mari berkontribusi.</p>
                        <Link href={`${prefix}`} className="mx-auto ml-0 mt-4">
                          <button className="mx-auto px-8 text-white py-2 rounded" style={{ background: company.primary_colour }}>Kontribusi Disini</button>
                        </Link>
                      </>

                    )}


                  </div>
                </a>

                <div>

                  {namaLengkap != "undefined" ? (

                    <button
                      onClick={() => handleClick(`/${prefix}/akun/edit-profile`)}
                      type="button"
                      className="text-left border-b w-full p-2 my-2 text-black flex items-center"
                    >
                      <ImProfile className="h-6 w-6 mx-4 my-2" />
                      Edit Profil
                    </button>
                  ) : null}

                  {namaLengkap != "undefined" ? (
                    <>

                      <button
                        onClick={() => handleClick(`/${prefix}/akun/donasi`)}
                        type="button"
                        className=" text-left border-b w-full p-2 my-2 text-black flex items-center"
                      >
                        <FaHandHoldingHeart className="h-6 w-6 mx-4 my-2" />
                        Kontribusi Saya
                      </button>
                    </>

                  ) : null}

                  {
                    affiliate_id != false ? <button
                      onClick={() => handleClick(`/${prefix}/akun/affiliate`)}
                      type="button"
                      className=" text-left border-b w-full p-2 my-2 text-black flex items-center"
                    >
                      <FaPeopleCarry className="h-6 w-6 mx-4 my-2" />
                      Affiliate
                    </button> : null
                  }
                  <button
                    onClick={() => logout()}
                    type="button"
                    className=" text-left border-b w-full p-2 my-2 text-black flex items-center"
                  >
                    <RxExit className="h-6 w-6 mx-4 my-2" />
                    Keluar
                  </button>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleClick(`/${prefix}/akun/tentang`)}
                  type="button"
                  className="text-left border-b w-full p-2 my-2 text-black flex items-center"
                >
                  <AiOutlineInfoCircle className="h-6 w-6 mx-4 my-2" />
                  Tentang
                </button>
                <button
                  onClick={() => handleClick(`/${prefix}/akun/bantuan`)}
                  type="button"
                  className=" text-left border-b w-full p-2 my-2 text-black flex items-center"
                >
                  <MdOutlineQuestionAnswer className="h-6 w-6 mx-4 my-2" />
                  Bantuan
                </button>
              </div>
            </div>
          </div>
        </div >
        <BottomNavbar active="Profil" colour={company.accent_colour} />
      </div >
    </>
  );
}
