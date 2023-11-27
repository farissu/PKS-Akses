import Navbar from "@/components/Akun/Navbar";
import BottomNavbar from "@/components/Home/BottomNavbar";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import "chart.js/auto";
import { Suspense, useRef, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import formatRupiah from "@/erp/Helpers/formatRupiah";
import Cookies from "cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import Loading from "./loading";
import Calendar from "@/components/Akun/Calendar";
import Image from "next/image";
import { openApiCompany } from "@/erp/company";
import { URL_API_DEV } from "@/erp/Helpers/config";
import jwtDecode from "jwt-decode";
import { PrefixContext } from "@/components/context/PrefixContext";

// import { useSession, signOut, getSession } from "next-auth/react";
import { findOrCreateByEmail } from "@/erp/donatur";

export async function getTotalCapaianWeekly(id_donatur: string, host: string) {
  let json_total_donasi = {};
  var today = new Date();
  var day = today.getDay();
  var diff = day == 0 ? -6 : 1 - day;
  var startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + diff);

  var endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - day));

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const res_total_donasi = await fetch(
    URL_API_DEV + "transaction/range?start_date=" +
    startOfWeek.toLocaleDateString() +
    "&end_date=" +
    endOfWeek.toLocaleDateString() +
    "&donor_id=" +
    id_donatur,
    requestOptions
  );
  if (res_total_donasi.status == 200) {
    json_total_donasi = await res_total_donasi.json();
  } else {
    json_total_donasi = { data: 0 };
  }
  return json_total_donasi;
}

export async function getTotalCapaianMonthly(id_donatur: string, host: string) {
  let json_total_donasi = {};
  var today = new Date();
  var month = today.getMonth();
  var startOfMonth = new Date(today.getFullYear(), month, 1);
  var endOfMonth = new Date(today.getFullYear(), month + 1, 0);

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const res_total_donasi = await fetch(
    URL_API_DEV + "transaction/range?start_date=" +
    startOfMonth.toLocaleDateString() +
    "&end_date=" +
    endOfMonth.toLocaleDateString() +
    "&donor_id=" +
    id_donatur,
    requestOptions
  );
  if (res_total_donasi.status == 200) {
    json_total_donasi = await res_total_donasi.json();
  } else {
    json_total_donasi = { data: 0 };
  }
  return json_total_donasi;
}

export async function getChart(id_donatur: string, host: string) {
  var today = new Date();
  var month = today.getMonth();
  var startOfMonth = new Date(today.getFullYear(), month, 1);
  var endOfMonth = new Date(today.getFullYear(), month + 1, 0);

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const res_chart = await fetch(
    URL_API_DEV + "transaction/chart?donor_id=" +
    id_donatur +
    "&start_date=" +
    startOfMonth.toLocaleDateString() +
    "&end_date=" +
    endOfMonth.toLocaleDateString(),
    requestOptions
  );
  const json_res_chart = await res_chart.json();

  return json_res_chart;
}

export async function getServerSideProps(context: any) {
  const { req, resp } = context;
  const prefix = context.params?.prefix;
  //@ts-ignore
  const cookies = new Cookies(req, resp)
  // const session = await getSession(context);
  const myCookie = req.headers.cookie;

  const token = cookies.get('tokensso')
  const emailFromOtp = cookies.get('email')

  let dataDonatur;

  if (emailFromOtp) {

    const email = emailFromOtp ?? "";
    const name = "";
    dataDonatur = await findOrCreateByEmail(email, name, req.headers.host);

  } else if (token) {

    const userInfo: any = jwtDecode(token);
    const email = userInfo.email;
    const name = userInfo.name;
    dataDonatur = await findOrCreateByEmail(email, name, req.headers.host);
  } else {
    return {
      redirect: {
        destination: `${prefix ? "/" + prefix + '/akun' : '/akun'}`,
        permanent: false,
      }
    }
  }
  // const myCookie = req.headers.cookie;
  // const parsedCookie = cookie ? parse(myCookie) : {};
  // let dataDonatur = JSON.parse(parsedCookie.login);
  // console.log("Akun donasi dataDonatur",dataDonatur);
  const weekly_donation = await getTotalCapaianWeekly(
    dataDonatur.id,
    req.headers.host
  );
  const monthly_donation = await getTotalCapaianMonthly(
    dataDonatur.id,
    req.headers.host
  );
  const chart_donations = await getChart(dataDonatur.id, req.headers.host);

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", req.headers.host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(
    URL_API_DEV + "transaction/donor?donor_id=" +
    dataDonatur.id,
    requestOptions
  );
  const json = await res.json();
  const idDonasiArray = json.data.map((item: any) => item.id_donasi);

  let company = await openApiCompany(req.headers.host);

  return {
    props: {
      data_riwayat: json.data,
      total_donasi: weekly_donation,
      total_donasi_bulan: monthly_donation,
      data_chart: chart_donations,
      affiliate_id: dataDonatur.affiliate_id,
      company,
    },
  };
}

