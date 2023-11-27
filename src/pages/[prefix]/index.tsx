import Banner from "@/components/Home/Banner";
import React from 'react';
import {
  rpcHome,
} from "@/erp/program";
import Navbar from "@/components/Home/Navbar";
import Layanan from "@/components/Home/Layanan";
import ProgramPilihan from "@/components/Home/ProgramPilihan";
import ListProgram from "@/components/Home/ListProgram";
// import Footer from "@/components/Home/Footer";
import Head from "next/head";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useEffect, useState, useContext } from "react";
import * as fbq from '@/helpers/fbpixel'
import { PrefixContext } from "@/components/context/PrefixContext";
import { CompanyContext } from "@/components/context/CompanyContext";
import { AnimatePresence, motion } from "framer-motion";
import BottomNavbar from "@/components/Home/BottomNavbar";
import Script from "next/script";
import Slideshow from "@/components/Home/Scrolislide";


export async function getServerSideProps({ req, res }: any) {

  let home = await rpcHome(req.headers.host);
  const programs = home.program.results;
  const banners = home.banner.results;
  const urgents = home.mendesak.results;

  return {
    props: {
      programs: programs,
      mendesak: urgents,
      layanan: home.category.results,
      banner: banners,
      environment: home.environment.results,
    },
  };
}

export default function Home({
  programs,
  mendesak,
  banner,
  layanan,
  environment
}: any) {

  useEffect(() => {
    try {
      fbq.event('PageView');
    } catch (error) {
    }
  }, [])
// 
  const prefix = useContext(PrefixContext);
  const company: any = useContext(CompanyContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [{ "id": 1, programs: programs }, { "id": 2, mendesak: mendesak }, banner, layanan, company, environment]);
  return (
    <>
      <Head>
        <title>PKS Akses</title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
        />
        {/* <link rel="manifest" href={prefix.replace(/^\/+/, '') + `/${company.alias}/manifest.json`} /> */}
        {/* <link rel="shortcut icon" href={`/${company.alias.toLowerCase}/icon-192x192.png`} />
        <link rel="apple-touch-icon" href={`/${company.alias.toLowerCase}/icon-192x192.png`} /> */}
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
        {/* <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "YOUR_AD_CLIENT_ID",
            enable_page_level_ads: true
          });`}
        </script> */}
      </Head>
      <MetaHead />
      <ErrorBoundary>
        <AnimatePresence>
          <div>
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-100">
              <div className="mx-auto min-h-screen shadow-lg max-w-sm bg-white">
                {isLoading ? (
                  <div className="bg-white shadow-md min-h-screen">
                    <div className="grid grid-cols-4 grid-flow-rows gap-8 mx-4 my-8">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <div className="flex justify-center items-center" key={item}>
                          <div
                            className="w-12 h-12 rounded-full bg-gray-200"
                            key={item}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="border-[2px]" />
                    <div className="mx-4 mt-10 flex gap-4 mb-4">
                      <div className="w-[200px] h-[245px] bg-gray-200 rounded"></div>
                      <div className="w-[200px] h-[245px] bg-gray-200 rounded"></div>
                    </div>
                    <div className="border-[2px]" />
                  </div>
                ) : (
                  <>
                    <Navbar
                      company={company}
                      colorPrimary={company.primary_colour}
                      mendesak={mendesak}
                    />

                    <div className="relative w-full max-h-[270px] h-full justify-center items-center flex aspect-[16/9.5]">
                      <Banner data={banner} />
                    </div>
                    <Layanan category={layanan} company={company} />
                    {/* <Slideshow ></Slideshow> */}
                    <ProgramPilihan mendesak={mendesak} company={company} />

                    
                    

                    {/* <ListProgram
                      program={programs}
                      mendesak={mendesak}
                      category={layanan}
                      colorPrimary={company.primary_colour}
                      colorSecondary={company.accent_colour}
                    />

                    <div className="border-[2px]" /> */}
                    {/* <Footer
                      company={company}
                      environment={environment}
                      colorPrimary={company.secondary_colour}
                    /> */}
                  </>
                )}
                <BottomNavbar active="Home" colour={company.accent_colour} />
              </div>
            </motion.div>
            <div className="flex justify-center">
            </div>
          </div>

        </AnimatePresence>
      </ErrorBoundary>
    </>
  );
}


const MetaHead = ({ program }: any) => {
  const company: any = useContext(CompanyContext)
  return (
    <div>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>PKS Akses</title>
        <meta name="title" content='PKS Akses' />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window != "undefined" ? window.origin : ""} />
        <meta property="og:title" content='PKS Akses' />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={typeof window != "undefined" ? window.origin : ""} />
        <meta property="twitter:title" content='PKS Akses' />

        {/* <!-- Meta Tags Generated with https://metatags.io --> */}
      </Head>
    </div>

  )
}