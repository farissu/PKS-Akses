import {  findNameByIDNew } from "@/erp/donatur";
import { findByID, findCredential } from "@/erp/payment";
import {  findByIdDonasiDua } from "@/erp/transaction";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IoChevronForward, IoCopyOutline } from "react-icons/io5";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import BankInformation from "@/components/Summary/BankInformation";
import Head from "next/head";
import VAInformation from "@/components/Summary/VAInformation";
import { getByIdPayment } from "@/erp/pay_instuctions";
import Instruksi from "@/components/InstruksiBayar/Instruksi";
import Script from "next/script";
import { openApiCompany } from "@/erp/company";
import * as fbq from '@/helpers/fbpixel'
import { PrefixContext } from "@/components/context/PrefixContext";
import MidtransInformation from "@/components/Summary/MidtransInformation";

interface Program {
  categoryname: string;
  name: string;
}

export async function getServerSideProps({ query, req }: any) {
  const id_donasi = query.id_donasi as string;
  const { host } = req.headers;
  if (!id_donasi) {
    throw new Error("Transaction Not found");
  }
  let transaction: any;
  if (id_donasi) {
    transaction = await findByIdDonasiDua(id_donasi, host);
  }

  const urlPaymentSplitted = transaction.results[0].payment_link.split("/");

  let company = await openApiCompany(host);
  let payment = await findByID(transaction.results[0].payment_id, host);
  let donatur = await findNameByIDNew(transaction.results[0].donor_id, host)
  let credential = await findCredential(payment[0].vendor, host)
  let name_donatur = donatur[0].name;
  return {
    props: {
      transaction: transaction.results[0],
      snapDataToken: urlPaymentSplitted[urlPaymentSplitted.length - 1],
      pay_instructions: await getByIdPayment(transaction.results[0].payment_id, host),
      payment,
      donatur: name_donatur,
      company,
      credential
    },
  };
}

