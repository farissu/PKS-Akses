import router from "next/router";
import * as AntIcon from "react-icons/ai";
import Navbar from "@/components/Akun/Navbar";
import AccordionItem from "@/components/Akun/AccordionItem";
import { UrlObject } from "url";
import { getFAQ } from "@/erp/faqs";
import { useContext, useState } from "react";
import Head from "next/head";
import { openApiCompany } from "@/erp/company";
import { PrefixContext } from "@/components/context/PrefixContext";


export async function getServerSideProps(context: { req: any, query: { [key: string]: any } }) {
  const { query, req } = context;
  const { id } = query;

  let faqs = await getFAQ(String(req.headers.host),id);

  let company = await openApiCompany(req.headers.host);

  return { props: { faqs: faqs,company:company} };
}

export default function App({ faqs, company }: any) {
  function handleClick(link: string | UrlObject) {
    router.push(link);
  }
  const prefix = useContext(PrefixContext)
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Head><title>FAQ's</title>
      <link rel="icon" href={company.favicon_url} /></Head>
      <div className="bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md min-h-screen">
          <Navbar colorPrimary={company.primary_colour} route={`${prefix}/akun/bantuan`} title={"Pusat Bantuan"} />
          <div className="mx-4 my-4 pt-12">
            <div>
              <p className="text-base mb-4 font-medium">
                Masih memiliki pertanyaan ?
              </p>
              <p className="text-base mb-4 font-medium"></p>
              <div>
                {faqs
                  ? faqs.map((item: any) => {
                      return (
                        <AccordionItem item={item} />
                      );
                    })
                  : null}
              </div>
              <p className="text-base my-4 font-medium">Hubungi Kami</p>
              <div>
                <button
                  onClick={() => handleClick(`${prefix}/akun/bantuan/form_bantuan`)}
                  type="button"
                  className="text-left border w-full p-2 my-2 text-black flex items-center"
                >
                  <AntIcon.AiOutlineMail className="h-6 w-6 mx-4 my-2" />
                  Hubungi Kami dengan email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
