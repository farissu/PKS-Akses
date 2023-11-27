import Navbar from "@/components/Akun/Navbar";
import { getCompany, openApiCompany } from "@/erp/company";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { PrefixContext } from "@/components/context/PrefixContext";
import { useContext } from "react";

export async function getServerSideProps(context: { req: any }) {
  const { req } = context;
  
  let company = await openApiCompany(req.headers.host);

  return { props: { company, } };
}

export default function App({ company }: any) {
  const prefix = useContext(PrefixContext)
  
  return (
    <>
     <AnimatePresence>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
      <Head>
        <title>Tentang</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <div className="bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-md min-h-screen">
          <div className="bg-white shadow-md ">
            <Navbar
              colorPrimary={company.primary_colour}
              route={`${prefix}/akun`}
              title={"Tentang Lembaga"}
            />
            <div className="mx-4 mt-4 pt-12 h-full">
              <div>
                <p className="text-lg mb-4 font-bold">Tentang {company.name}</p>
                <div
                  className="text-m pb-4"
                  dangerouslySetInnerHTML={{ __html: company.about_us }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
      </AnimatePresence>
    </>
  );
}
