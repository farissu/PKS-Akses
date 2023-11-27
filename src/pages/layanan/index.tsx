import Navbar from "@/components/Akun/Navbar";
import Head from "next/head";
import { openApiGetCategory } from "@/erp/category";
import { useContext, useState } from "react";
import { PrefixContext } from "@/components/context/PrefixContext";
import Image from "next/image";
import { CompanyContext } from "@/components/context/CompanyContext";
import { AnimatePresence, motion } from "framer-motion";
export async function getServerSideProps({ req }: any) {
  // let company = await openApiCompany(req.headers.host);
  let category = await openApiGetCategory(req.headers.host);
  // let program = await openApiProgram(4, 0, req.headers.host);
  // let colorPrimary = company.primary_colour;
  return {
    props: {
      category: category,
    },
  };
}

const Layanan = ({ category }: any) => {

  const [faviconUrl, setFavionUrl] = useState('')
  const prefix = useContext(PrefixContext)
  const company: any = useContext(CompanyContext)
  // useEffect(() => {
  //   fetch("/api/company")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFavionUrl(data.company.results[0].favicon_url);
  //     });
  // }, []);

  return (
    <>
      <Head>
        <title>Layanan</title>
        <link rel="icon" type="image/x-icon" href={faviconUrl} />
        {/* <link rel="manifest" href={`/${company.alias}/manifest.json`} /> */}
      </Head>
      <AnimatePresence>

        <motion.div initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.2 }} className="bg-gray-100">
          <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
            <Navbar colorPrimary={company.primary_colour} route={"/"} title={"Layanan"} />
            <div className="grid grid-cols-4 gap-4 px-6 pb-6 pt-20">
              {
                category ?
                  category.map((item: any) => {
                    return <a
                      className="text-sm text-center font-medium flex items-center justify-top flex-col"
                      href={`${prefix != null && prefix != "" ? prefix + "/programs" : "/program/"}?category=${item.slug}`}
                    >
                      <button className="flex flex-col items-center justify-top rounded-full bg-white p-3">
                        <Image
                          src={`${item.icon_url}?w=24&h=24&q=100&upscale=true&auto=compress,format`}
                          alt="Layanan Icon"
                          className="w-[24px] h-[24px]"
                          width={24}
                          height={24}
                        />
                      </button>
                      <div className="text-sm mt-1 text-center">{item.name}</div>
                    </a>
                  }) : null
              }
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default Layanan;
