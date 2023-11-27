import { getByMendesak, getByNameCategory, openApiProgramMendesak } from "@/erp/program";
import { getAll, openApiGetCategory } from "@/erp/category";
import Navbar from "@/components/Program/Navbar";
import ListZakat from "@/components/Program/ListZakat";
import BottomNavbar from "@/components/Home/BottomNavbar";
import { Suspense, useContext, useEffect, useState } from "react";
import Loading from "./loading";
import Head from "next/head";
import { CompanyContext } from "@/components/context/CompanyContext";

export async function getServerSideProps({ req, res }: any) {
  let layanan = await openApiGetCategory(req.headers.host);
  let program = await getByNameCategory('Zakat', req.headers.host);
  let mendesak = await openApiProgramMendesak(req.headers.host);
  if (mendesak && program) {
    [program, mendesak].forEach((array) => {
      array.forEach((item: any) => {
        item.categoryname = item.categoryname ?? null;
      });
    });
  }

  return {
    props: {
      layanan: layanan,
      program: program,
      mendesak: mendesak,
    },
  };
}

export default function Zakat({ layanan, program, mendesak }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null)
  const company: any = useContext(CompanyContext)
  const [isLoading, setLoading] = useState(false)

  if (isLoading) return <Loading />
  return (
    <>
      <Head>
        <title>Zakat</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <div className="bg-gray-100">
        <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
          <Navbar />
          <Suspense fallback={<Loading />}>
            <ListZakat
              program={program}
              mendesak={mendesak}
              category={layanan}
              colorSecondary={company.accent_colour}
            />
            <BottomNavbar />
          </Suspense>
        </div>
      </div>
    </>
  );
}
