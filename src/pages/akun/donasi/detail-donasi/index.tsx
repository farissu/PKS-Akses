import Navbar from "@/components/Akun/Navbar";
import Head from "next/head";
import { format } from "date-fns";
import cookie from "js-cookie";
import { parse } from "cookie";
import id from "date-fns/locale/id";
import { Suspense, useContext } from "react";
import Loading from "./loading";
import Image from "next/image";
import { getStatus } from "@/erp/online_payment";
import { useRouter } from "next/router";
import { openApiCompany } from "@/erp/company";
import { URL_API_DEV } from "@/erp/Helpers/config";
import { PrefixContext } from "@/components/context/PrefixContext";

export async function getServerSideProps(context: { req: any, query:any }) {
  const { req, query } = context;
  const affi = query.ref ?? ''
  const myCookie = req.headers.cookie;
  const parsedCookie = cookie ? parse(myCookie) : {};

  let dataDonatur = JSON.parse(parsedCookie.login);

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", req.headers.host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(
    URL_API_DEV+"transaction/donor?donor_id=" +
    dataDonatur.data.id, requestOptions
  );
  const json = await res.json();
  const idDonasiArray = json.data.map((item: any) => item.id_donasi);

  const statusArray = await Promise.all(
    idDonasiArray.map(async (id_donasi: any) => {
      const status = await getStatus(id_donasi);
      return status;
    })
  );

  let company = await openApiCompany(req.headers.host);

  return {
    props: {
      data_riwayat: json.data,
      statusArray,
      affi,
      company
    },
  };
}

export default function App({ data_riwayat, statusArray, affi, company }: any) {
  data_riwayat.sort((a: any, b: any) => b.tgl_donasi.localeCompare(a.tgl_donasi));
  const router = useRouter()
  const prefix = useContext(PrefixContext)
  return (
    <>
      <Head>
        <title>Detail Donasi Saya</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <Suspense fallback={<Loading />}>
        <div className="bg-gray-100 flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md min-h-screen">
              <Navbar colorPrimary={company.primary_colour} route={"/akun/donasi"} title={"Detail Donasi Saya"} />
              <div className="pb-20 pt-16 m-4">
                {
                  data_riwayat
                    ? data_riwayat.map((item: any) => {

                      const date = new Date(item.tgl_donasi);
                      const create_date = format(date, "d MMMM yyyy", {
                        locale: id,
                      });
                      function Donation() {
                        router.push(
                          `${prefix}/history/${item.id_donasi}${affi !== '' ? `?source=${affi}` : ''}`
                        );
                      }
                      return (
                        <div onClick={Donation} className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded flex items-center bg-white leading-[1.25em] border-gray-200 w-full max-h-full mb-4 cursor-pointer">
                          <figure className="m-0 mr-5 flex aspect-[16/10] h-fit flex-1 items-center justify-center">
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
                          </figure>
                          <div className="pr-2 py-2 max-w-[65%] flex-col flex-1">
                            <h3 className="font-semibold text-xs h-8 w-full line-clamp-2">
                              {item.program_name}
                            </h3>
                            <div className="mt-2 flex flex-row w-full text-xs md:max-w-[360px]:text-[10px] gap-4">
                              <p className="text-gray-400 font-semibold">{create_date}</p>
                              <p className="font-semibold">{item.amount}</p>
                            </div>
                            {statusArray.map((status: any) => {
                              if (item && status && status.hasOwnProperty("platform_transaction_id") && item.id_donasi === status.platform_transaction_id) {
                                let bgColor, textColor, borderColor;
                                switch (status.status) {
                                  case 'Pending':
                                    bgColor = 'bg-gray-500/20';
                                    textColor = 'text-gray-500';
                                    borderColor = 'border-gray-500';
                                    break;
                                  case 'Paid':
                                    bgColor = 'bg-blue-500/20';
                                    textColor = 'text-blue-500';
                                    borderColor = 'border-blue-500';
                                    break;
                                  default:
                                    bgColor = 'bg-red-500/20';
                                    textColor = 'text-red-500';
                                    borderColor = 'border-red-500';
                                }
                                return (
                                  <button className={`rounded-lg text-xs max-w-[360px] mt-2 border ${bgColor} ${textColor} ${borderColor}`}>
                                    <p className="mx-3">
                                      {status.status === 'Pending' ? 'Dibatalkan' :
                                        (status.status === 'Paid' ? 'Berhasil' : 'Diproses')}
                                    </p>
                                  </button>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      );
                    })
                    : null}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
