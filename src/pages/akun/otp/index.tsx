import Navbar from "@/components/Akun/Navbar";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import cookie from "js-cookie";
import Head from "next/head";
import { openApiCompany } from "@/erp/company";
import { PrefixContext } from "@/components/context/PrefixContext";

export async function getServerSideProps({ req }: any) {
  let company = await openApiCompany(req.headers.host);

  return { props: { company } };
}

export default function App({ company }: any) {
  const router = useRouter();
  const prefix = useContext(PrefixContext)

  const { email } = router.query;
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (otp == "") {
      setOtpError("OTP masih kosong");
      return;
    }
    if (otp.length != 6) {
      setOtpError("OTP harus 6 digit");
      return;
    }
    const cookieValue = cookie.get("token");

    let formData = { uuid: cookieValue, code: otp, email: email };

    const response = await fetch("/api/validate-otp", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 400) {
      setOtpError("OTP tidak sesuai atau sudah kadaluarsa");
      return;
    }
    if (response.status == 200) {

      // signIn("credentials", { email, callbackUrl: `/${prefix}/akun/profile`})
      const data = await response.json();
      // @ts-ignore
      cookie.set("email", email)
      cookie.set("login", JSON.stringify(data), { expires: 60 * 60 * 24 * 7 });
      router.push(`${prefix}/akun/profile`);
    }
  };

  return (
    <>
      <Head>
        <title>OTP</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <div className="bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md min-h-screen">
            <Navbar colorPrimary={company.primary_colour} route={"/akun"} title={"Verifikasi"} />
            <div className="m-4 pt-12">
              <div>
                <p className="text-m mb-4">
                  Masukkan 6 digit kode yang telah kami kirimkan ke email <br />
                  <b>{email}</b>
                </p>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="tel"
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    id="otp"
                    className="bg-gray-20 border border-b-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 placeholder:text-orange-500 placeholder:text-center mb-2 text-center"
                    placeholder="*  *  *  *  *  *"
                  />
                  {otpError && (
                    <p className="text-xs text-red-500">{otpError}</p>
                  )}
                  <button
                    type="submit"
                    className={`rounded-[4px]  w-full p-2 my-2 text-white`}
                    style={{ backgroundColor: company.accent_colour }}
                  >
                    Cek
                  </button>
                </form>
              </div>
              {/* <div className="mt-4">
                <p className="text-center text-xs">Kirim ulang dalam</p>
                <p className="text-center text-xs">02.00</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