export default function App({
  data_riwayat,
  total_donasi,
  total_donasi_bulan,
  data_chart,
  company
}: any) {
  const prefix = useContext(PrefixContext)
  data_riwayat.sort((a: any, b: any) =>
    b.tgl_donasi.localeCompare(a.tgl_donasi)
  );
  const data = {
    labels: data_chart.label,
    datasets: [
      {
        label: "Total Donasi",
        anchor: "start",
        data: data_chart.data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const [showCalendar, setShowCalendar] = useState(false);
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const ref = useRef();
  const router = useRouter();
  const affi = router.query.source ?? "";
  let borderColor = "";
  let textColor = "";
  let bgColor = "";
  function Lainnya() {
    router.push(
      `/${prefix}/akun/donasi/detail-donasi${affi !== "" ? `?source=${affi}` : ""}`
    );
  }

  const getStatusTag = (status: string) => {

    switch (status) {
      case "Pending":
        bgColor = "bg-gray-500/20";
        textColor = "text-gray-500";
        borderColor = "border-gray-500"
        return <button
          className={`rounded-lg text-xs max-w-[360px] mt-2 border ${bgColor} ${textColor} ${borderColor}`}
        >
          <p className="mx-3">
            Pending
          </p>
        </button>;
      case "Paid":
        bgColor = "bg-blue-500/20";
        textColor = "text-blue-500";
        borderColor = "border-blue-500";
        return <button
          className={`rounded-lg text-xs max-w-[360px] mt-2 border ${bgColor} ${textColor} ${borderColor}`}
        >
          <p className="mx-3">
            Berhasil
          </p>
        </button>;
      default:
        bgColor = "bg-red-500/20";
        textColor = "text-red-500";
        borderColor = "border-red-500";
        return <button
          className={`rounded-lg text-xs max-w-[360px] mt-2 border ${bgColor} ${textColor} ${borderColor}`}
        >
          <p className="mx-3">
            Diproses
          </p>
        </button>;
    }
  };
  return (
    <>
      <Head>
        <title>Donasi Saya</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <Suspense fallback={<Loading />}>
        <div className="bg-gray-100 flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md min-h-screen">
              <Navbar
                colorPrimary={company.primary_colour}
                route={`/${prefix}/akun/profile`}
                title={"Donasi Saya"}
              />
              <div className="m-4 pt-16">
                <div className="flex justify-between">
                  <p className="font-semibold">Bangun Kebiasaan Baik</p>
                  {/* <button onClick={toggleCalendar}>
                    <IoCalendarOutline className="w-5 h-5" />
                  </button> */}
                </div>
                {showCalendar ? (
                  <Calendar
                    transaction={data_riwayat}
                    colorPrimary={company.primary_colour}
                  />
                ) : (
                  <Line ref={ref} data={data} />
                )}
              </div>
              <div className="border border-gray-200 p-4 rounded-t-2xl shadow">
                <p className="font-bold">Capaian Donasimu</p>
                <a
                  href="#"
                  className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow my-4"
                >
                  <div className="grid grid-rows-2 grid-flow-col gap-4">
                    <div className="row-span-2">
                      <p>Donasi Minggu Ini</p>
                      <h5 className=" text-2xl font-bold tracking-tight text-gray-900">
                        {formatRupiah(total_donasi.data)}
                      </h5>
                      <p>Donasi Anda Bertambah 50% dari minggu kemarin</p>
                    </div>
                    <div className="row-span-2">
                      <HiTrendingUp className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow"
                >
                  <div className="grid grid-rows-2 grid-flow-col gap-4">
                    <div className="row-span-2">
                      <p>Donasi Bulan Ini</p>
                      <h5 className=" text-2xl font-bold tracking-tight text-gray-900">
                        {formatRupiah(total_donasi_bulan.data)}
                      </h5>
                      <p>Donasi Anda berkurang 50% dari minggu kemarin</p>
                    </div>
                    <div className="row-span-2">
                      <HiTrendingDown className="h-12 w-12 text-red-600" />
                    </div>
                  </div>
                </a>
              </div>
              <hr />
              <div className="m-4">
                <div className="flex justify-between">
                  <h2 className="mb-4 font-bold">Riwayat Donasi</h2>
                  <a onClick={Lainnya} className="cursor-pointer">
                    <h3 className="text-blue-500">Lainnya</h3>
                  </a>
                </div>
                <div className="pb-20">
                  {data_riwayat
                    ? data_riwayat.slice(0, 4).map((item: any) => {

                      const date = new Date(item.tgl_donasi);
                      const create_date = format(date, "d MMMM yyyy", {
                        locale: id,
                      });
                      function Donation() {
                        router.push(
                          `/donation/${item.id_donasi}${affi !== "" ? `?source=${affi}` : ""
                          }`
                        );
                      }
                      return (
                        <div
                          onClick={Donation}
                          className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded flex items-center bg-white leading-[1.25em] border-gray-200 w-full max-h-full mb-4 cursor-pointer"
                        >
                          <figure className="m-0 mr-5 flex aspect-[16/10] h-fit flex-1 items-center justify-center">
                            {item.program_image ?
                              (
                                <Image
                                  src={item.program_image}
                                  alt={item.program_name}
                                  width={200}
                                  height={125}
                                  decoding="async"
                                  data-nimg="1"
                                  quality={30}
                                  priority
                                  className="h-full w-full object-fill rounded-bl rounded-tl"
                                />
                              ) : null

                            }
                            {/*  */}
                          </figure>
                          <div className="pr-2 py-2 max-w-[65%] flex-col flex-1">
                            <h3 className="font-semibold text-xs h-8 w-full line-clamp-2">
                              {item.program_name}
                            </h3>
                            <div className="mt-2 flex flex-col w-full text-xs md:max-w-[360px]:text-[10px]">
                              <p className="font-semibold">{item.amount}</p>
                              <p className="font-semibold">{create_date}</p>
                            </div>
                            {getStatusTag(item.state)}
                          </div>
                        </div>
                      );
                    })
                    : null}
                </div>
              </div>
            </div>
            <BottomNavbar active="Profil" colour={company.accent_colour} />
          </div>
        </div>
      </Suspense>
    </>
  );
}
