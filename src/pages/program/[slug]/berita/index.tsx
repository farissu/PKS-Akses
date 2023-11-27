import {  useContext } from "react";
import { useRouter } from "next/router";
import { findSlug } from "@/erp/program";
import { IoArrowBack } from "react-icons/io5";
import { findByProgramNew } from "@/erp/news";
import ListBerita from "@/components/Program/ListBerita";
import Head from "next/head";
import { CompanyContext } from "@/components/context/CompanyContext";
import { PrefixContext } from "@/components/context/PrefixContext";


export async function getServerSideProps({ query, req }: any) {
  const slug = query.slug as string;
  const program = await findSlug(slug, req.headers.host)
  // @ts-ignore
  let news = await findByProgramNew(program[0]?.id, req.headers.host);

  return {
    props: { news },
  };
}

export default function Berita({ news }: any) {
  const router = useRouter();
  const company: any = useContext(CompanyContext)
  const prefix: any = useContext(PrefixContext)
  function handleBackClick() {
    router.back();
  }

  return (
    <>
      <Head><title>Berita</title></Head>
      <div className="bg-gray-100">
        <div className="mx-auto min-h-screen shadow-lg max-w-md relative bg-white">
          <nav className={`border-gray-200 h-[60px] flex items-center px-4 sm:px-4 py-2.5`} style={{ background: company.primary_colour }}>
            <button onClick={handleBackClick}>
              <IoArrowBack className="text-white w-6 h-6 mr-4" />
            </button>
            <h1 className="text-white font-semibold">Berita</h1>
          </nav>
          <ListBerita news={news} prefix={prefix}/>
        </div>
      </div>
    </>

  );
}
