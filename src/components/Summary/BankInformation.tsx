import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { IoCopyOutline } from "react-icons/io5";
import { motion } from "framer-motion";
function BankInformation({ transaction, payment, rekening }: any) {

  const [nominal, setNominal] = useState(transaction.amount);
  const [showToast, setshowToast] = useState(false)

  const copyRekening = async () => {
    setshowToast(true)
    setTimeout(() => {
      setshowToast(false)
    }, 2000)
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(rekening);
      } catch (err) {
      }
    }
  };

  const copyToClipboard = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        setshowToast(true)
        setTimeout(() => {
          setshowToast(false)
        }, 1500)
        await navigator.clipboard.writeText(nominal);

      } catch (err) {
      }
    }
  };

  return (
    <>
      {showToast == true && (
        <Toast />
      )}

      <div className="rounded-t-[10px] bg-white z-50 px-4 pt-6 pb-4">
        <div className="flex pb-4 items-center">
          <img
            className="max-h-7 h-full w-auto max-w-[90px] mr-4"
            src={payment[0].logo_url}
            alt="logo"
          />
          <div className="text-sm">
            <p className="text-gray-400">{payment[0].name}</p>
            <p className="">{payment[0].on_behalf_of}</p>
          </div>
        </div>
        <div className="w-full p-4 bg-gray-100 mt-4 rounded flex justify-between items-center drop-shadow-md">
          <div>
            <p className="text-sm">Nomor Rekening</p>
            <p className="font-bold text-xl">{payment[0].account_number}</p>
          </div>
          <button
            onClick={copyRekening}
            className="text-[#2972b6] flex justify-center items-center gap-2"
          >
            <p>Salin</p>
            <IoCopyOutline />
          </button>
        </div>
        <div className="w-full p-4 bg-gray-100 mt-4 rounded drop-shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Jumlah Donasi</p>
              <p className="font-bold text-xl">{transaction.amount}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="text-[#2972b6] flex justify-center items-center gap-2"
            >
              <p>Salin</p>
              <IoCopyOutline />
            </button>
          </div>
          <div className="w-full p-4 mt-4 bg-[#FFEFBC] rounded items-center flex gap-2">
            <CgDanger className="w-6 h-6 text-orange-400 flex-shrink-0" />
            <p className="text-sm">
              <b>PENTING !</b> Pastikan transfer tepat sampai 3 digit
              terakhir agar donasi terverifikasi
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function Toast() {
  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1, translateX: 40 }}
      exit={{ opacity:1 , translateX: -40 }}
      transition={{ duration: 0.2 }} className="absolute top-5">
      <div className="bg-green-500 text-white rounded-lg py-2 px-8">
        Berhasil di salin
      </div>
    </motion.div>

  )
}

export default BankInformation;