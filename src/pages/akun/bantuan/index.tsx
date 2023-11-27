import { useRouter } from "next/router";
import * as AntIcon from "react-icons/ai";
import { UrlObject } from "url";
import Navbar from "@/components/Akun/Navbar";
import { getAll } from "@/erp/category_faqs";
import Head from "next/head";
import { openApiCompany } from "@/erp/company";


export async function getServerSideProps({ req, res }: any) {
  let category_faqs = await getAll(req.headers.host);
  let company = await openApiCompany(req.headers.host);
  return {
    props: { category_faqs: category_faqs, company:company },
  };
}

export default function App({ category_faqs, company }: any) {
  const router = useRouter();
  function handleClick(link: string | UrlObject) {
    router.push(link);
  }
  function handleClicks(id: string) {
    router.push("/akun/bantuan/faq?id="+id);
  }
  return (
    <div className="bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-md">
      <Head><title>Bantuan</title><link rel="icon" href={company.favicon_url} /></Head>
        <div className="bg-white shadow-md min-h-screen">
        <Navbar colorPrimary={company.primary_colour} route={"/akun"} title={"Pusat Bantuan"} />
          <div className="mx-4 my-4 pt-12">
            <div>
              <p className="text-base mb-4 font-medium">
                Masih memiliki pertanyaan ?
              </p>
              <p className="text-base mb-4 font-medium">FAQ's</p>
              <div>
                {
                  category_faqs ?
                  category_faqs.map((item: any) => {
                    return (
                      <button
                      onClick={() => handleClicks(item.id)} 
                      type="button"
                      className="text-left border w-full p-2 text-black flex items-center"
                    >
                      <img src={item.icon_url} className="h-6 w-6 mx-4 my-2"/>
                      {item.name}
                    </button>
                    );
                  }) : null
                }
                
              </div>
              <p className="text-base my-4 font-medium">Hubungi Kami</p>
              <div>
                <button
                onClick={() => handleClick("/akun/bantuan/form_bantuan")}
                  type="button"
                  className="text-left border w-full p-2 my-2 text-black flex items-center"
                ><AntIcon.AiOutlineMail className="h-6 w-6 mx-4 my-2"/>
                  Hubungi Kami dengan email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
