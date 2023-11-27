import Head from "next/head";

export default function Loading() {
    return (
      <>
        <Head>
            <title>Berita</title>
        </Head>
        <div className="bg-gray-100 flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md min-h-screen">
            <div className="h-[50px] bg-zinc-400 animate-pulse"></div>
              <div className="h-32 bg-zinc-400 my-2 mx-4 animate-pulse rounded"></div>
              <div className="h-[500px] bg-zinc-400 my-2 mx-4 animate-pulse rounded"></div>
            </div>
            
          </div>
        </div>
      </>
    );
  }
  