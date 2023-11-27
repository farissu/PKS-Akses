import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Halaman Tidak ditemukan</title>
      </Head>
      <div className="h-screen bg-white  flex justify-center">
        <div className=" text-center mt-52 bg-lato-lato">
          <img src="/lato.png" alt="Loading lato" className="max-w-xs" />
          <h1 className="font-bold text-4xl text-blue-600">404</h1>
          <p className="text-gray-400">
            Mohon maaf halaman tidak ditemukan
            <br />
            <br />
            <a href="/" className="text-blue-600 ">
              Halaman utama
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
