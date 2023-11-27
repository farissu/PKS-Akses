import Head from "next/head";

export default function Custom500() {
    return <>
    <Head>
      <title>Halaman bermasalah</title>
    </Head>
    <div className="h-screen bg-white  flex justify-center">
      <div className=" text-center mt-52 bg-lato-lato">
        <img src="/lato.png" alt="Loading lato" className="max-w-xs" />
        <h1 className="font-bold text-4xl text-blue-600">500</h1>
        <p className="text-gray-400">
          Mohon maaf terjadi kesalahan
          <br />
          <a href="/" className="text-blue-600 ">
          </a>
        </p>
      </div>
    </div>
  </>
  }