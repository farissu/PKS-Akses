import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { IoArrowBack, IoShareSocialOutline } from "react-icons/io5";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { openApiCompany } from "@/erp/company";
import { AnimatePresence, motion } from "framer-motion";
import { PrefixContext } from "@/components/context/PrefixContext";
import Image from "next/image";
export async function getServerSideProps({ params, req }: any) {
  let company = await openApiCompany(req.headers.host);

  return {
    props: {
      slug: params.slug,
      company,
    },
  };
}

export default function Berita({ slug, company }: any) {
  const router = useRouter();
  const prefix = useContext(PrefixContext)
  const ref = router.query.source ?? "";
  const [showPopup, setShowPopup] = useState(false);
  let [berita, setBerita] = useState<any>({});
  let [program, setProgram] = useState<any>({});
  let [date, setDate] = useState("");
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };



  function donasi() {
    router.push(`${prefix != null && prefix != "" ? prefix + "/" : "/program/"}${program.slug + window.location.search}`);
  }

  function handleBackClick() {
    router.back();
  }

  useEffect(() => {
    fetch("/api/berita/pilihan?slug=" + slug)
      .then((res) => res.json())
      .then((data) => {
        setProgram(data.program[0]);
        setBerita(data.news[0]);
      });
  }, []);



  const urlGambarDefault = "/default.png"; // Ganti dengan URL gambar default yang diinginkan

  function formatDate(timestamp: string) {
    const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const dateObj = new Date(timestamp);

    const day = daysOfWeek[dateObj.getUTCDay()];
    const date = dateObj.getUTCDate();
    const month = months[dateObj.getUTCMonth()];
    const year = dateObj.getUTCFullYear();

    return {
      day,
      date,
      month,
      year
    };
  }

  const handleGambarError = (event: any) => {
    event.target.src = urlGambarDefault;
  };
  const write_date = formatDate(berita.create_date)

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Head>
            <title>{berita.name}</title>
            <link rel="icon" href={company.favicon_url} />
          </Head>
          <MetaHead program={berita} company={company} />
          <div className="mx-auto min-h-screen shadow-lg max-w-md relative bg-gray-300">
            <nav className="border-gray-200 h-[60px] flex items-center px-4 sm:px-4 py-2.5 bg-white">
              <button onClick={handleBackClick}>
                <IoArrowBack className="text-black w-6 h-6 mr-4" />
              </button>
              <h1 className="text-base font-semibold">Berita</h1>
            </nav>

            <div
              onClick={donasi}
              className="cursor-pointer bg-white rounded overflow-hidden m-4"
            >
              <div className="flex hover:shadow-md">
                {program.image_url ? (<Image alt={program.name} src={program.image_url ? program?.image_url.replace(/https:\/\/[^/]+\/web\/image\//, program?.url_web) : program.image_url} width={0} sizes="100vw" height={0} className="min-w-[10rem]" />) :
                  (<div className="min-w-[10rem] bg-gray-100 h-[112px] animate-pulse"></div>)
                }

                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h5 className="font-light mb-2 text-gray-500 text-s">
                      Program
                    </h5>
                    <p className="text-base font-semibold text-black-700">
                      {program.name}
                    </p>
                  </div>
                  {/* <div className="mt-2">
              <a href="#" className="text-blue-500 font-semibold">
                Read More
              </a>
            </div> */}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg min-h-screen  mt-1 mb-12">
              <div className="flex">
                <div className="p-4 justify-between text-justify ">
                  <div>
                    {berita.create_date && (
                      <h1 className="text-sm font-semibold">{`${write_date.date} ${write_date.month} ${write_date.year}`}</h1>
                    )}

                    <h1 className="text-[#346FB2] font-semibold mb-2">
                      {berita.name}
                    </h1>
                    <p className="text-sm font-semibold text-gray-500">{date}</p>
                  </div>
                  <div
                    className="text-sm mt-2 berita-desc  h-full"
                    dangerouslySetInnerHTML={{ __html: berita.description }}
                  />
                </div>
              </div>
            </div>

            <div>
              {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full z-10">
                  <div className="max-w-md mx-auto bg-gray-400 opacity-50 h-full"></div>
                </div>
              )}

              <div className="flex items-center justify-center">
                <div
                  className={`fixed z-50 bottom-0 bg-white w-full transition-all duration-500 ${showPopup ? "h-1/4" : "h-0"
                    } max-w-md rounded-tr-xl rounded-tl-xl`}
                >
                  <div className="flex justify-between px-3 py-1">
                    <button onClick={togglePopup} className="p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 22 22"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="flex justify-center px-40">
                      <span
                        className="py-4 px-1 mt-1 flex items-center justify-center"
                        style={{ fontSize: "16px" }}
                      >
                        Bagikan
                      </span>
                    </div>
                  </div>
                  <div className="p-1 w-full">
                    <div className="flex justify-center items-center gap-9 ">
                      <button>
                        <div className="w-8 h-8 border bg-green-500 flex justify-center items-center gap-9">
                          <Icon icon="logos:whatsapp-icon" width="30" height="30" />
                        </div>
                      </button>
                      <button>
                        <div className="w-8 h-8 border border-blue-300 flex justify-center items-center gap-9">
                          <Icon
                            icon="grommet-icons:facebook"
                            color="blue"
                            width="50"
                            height="50"
                          />
                        </div>
                      </button>
                      <button>
                        <div className="w-8 h-8 border bg-cyan-500 flex justify-center items-center gap-9">
                          <Icon
                            icon="basil:twitter-outline"
                            color="white"
                            width="50"
                            height="50"
                          />
                        </div>
                      </button>
                      <button>
                        <div className="w-8 h-8 border bg-cyan-500  justify-center items-center gap-9">
                          <Icon
                            icon="ei:sc-telegram"
                            color="white"
                            width="30"
                            height="30"
                          />
                        </div>
                      </button>

                      <button>
                        <div className="flex items-center justify-center w-8 h-8 border">
                          <Icon
                            icon="el:linkedin"
                            color="#0e76a8"
                            width="50"
                            height="50"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 max-w-md w-full max-h-[60px] h-full bg-white flex justify-between">
              <div className="flex justify-center items-center">
                <button
                  onClick={togglePopup}
                  className="bg-white p-2 ml-4 mr-2 rounded border border-gray-300"
                >
                  <IoShareSocialOutline className="w-6 h-6" />
                </button>
              </div>
              <div
                onClick={donasi}
                className={`flex cursor-pointer justify-center items-center mr-4 my-2 w-full text-white rounded`}
                style={{ backgroundColor: company.accent_colour }}
              >
                <button>Bantu Sekarang</button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}


const MetaHead = ({ program, company }: any) => {
  return (
    <div>
      <Head>
        <title>{program.name ? program.name : company.name}</title>
        <meta name="title" content={program.name ? program.name : company.name} />
        <meta name="description" content={program.description ? program.description : company.description} />
        <meta name="keywords" content="donasi,donatur,kampanye,social crowdfunding" />
        <meta property="og:url" content={typeof window != "undefined" ? window.location.href : ""} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={program.name ? program.name : company.name} />
        <meta property="og:title" content={program.name} />
        <meta property="og:description" content={program.description ? program.description : company.description} />
        <meta property="og:image" content={program.image_url ? program.image_url : company.logo_perusahaan_url} />
        <meta property="og:image:width" content="540" />
        <meta property="og:image:height" content="281" />
        <meta property="og:image:secure_url" content={program.image_url ? program.image_url : company.logo_perusahaan_url} />
        {/* <meta property="fb:app_id" content="159117084768115" /> */}
        <meta name="twitter:card" content="summary" />
        {/* @ts-ignore */}
        <meta name="twitter:site" content={typeof window != "undefined" ? window.location.href : ""} />
        <meta name="twitter:description" content={program.description ? program.description : company.description} />
        <meta name="twitter:title" content={program.name ? program.name : company.name} />
        <meta name="twitter:image" content={program.image_url ? program.image_url : company.logo_perusahaan_url} />
      </Head>
    </div>

  )
}