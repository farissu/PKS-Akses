import Navbar from "@/components/Akun/Navbar";
import formatRupiah from "@/erp/Helpers/formatRupiah";
import Head from "next/head";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { openApiCompany } from "@/erp/company";
import { URL_API_DEV } from "@/erp/Helpers/config";

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

  const list_donasi = await getDonasi("nendi123", req.headers.host);
  let company = await openApiCompany(req.headers.host);
  
  return {
    props: {
      data_riwayat: list_donasi.data,
      company: company
    },
  };
}

export default function App({data_riwayat,company}:any) {
    
  return (
    <>
      <Head>
        <title>Detail Donasi Saya</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <div className="bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md min-h-screen">
            <Navbar colorPrimary={company.primary_colour} route={"/akun/affiliate"} title={"Detail Donatur"} />
            <div className="pb-20 pt-12 m-4">
            {
            data_riwayat
              ? data_riwayat.map((item: any) => {
                
                  const date = new Date(item.tgl_donasi);
                  const create_date = format(date, "d MMMM yyyy", {
                    locale: id,
                  });
                  return (
                    <div>
                        <div className="flex justify-between">
                          <h2 className="mb-4">{item.donor_name}</h2>
                            <h3 className="">{formatRupiah(item.amount) }</h3>
                        </div>
                      </div>
                  );
                })
              : null}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