export default function Summary({
  transaction,
  snapDataToken,
  pay_instructions,
  payment,
  donatur,
  company,
  credential
}: any) {
  const prod_snap = "https://app.midtrans.com/snap/snap.js";
  const sb_snap = "https://app.sandbox.midtrans.com/snap/snap.js"
  const [nominal, setNominal] = useState(transaction.amount);
  const [iddonasi, setIdDonasi] = useState(transaction.id_donasi);
  const [rekening, setRekening] = useState(payment[0].account_number);
  const router = useRouter();
  const ref = router.query.source ?? "";

  const dateString = transaction ? transaction.create_date : null
  const iso8601DateString = dateString.replace(" ", "T");
  const date = new Date(iso8601DateString);
  const date_exp = new Date(transaction.create_date.replace(" ", "T"));


  date_exp.setDate(date.getDate() + 1);
  date_exp.setHours(date.getHours() + 7);
  date.setHours(date.getHours() + 7)
  const exp_date = format(date_exp, "EEEE, dd MMMM yyyy HH:mm", { locale: id });

  const create_date = format(date, "EEEE, dd MMMM yyyy HH:mm", { locale: id });

  const id_donasi = iddonasi;

  const prefix = useContext(PrefixContext)
  function cekStatus() {
    router.push(`${prefix}/donation/${id_donasi}${ref !== "" ? `?source=${ref}` : ""}`);
  }

  const copyIdDonasi = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(iddonasi);
      } catch (err) { }
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const [caraBayar, setCaraBayar] = useState(false);

  const toggleCaraBayar = () => {
    setCaraBayar(!caraBayar);
  };

  const [isSnapOnProgress, setIsSnapOnProgress] = useState(false);
  //@ts-ignore
  const event_id = parseInt(Date.now() / 1000).toString()
  const [program, setProgram]: any = useState([])
  useEffect(() => {

    fetch("/api/program/findById?id=" + transaction.program_id)
      .then((res) => res.json())
      .then((data) => {
        setProgram(data?.program[0])
      });

    //@ts-ignore
    setTimeout(() => {
      addFBQ({
        event_name: "Purchase",
        content_category: program.categoryname as string,
        content_name: program.name as string,
        currency: "IDR",
        order_id: iddonasi,
        event_id: transaction.event_id ? transaction.event_id : event_id,
        value: convertToInteger(transaction.amount)
      });
    }, 500)

    if (payment[0].models == "online_payment.midtrans") {
      showSnap();
    }
  }, []);


  function convertToInteger(amountString: string) {
    const cleanedString = amountString.replace(/[^\d]/g, '');
    return parseInt(cleanedString, 10);
  }


  //@ts-ignore
  const addFBQ = ({ event_name, value, content_name, content_category, currency, order_id, event_id }: any) => {
    fbq.event(event_name, {
      value: value,
      currency: currency,
      order_id: order_id,
      content_name: content_name,
      content_category: content_category
    }, event_id);
  }

  function showSnap() {
    if (typeof (window as any).snap !== "undefined" && typeof (window as any).snap.pay === "function") {
    } else {
      console.error("Snap SDK is not available.");
    }
    setIsSnapOnProgress(true);

    const analytics_data = {
      nominal: transaction.amount,
      id_program: transaction.program_id,
      id_donasi: transaction.id_donasi,
    };

    const analyticsSearchParams = new URLSearchParams(analytics_data);

    const snapTimeout = setTimeout(() => {
      (window as any).snap.pay(snapDataToken, {
        onSuccess: function (result: any) {
          const successUrl = `${prefix}/donation/success?${analyticsSearchParams.toString()}${window.location.search}`;
          window.location.href = successUrl;
        },
        onPending: function (result: any) {
          setIsSnapOnProgress(false);
        },
        onError: function (result: any) {
          setIsSnapOnProgress(false);
          const failedUrl = `${prefix}/donation/failed?${analyticsSearchParams.toString()}${window.location.search}`;
          window.location.href = failedUrl;
        },
        // onClose: function () {
        //     setIsSnapOnProgress(false);
        // }
      });
    }, 1000);
    return () => clearTimeout(snapTimeout);
  }

  useEffect(() => {
    if (payment[0].models === "online_payment.faspay" && payment[0].category === "e-wallet") {
      window.location.href = transaction.payment_link
    }
  }, [])

  return (
    <>
      <Head>
        <title>Instruksi Pembayaran</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>
      <div className="bg-gray-100">
        {payment[0].models == "online_payment.midtrans" ? (
          <Script
            type="text/javascript"
            src={(credential[0].production) ? prod_snap : sb_snap}
            data-client-key={credential[0].client_id}
          />
        ) : null}
        <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
          <div className={`w-full max-h-[110px] h-full `} style={{ backgroundColor: company.primary_colour }}>
            <div className="text-white p-4 text-sm">
              <p className="mb-2">Batas Waktu Pembayaran</p>
              <p className="font-semibold">{exp_date}</p>
            </div>
          </div>

          {
            payment[0].models === "online_payment.mutasi_bank" ? (
              <BankInformation
                transaction={transaction}
                payment={payment}
                rekening={rekening}
              />
            ) : (payment[0].models === "online_payment.midtrans" || payment[0].category === "e-wallet") ? (
              <MidtransInformation
                transaction={transaction}
                payment={payment}
                showSnap={showSnap}
                bgColor={company.accent_colour}
              />
            ) : payment[0].models === "online_payment.faspay" && (
              <VAInformation
                transaction={transaction}
                payment={payment}
                rekening={rekening}
              />
            )
          }

          <div className="border-[2px]" />
          <Instruksi instruksi_bayar={pay_instructions} />
          <div className="border-[2px]" />
          <div className="p-4">
            <div className="text-sm flex items-center mb-4">
              <p className="mr-2">Kode Donasi</p>
              <button
                onClick={copyIdDonasi}
                className="text-[#2972b6] font-semibold gap-1 flex justify-center items-center "
              >
                <p>{iddonasi}</p>
                <IoCopyOutline />
              </button>
            </div>
            <button
              className={`w-full ${isOpen ? "" : "pb-16"}`}
              onClick={toggleAccordion}
            >
              <div
                className={`p-4 flex border bg-white justify-between items-center ${isOpen ? "rounded-t" : "drop-shadow-md rounded"
                  }`}
              >
                <div>
                  <p className="text-sm">Rincian Donasi</p>
                </div>
                <div className="text-gray-500">
                  {isOpen ? (
                    <IoChevronForward className="w-5 h-5 rotate-90" />
                  ) : (
                    <IoChevronForward className="w-5 h-5" />
                  )}
                </div>
              </div>
            </button>
            <div className={`pb-16 ${isOpen ? "" : "hidden"} `}>
              <div className="w-full border-x border-b text-sm px-4 py-2">
                <p>Nama</p>
                <p className="font-semibold">{donatur}</p>
              </div>
              <div className="w-full border-x border-b text-sm px-4 py-2">
                <p>Nominal Donasi</p>
                <p className="font-semibold">
                  {transaction.amount}
                </p>
              </div>
              <div className="w-full border-x border-b text-sm px-4 py-2">
                <p>Metode Pembayaran</p>
                <p className="font-semibold">{payment[0].name}</p>
              </div>
              <div className="w-full border-x border-b text-sm px-4 py-2">
                <p>Tanggal Donasi</p>
                <p className="font-semibold">{create_date}</p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={cekStatus}
            className="max-w-md w-full bottom-0 fixed"
          >
            <div
              className={`hover:contrast-50 text-white m-4 p-3 rounded`}
              style={{ backgroundColor: company.accent_colour }}
            >
              <p>Cek Status pembayaran</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
