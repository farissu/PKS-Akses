
import { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import { findBySlugNew } from '@/erp/program'
import formatRupiah from '@/erp/Helpers/formatRupiah'
import { useContext, useEffect, useMemo, useState, useRef } from 'react'
import { CompanyContext } from '@/components/context/CompanyContext'
import { BiArrowBack } from 'react-icons/bi'
import { IoPeopleOutline, IoTimeOutline, IoShareSocialOutline } from 'react-icons/io5'
import { HiChevronDown, HiChevronRight, HiChevronUp } from 'react-icons/hi'
import { PiHandCoins } from 'react-icons/pi'
import { useRouter } from 'next/router'
import calculateDaysUntilExpiration from '@/helpers/expireDate'
import { PrefixContext } from '@/components/context/PrefixContext'
import ListDonatur from '@/components/Program/ListDonatur'
import parse from "html-react-parser";
import note from '/public/note.svg'
import { Icon } from "@iconify/react";
import { AiOutlineLink } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import * as fbq from '@/helpers/fbpixel'
import Head from 'next/head'

interface Props { }

const Index: NextPage<Props> = ({ program, slug }: any) => {
  useEffect(() => {
    try {
      setTimeout(() => {
        fbq.event('ViewContent');
      }, 500)

    } catch (e) {
      console.error(e)
    }
  }, []);



  // console.log("cek donasi", program)
  const imageUrl = useMemo(() => {
    return program.image_url.replace(/https:\/\/[^/]+\/web\/image\//, program.url_web) + "?w=400&h=auto&q=100&upscale=true&auto=compress,format";
  }, [program.image_url, program.url_web]);

  const contentDescription = useMemo(() => {
    return {
      description: program.description,
      excerpt_img_url: program.excerpt_img_url ? program?.excerpt_img_url.replace(/https:\/\/[^/]+\/web\/image\//, program.url_web) + "?w=480&h=270&fit=max&auto=format,compress" : "",
      excerpt: program.excerpt ? program?.excerpt : ""
    }
  }, [program.description, program.excerpt_img_url, program.excerpt])

  // const excerptImage = useMemo(()=> {
  //   return program.excerpt_img_url.replace(/https:\/\/[^/]+\/web\/image\//, program.url_web) + "?w=480&h=270&fit=max&auto=format,compress";
  // },[program.image_url, program.url_web])
  const [toggleUp, setToggleUp] = useState(false)
  return <AnimatePresence>
  <motion.div initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.2 }} className='max-w-md min-h-screen mx-auto shadow mb-20'>
    <MetaHead program={program} />
    <ToastContainer />
    <Banner image={imageUrl} alt={program.name} imgix_host={program.url_web} />
    <FundedInformation title={program.name} total_funded={program.total_funded} total_donor={program.total_donor} target={program.target} expire_date={program.expire_date} />
    <Description content={contentDescription} create_date={program.create_date} />
    <News id={program.id} imgix_host={program.url_web} slug={program.slug} />
    <Donors id={program.id} imgix_host={program.url_web} slug={program.slug} />
    <NavbarBottom slug={slug} expire_date={program.expire_date} setToggleUp={setToggleUp} program={program} />
    {toggleUp === true ? <ShareSosmed setToggleUp={setToggleUp} toggleUp={toggleUp} /> : ""}

  </motion.div>
</AnimatePresence>
  

}

const Banner = ({ image, alt, imgix_host }: { image: string, alt: string, imgix_host: string }) => {

  const prefix = useContext(PrefixContext)
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement | null>(null);

  const backOrDirectToHome = () => {
    if (window.history.length > 1) {
      // Riwayat memiliki halaman yang dapat dikembalikan
      router.back()
      // @ts-ignore
      imageRef.current.focus()
    } else {
      // Riwayat tidak memiliki halaman yang dapat dikembalikan
      router.push(`/${prefix}`)
    }
  };

  return (
    <div className='relative'>
      <button onClick={backOrDirectToHome} className='absolute bg-white rounded-full top-2 p-2 left-2 shadow cursor-pointer'>
        <BiArrowBack />
      </button>

      <Image ref={imageRef} tabIndex={0} src={image.replace(/https:\/\/[^/]+\/web\/image\//, imgix_host) + "?w=400&h=auto&q=100&upscale=true&auto=compress,format"} className='lg:min-h-[270px] lg:max-h-[270px] bg-gray-500' priority alt={alt} width={480} height={300} />
    </div>

  )
}

const FundedInformation = ({ title, total_funded, total_donor, target, expire_date }: { title: string, total_funded: number, total_donor: number, target: number, expire_date: string }) => {
  return (
    <div className='bg-white border-b-4 p-4 font-semibold text-base'>
      <h1 className='mb-4'>
        {title}
      </h1>
      <div className='flex justify-between'>
        <p>{formatRupiah(total_funded)}</p>
        {target > 0 && (
          <p>{formatRupiah(target)}</p>
        )}
      </div>

      {calculateDaysUntilExpiration(expire_date).message !== "∞" && (
        <ProgressBar total_funded={total_funded} target={target} />
      )}

      <FundedTabs expire_date={expire_date} total_donor={total_donor} />
    </div>
  )
}


const FundedTabs = ({ expire_date, total_donor }: { expire_date: string, total_donor: number }) => {
  const company: any = useContext(CompanyContext);
  let divStyle = {
    borderColor: company.info_colour,
    backgroundColor: company.info_colour,
    // color: getBrightness(company.info_colour) <= 100 ? "#FFFFFF" : "#000000",
  };
  return (
    <div className="grid grid-cols-3 items-center px-4 pt-3 gap-4 ">
      <div
        className=" w-full h-full rounded-tr-3xl rounded-bl-3xl flex flex-col items-center justify-center border-6 p-2"
      // style={divStyle}
      >
        <IoPeopleOutline className="w-5 h-5" />
        <p className='text-xs text-center'>{total_donor == null ? 'Belum ada' : total_donor} Donatur</p>
      </div>
      <div
        className=" w-full h-full rounded-md flex flex-col items-center justify-center border-6 p-2"
      // style={divStyle}
      >
        <IoTimeOutline className="w-5 h-5" />
        <div className="px-2 py-auto text-xs text-center ">
          {calculateDaysUntilExpiration(expire_date).message}
        </div>
      </div>
      <div
        // onClick={() => setshowPenyaluran(true)}
        className=" w-full h-full rounded-tl-3xl rounded-br-3xl flex flex-col items-center justify-center border-6 p-2"
      // style={divStyle}
      >
        <PiHandCoins className="w-5 h-5 " />
        <div className="px-2 py-auto">
          <p className="text-xs text-center"> Penyaluran</p>
        </div>
      </div>

    </div>
  )
}


const ProgressBar = ({ total_funded, target }: { total_funded: number, target: number }) => {
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    const getPercentage = (total_funded: number, target: number) => {
      if (!isNaN(total_funded) && !isNaN(target) && target != 0) {
        setPercent((total_funded / target) * 100);
      } else {
        setPercent(0)
      }
    }
    getPercentage(total_funded, target)
  }, [total_funded, target])

  const company: any = useContext(CompanyContext)
  return (
    <div className="flex justify-between items-center  gap-2 ">
      <div className="relative h-4 w-full rounded-full bg-gray-300">
        <div
          className={`absolute inset-y-0 left-0 h-4 rounded-2xl bg-[#${company.primary_colour}] bg-[#${company.primary_colour}]`}
          style={{
            width: percent <= 100 ? `${percent}%` : "100%",
            backgroundColor: company.primary_colour,
          }}
        ></div>
      </div>

      <div className=" w-10">
        <span className=" font-semibold inline-block text-black-600">
          <p className="text-sm flex items-center">{Math.round(percent)} %</p>
        </span>
      </div>
    </div>
  )
}

const Description = ({ content, create_date }: { content: any, create_date: string }) => {
  const company: any = useContext(CompanyContext)
  const [showDescriptionFull, setShowDescriptionFull] = useState(false)
  function formatDate(timestamp: string) {
    const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const dateObj = new Date(timestamp.replace(" ", "T"));

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
  const write_date = formatDate(create_date)

  return (
    <div className='px-4 border-b-2 pb-4 mb-10 text-justify'>
      <h1 className='font-semibold my-3'>Deskripsi Program</h1>
      <p className='text-xs font-semibold'>
        {write_date.date} {write_date.month} {write_date.year}
      </p>

      <div className='relative'>
        <div className={`text-sm ${showDescriptionFull ? '' : 'max-h-[10rem]'}  transition-all overflow-hidden`} >

          {showDescriptionFull && (
            parse(content.description)
          )}

          {showDescriptionFull == false ? content.excerpt != "" ? <div><Image src={content.excerpt_img_url} alt="desc_img" width={0} height={0} sizes="100vw" className='w-full h-auto rounded' /> {content.excerpt} </div> : parse(content.description) : null}


        </div>
        <div className={`py-2 ${showDescriptionFull ? '' : 'bg-gradient-to-t from-white to-white/10 absolute'}  w-full   bottom-0`}>
          <button
            onClick={() => setShowDescriptionFull(!showDescriptionFull)}
            style={{
              color: company.accent_colour,
              borderColor: company.accent_colour,
            }}
            className={`flex items-center gap-2 space-x-2 
                        bg-transparent  
                        font hover:text-white 
                        py-1 px-5 border  mt-10
                        hover:border-transparent 
                        rounded-lg  w-125 h-15 text-base mx-auto`}
          >
            {showDescriptionFull ? 'Sembunyikan' : 'Selengkapnya'}
            {showDescriptionFull ? (
              <HiChevronUp className={`w-6 h-6 bg-transparent text-white-400 font hover:text-white`} />
            ) : (
              <HiChevronDown className={`w-6 h-6 bg-transparent text-white-400 font hover:text-white`} />
            )}
          </button>
        </div>
      </div>


    </div>
  )
}
//@ts-ignore
const News = ({ id, imgix_host, slug }: { id: string, imgix_host: string, slug: string }) => {
  const company: any = useContext(CompanyContext)
  const [data, setData]: any = useState({})
  const [showNews, setShowNews] = useState(false)
  const prefix = useContext(PrefixContext)
  const router = useRouter()
  useEffect(() => {
    const findByNewsByProgramID = async (id: string) => {
      const res = await fetch(`/api/berita/findByProgramID/${id}?fields=id,name,image_url,description&limit=1`);
      const result = await res.json();
      setData(result?.news[0])
      if (result?.news.length > 0) {
        setShowNews(true)
      }
      return result;
    }

    findByNewsByProgramID(id);
  }, [])
  const [showDescriptionFull, setShowDescriptionFull] = useState(false)

  if (showNews) {
    return (
      <div className='px-4 border-b-4' >
        <h1 className='font-semibold pb-8'>Info Terbaru</h1>
        <h1 className='font-semibold'>{data.name}</h1>
        <Image src={data.image_url ? data.image_url?.replace(/https:\/\/[^/]+\/web\/image\//, imgix_host) + "?w=480&h=270&fit=max&auto=format,compress" : ""} width={300} height={180} alt={data.name} className='w-full rounded shadow-lg' />
        <div className='relative'>
          <div className={`text-sm ${showDescriptionFull ? '' : 'max-h-[13rem]'}  transition-all overflow-hidden`} >
            {data.description ? parse(data.description) : ""}
          </div>
          <div className={`py-2 ${showDescriptionFull ? '' : 'bg-gradient-to-t from-white to-white/10 absolute'}  w-full   bottom-0`}>
            <button
              onClick={() => router.push(`${prefix != null && prefix != "" ? prefix + "/" : "/program/"}${slug}/berita${window.location.search}`)}
              style={{
                color: company.accent_colour,
                borderColor: company.accent_colour,
              }}
              className={`flex items-center gap-2 space-x-2 
                            bg-transparent  
                            font hover:text-white 
                            py-1 px-5 border  mt-10
                            hover:border-transparent 
                            rounded-lg  w-125 h-15 text-base mx-auto`}
            >
              Selengkapnya
              <HiChevronRight className={`w-6 h-6 bg-transparent text-white-400 font hover:text-white`} />
            </button>
          </div>
        </div>
      </div >

    )
  } else {
    return (
      <div className='px-4 max-w-md pb-4 py-4' >
        <h1 className='font-semibold pb-8'>Info Terbaru</h1>
        <Image alt="note" src={note} width={0} height={0} sizes="100vw" style={{ maxWidth: "100%" }} className='opacity-0.5 mx-auto opacity-20 ' />
        <h1 className='text-center text-sm py-3'>Belum ada info terbaru</h1>
      </div>
    )
  }


}

const Donors = ({ id, imgix_host, slug }: { id: string, imgix_host: string, slug: string }) => {
  const company: any = useContext(CompanyContext)
  const [data, setData]: any = useState([])
  const [showDonors, setShowDonors] = useState(false)
  const router = useRouter()
  const prefix = useContext(PrefixContext)
  useEffect(() => {
    const findTransactionByProgramID = async (id: string) => {
      const res = await fetch(`/api/program/findTransactionByProgramID/${id}?fields=id,amount,state,create_date,is_anonymous,doa_message&limit=5&offset=0`);
      const result = await res.json();
      setData(result?.transaction)
      if (result?.transaction.length > 0) {
        setShowDonors(true)
      }
      return result;
    }

    findTransactionByProgramID(id);
  }, [])

  if (showDonors) {
    return (
      <div className='px-4 max-w-md pb-4' >
        <h1 className='font-semibold pb-8'>Donasi</h1>
        {data.map((item: any) => {
          return <ListDonatur donatur={item} key={item.id} />
        })}
        <button
          onClick={() => router.push(`${prefix != null && prefix != "" ? prefix + "/" : "/program/"}${slug}/listdonatur${window.location.search}`)}
          style={{
            color: company.accent_colour,
            borderColor: company.accent_colour,
          }}
          className={`flex items-center gap-2 space-x-2 
                          bg-transparent  
                          font hover:text-white 
                          py-1 px-5 border 
                          hover:border-transparent 
                          rounded-lg  w-125 h-15 text-base mx-auto`}
        >
          Lebih Banyak
          <HiChevronRight className={`w-6 h-6 bg-transparent text-white-400 font hover:text-white`} />
        </button>
      </div >
    )
  } else {
    return (
      <div className='px-4 max-w-md pb-4 py-4' >
        <h1 className='font-semibold pb-8'>Kontribusi</h1>
        <Image alt="note" src={note} width={0} height={0} sizes="100vw" style={{ maxWidth: "100%" }} className='opacity-0.5 mx-auto opacity-20 ' />
        <h1 className='text-center text-sm py-3'>Belum ada Donatur</h1>
      </div>
    )

  }

}


const NavbarBottom = ({ slug, expire_date, setToggleUp, program }: { slug: string, expire_date: string, setToggleUp: any, program: any }) => {
  const prefix = useContext(PrefixContext)
  const buttonDonasi = useRef()
  const router = useRouter();
  const validateButton = () => {

  }
  const donasi = () => {
    const programToStore = {
      id: program.id,
      name: program.name,
      categoryname: program.categoryname,
      option_amount: program.option_amount,
      minimum_amount: program.minimum_amount,
      atas_nama: program.atas_nama,
      fix_amount: program.fix_amount,
      is_fix_amount: program.is_fix_amount
    };
    localStorage.setItem("program", JSON.stringify(programToStore));
    router.push(`${prefix}/${slug}/donasi${window.location.search}`);
  }
  const company: any = useContext(CompanyContext)
  return (
    <div className="fixed bottom-0 max-w-md w-full max-h-[60px] px-2 shadow-lg h-full bg-white flex justify-between">
      <div className="flex justify-center items-center">
        <button
          onClick={() => setToggleUp(true)}
          className="bg-white p-2  mr-2 rounded border-gray-300 border"
        >
          <IoShareSocialOutline className="w-6 h-6" />
        </button>
      </div>
      <button
        className={`flex justify-center items-center my-2 w-full  hover:contrast-50 text-white rounded cursor-pointer`}
        style={{ backgroundColor: calculateDaysUntilExpiration(expire_date).message === "Berakhir" ? '#909090' : company.accent_colour }}
        onClick={donasi}
        disabled={calculateDaysUntilExpiration(expire_date).message === "Berakhir" ? true : false}

      >
        {calculateDaysUntilExpiration(expire_date).message === "Berakhir" ? "Berakhir" : "Bantu Sekarang"}
      </button>
    </div>
  )
}

const ShareSosmed = (toggleUp: any, setToggleUp: any) => {
  const message = "Mari kita berdonasi<br>klik link untuk memulai";
  const router = useRouter();
  const shareMedia = (type: any, additionalParam?: any) => {
    switch (type) {
      case "whatsapp":
        sendWhatsapp(`${message} ${window.location.href}`);
        break;
      case "facebook":
        sendFacebook(`${message} ${window.location.href}`);
        break;
      case "twitter":
        sendTwitter(`${message}`);
        break;
      case "telegram":
        sendTelegram(`${message}`);
        break;
      case "linkedin":
        sendLinkedIn(`${message}`);
        break;
    }
  };

  const sendWhatsapp = (message: any) => {
    const encodedMessage = encodeURIComponent(message.replace(/<br>/g, "\n"));
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`);
  };

  const sendFacebook = (message: any) => {
    const encodedMessage = encodeURIComponent(
      message.replace(/<br>/g, "\n").replace(/\n/g, " ")
    );
    const encodedUrl = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`
    );
  };

  const sendTwitter = (message: any) => {
    const encodedMessage = encodeURIComponent(message.replace(/<br>/g, "\n"));
    const encodedUrl = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`
    );
  };

  const sendTelegram = (message: any) => {
    const encodedMessage = encodeURIComponent(message.replace(/<br>/g, " "));
    const encodedUrl = encodeURIComponent(window.location.href);
    window.open(
      `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`
    );
  };

  const sendLinkedIn = (message: any) => {
    const encodedUrl = encodeURIComponent(window.location.href);

    const encodedTitle = encodeURIComponent("Kontribusi");
    const encodedSummary = encodeURIComponent(message.replace(/<br>/g, " "));
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`
    );
  };

  const copyLink = async () => {

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Berhasil di Copy", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) { }
    }
  };


  return (
    <div className="flex items-center justify-center bg-white">
      <div
        className={`fixed z-50 bottom-0 bg-white shadow-lg w-full transition-all duration-500 ${toggleUp ? "h-[140px]" : "h-0"
          } max-w-md rounded-tr-xl rounded-tl-xl`}
      >
        <div className="flex px-3 py-1 bg-white">
          <button onClick={() => toggleUp.setToggleUp(false)} className="p-2">
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
          <div className="flex justify-center item-center">
            <span
              className="py-4 px-1 flex items-center justify-center"
              style={{ fontSize: "16px" }}
            >
              Bagikan
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-6 bg-white">
          <button onClick={() => shareMedia("whatsapp")}>
            <div className="w-8 h-8 border bg-green-500 flex justify-center items-center rounded">
              <Icon
                icon="logos:whatsapp-icon"
                width="30"
                height="30"
              />
            </div>
          </button>

          <button onClick={() => shareMedia("facebook")}>
            <div className="w-8 h-8 border border-blue-300 flex justify-center items-center rounded">
              <Icon
                icon="grommet-icons:facebook"
                color="blue"
                width="50"
                height="50"
              />
            </div>
          </button>

          <button onClick={() => shareMedia("twitter")}>
            <div className="w-8 h-8 border bg-cyan-500 flex justify-center items-center rounded">
              <Icon
                icon="basil:twitter-outline"
                color="white"
                width="50"
                height="50"
              />
            </div>
          </button>

          <button onClick={() => shareMedia("telegram")}>
            <div className="w-8 h-8 border bg-cyan-500  justify-center items-center rounded">
              <Icon
                icon="ei:sc-telegram"
                color="white"
                width="30"
                height="30"
              />
            </div>
          </button>

          <button onClick={() => shareMedia("linkedin")}>
            <div className="flex items-center justify-center w-8 h-8 border rounded">
              <Icon
                icon="el:linkedin"
                color="#0e76a8"
                width="50"
                height="50"
              />
            </div>
          </button>

          <button onClick={() => copyLink()}>
            <div className="flex items-center justify-center w-8 h-8 border bg-gray-200 rounded">
              <AiOutlineLink className="w-7 h-7" />
            </div>
          </button>
        </div>
      </div>
    </div>

  )
}


const MetaHead = ({ program }: any) => {
  const company: any = useContext(CompanyContext)
  return (
    <div>
      <Head>
        <title>{program.name ? program.name : company.name}</title>
        <meta name="title" content={program.name ? program.name : company.name} />
        <meta name="description" content={program.excerpt != "" ? program.excerpt : program.description} />
        <meta name="keywords" content="donasi,donatur,kampanye,social crowdfunding" />
        <meta property="og:url" content={typeof window != "undefined" ? window.location.href : ""} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={program.name ? program.name : company.name} />
        <meta property="og:title" content={program.name} />
        <meta property="og:description" content={program.excerpt != "" ? program.excerpt : program.description} />
        <meta property="og:image" content={program.image_url ? program.image_url : company.logo_perusahaan_url} />
        <meta property="og:image:width" content="540" />
        <meta property="og:image:height" content="281" />
        <meta property="og:image:secure_url" content={program.image_url ? program.image_url : company.logo_perusahaan_url} />
        {/* <meta property="fb:app_id" content="159117084768115" /> */}
        <meta name="twitter:card" content="summary" />
        {/* @ts-ignore */}
        <meta name="twitter:site" content={typeof window != "undefined" ? window.location.href : ""} />
        <meta name="twitter:description" content={program.excerpt != "" ? program.excerpt : program.description} />
        <meta name="twitter:title" content={program.name ? program.name : company.name} />
        <meta name="twitter:image" content={program.image_url ? program.image_url : company.logo_perusahaan_url} />
      </Head>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { slug }: any = ctx.params
  const program = await findBySlugNew(slug, ctx.req.headers.host)

  const prefix = ctx.query.prefix;

  if (!program || program.length === 0) {
    return {
      redirect: {
        destination: `/${prefix}/`,
        permanent: false,
      }
    };
  }

  return {
    props: {
      program: program[0],
      slug: slug
    }
  }
}

export default Index