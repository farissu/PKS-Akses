import BottomNavbar from "@/components/Home/BottomNavbar";
import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";
import { UrlObject } from "url";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import cookie from "js-cookie";
import Head from "next/head";
import { openApiCompany } from "@/erp/company";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PrefixContext } from "@/components/context/PrefixContext";

export async function getServerSideProps(context: any) {
  const { req } = context;

  let company = await openApiCompany(req.headers.host);
  if (req.cookies.tokensso || req.cookies.email) {
    return {
      redirect: {
        destination: `/akun/profile`,
        permanent: false,
      }
    }
  }
  return { props: { company } };
}

export default function App({ company }: any) {
  const router = useRouter();
  const prefix = useContext(PrefixContext)
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({ email: "" });
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  const validateEmail = (email: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (validateEmail(formData.email)) {
      const response = await fetch("/api/createOtp", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.data.success) {
        cookie.set("token", data.data.uuid, { expires: 1 / 24 });
        router.push("/akun/otp?email=" + formData.email);
      }
    } else {
      setEmailError("Format email tidak valid");
    }
  };

  function handleClick(link: string | UrlObject) {
    router.push(link);
  }
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const buttonLogin = useRef(null)
  useEffect(() => {

    if (cookie.get('tokensso') || cookie.get('email')) {
      router.push(`${prefix}/akun/profile`)
    }
    if (window) {
      //@ts-ignore
      window.google?.accounts.id.initialize({
        client_id: '475759875030-r7d9cn9gu2jlt54jer108bphror6g951.apps.googleusercontent.com',
        callback: handleCredentialResponse
      });
      //@ts-ignore
      window.google?.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        // @ts-ignore
        { theme: "outline", size: "large", scope: 'profile email', width: Number(buttonLogin?.current?.clientWidth) }  // customization attributes
      );
      //@ts-ignore
      window.google?.accounts.id.prompt();
    }
  }, [])

  const handleCredentialResponse = (e: any) => {
    cookie.set('tokensso', e.credential)
    if (e.credential) {
      router.push(`${prefix}/akun/profile`)
    }
  }

  return (
    <>
      <AnimatePresence>

        <Head>
          <title>Akun</title>
          <link rel="icon" href={company.favicon_url} />
        </Head>
        <div className="bg-gray-100 flex flex-col items-center" >
          <nav
            className={`h-[60px] flex items-center px-4 sm:px-4 py-2.5 bg-white shadow-md max-w-md w-full`}
          >
            <Link href="/">
              <img src={company.image_url} width="80" height="36" />
            </Link>
          </nav>
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full max-w-sm">
              <div className="bg-white shadow-md min-h-screen">
                {/* <Navbar colorPrimary={company.primary_colour} route={""} title={"Profile"} /> */}

                <div className="px-4 pt-12">
                  <div>
                    <h1 className="font-bold text-base mb-2">Masuk dan Dapatkan</h1>
                    <p className="text-sm mb-4">
                      Kemudahan mengelola donasi anda serta mengakses lebih banyak fitur
                    </p>
                    <div>
                      {/* <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded   block w-full p-2.5 placeholder:text-orange-500 mb-2"
                          // placeholder="Masukan Nomor Telepon Atau Email Aktif"
                          placeholder="Masukan Email Aktif"
                        />
                        {emailError && (
                          <p className="text-xs text-red-500">{emailError}</p>
                        )}
                        <button ref={buttonLogin}
                          type="submit"
                          className={`rounded-[4px] w-full p-2 my-2 text-white`}
                          style={{ backgroundColor: company.accent_colour }}
                        >
                          Masuk
                        </button>
                      </form> */}
                    </div>


                    <div className="">
                      {/* <p className="text-center text-sm mb-2">Lebih Cepat</p> */}
                      <div id="buttonDiv" ></div>



                      {/* <div className="flex gap-3 mb-2">
                      <button
                        onClick={() => loginSso()} 
                        id="buttonDiv"
                        className="py-2 rounded border-[1px] px-2 w-full text-orange-500 flex items-center justify-center gap-4 "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                          className="iconify iconify--flat-color-icons"
                        >
                          <path
                            fill="#FFC107"
                            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                          ></path>
                          <path
                            fill="#FF3D00"
                            d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                          ></path>
                          <path
                            fill="#4CAF50"
                            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                          ></path>
                          <path
                            fill="#1976D2"
                            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                          ></path>
                        </svg>
                        Masuk Dengan Google
                      </button>
                    </div> */}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleClick(`${prefix}/akun/tentang`)}
                      type="button"
                      className="text-left border-b w-full p-2 my-2 text-black flex items-center"
                    >
                      <AiOutlineInfoCircle className="h-6 w-6 mx-4 my-2" />
                      Tentang
                    </button>
                    <button
                      onClick={() => handleClick(`${prefix}/akun/bantuan`)}
                      type="button"
                      className=" text-left border-b w-full p-2 my-2 text-black flex items-center"
                    >
                      <MdOutlineQuestionAnswer className="h-6 w-6 mx-4 my-2" />
                      Bantuan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <BottomNavbar active="Profil" colour={company.accent_colour} />
        </div>
      </AnimatePresence>
    </>
  );
}
