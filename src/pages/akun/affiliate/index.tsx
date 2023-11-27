import Navbar from "@/components/Akun/Navbar";
import { IoCopyOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import BottomNavbar from "@/components/Home/BottomNavbar";
import { toast } from "react-toastify";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import formatRupiah from "@/erp/Helpers/formatRupiah";
import { getUrlAff } from "@/erp/affiliater";
import Head from "next/head";
import cookie from "js-cookie";
import { parse } from "cookie";
import id from "date-fns/locale/id";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { openApiCompany } from "@/erp/company";
import { URL_API_DEV } from "@/erp/Helpers/config";

export async function getTotalCapaian(affiliate_code: string, host: string) {
  let json_total_donasi = {};

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const res_total_donasi = await fetch(
    URL_API_DEV+"transaction/affiliate/range?affiliate_code=" +
      affiliate_code,
    requestOptions
  );
  if (res_total_donasi.status == 200) {
    json_total_donasi = await res_total_donasi.json();
  } else {
    json_total_donasi = { data: 0 };
  }
  return json_total_donasi;
}

export async function getChart(affiliate_code: string, host:string) {

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res_chart = await fetch(
    URL_API_DEV+"transaction/affiliate/chart?affiliate_code=" +
      affiliate_code,
    requestOptions
  );
  const json_res_chart = await res_chart.json();

  return json_res_chart;
}
export async function getDonasi(affiliate_code: string, host:string) {
  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(
    URL_API_DEV+"transaction/affiliate?affiliate_code=" +
      affiliate_code,
    requestOptions
  );
  const json = await res.json();
  return json;
}

export async function getServerSideProps(context: { req: any }) {
  const { req } = context;
  const myCookie = req.headers.cookie;
  const parsedCookie = cookie ? parse(myCookie) : {};

  let dataDonatur = JSON.parse(parsedCookie.login);
  let url_affiliate = await getUrlAff(dataDonatur.data.affiliate_id);

  const total_donasi = await getTotalCapaian(
    String("nendi123"), req.headers.host
  );
  const chart_donasi = await getChart(String("nendi123"), req.headers.host);
  const list_donasi = await getDonasi(String("nendi123"), req.headers.host);

  let company = await openApiCompany(req.headers.host);

  return {
    props: {
      total_donasi: total_donasi,
      url_affiliate: url_affiliate,
      chart: chart_donasi,
      list_donasi: list_donasi.data,
      company,
    },
  };
}

export default function App({
  total_donasi,
  url_affiliate,
  chart,
  list_donasi,
  company,
}: any) {
  const [text, setText] = useState(
    url_affiliate == null ? "" : url_affiliate.url_affiliate
  );

  const copyToClipboard = async () => {
    toast.success("Link sudah di salin !");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link sudah di salin !", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {}
  };
  const data = {
    labels: chart.label,
    datasets: [
      {
        label: "Total Capaian",
        data: chart.data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const ref = useRef();
  const router = useRouter();
  const affi = router.query.source ?? "";
  return (
    <>
      <Head>
        <title>Affiliate</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <div className="bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md min-h-screen">
            <Navbar colorPrimary={company.primary_colour} route={"/akun"} title={"Affiliate"} />
            <div className="mx-4 my-4 pt-12">
              <div>
                <Line ref={ref} data={data} />
                <p className="text-lg mb-4">Total Capaian</p>
                <a
                  href="#"
                  className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow my-4"
                >
                  <div className="grid grid-rows-2 grid-flow-col gap-4">
                    <div className="row-span-2">
                      <h5 className=" text-2xl font-bold tracking-tight text-gray-900">
                        {formatRupiah(total_donasi.data)}
                      </h5>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow my-4"
                >
                  <p>Link Affiliate</p>
                  <div className="flex justify-between">
                    {url_affiliate ? (
                      <p className=" font-bold tracking-tight text-gray-900">
                        {url_affiliate.url_affliate}
                      </p>
                    ) : null}
                    <input type="hidden" value={text} />
                    <button onClick={copyToClipboard}>
                      <IoCopyOutline />
                    </button>
                  </div>
                </a>
              </div>
            </div>

            <hr />
            <div className="m-4">
              <div className="flex justify-between">
                <h2 className="mb-4 font-bold">List Donatur</h2>
                <a href={`/akun/affiliate/detail-affiliate`}>
                  <h3 className="text-blue-500">Lainnya</h3>
                </a>
              </div>
              {list_donasi
                ? list_donasi.map((item: any) => {
                    const date = new Date(item.tgl_donasi);
                    const create_date = format(date, "d MMMM yyyy", {
                      locale: id,
                    });
                    return (
                      <div>
                        <div className="flex justify-between">
                          <h2 className="mb-4">{item.donor_name}</h2>
                          <h3 className="">{formatRupiah(item.amount)}</h3>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <BottomNavbar active="Profil" colour={company.accent_colour} />
        </div>
      </div>
    </>
  );
}
