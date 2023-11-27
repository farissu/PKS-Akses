import { useRef, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { motion } from "framer-motion";
function VAInformation({ transaction, payment, rekening }: any) {
  const [nominal, setNominal] = useState(transaction.amount);
  const componentRef = useRef<any>(null);
  const [showToast, setshowToast] = useState(false)
  const copyRekening = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        setshowToast(true)
        setTimeout(() => {
          setshowToast(false)
        }, 2000)
        await navigator.clipboard.writeText(transaction.no_va);
      } catch (err) {}
    }
  };

    // const savePDF = async () => {
    // const input = componentRef.current;

    // // konversi halaman TSX menjadi gambar menggunakan html2canvas
    // const canvas = await html2canvas(input);

    // // tambahkan gambar ke file PDF menggunakan jsPDF
    // const pdf = new jsPDF();
    // pdf.addImage(canvas.toDataURL('https://cnt.id/logo-full.png'), 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), canvas.height * pdf.internal.pageSize.getWidth() / canvas.width);
    // pdf.save('file.pdf');
  // };

  return (
    <>
     {showToast == true && (
        <Toast />
      )}
      <div className="rounded-t-[10px] bg-white z-50 px-4 pt-6 pb-4">
        <div className="flex pb-4 items-center justify-between">
          <img
            className="max-h-7 h-full w-auto max-w-[90px] mr-4"
            src={payment[0].logo_url}
            alt="logo"
          />
          <div className="text-sm">
            <p className="text-gray-400">{payment[0].name}</p>
          </div>
        </div>
        <div className="w-full p-4 bg-gray-100 mt-4 rounded flex justify-between items-center drop-shadow-md">
          <div>
            <p className="text-sm">Nomor Virtual Account</p>
            <p className="font-bold text-xl">{transaction.no_va}</p>
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
              <p className="font-bold text-xl">
                {transaction.amount}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-center">
          <div ref={componentRef}>
                <CetakInstruksi/>
              </div>
          <button className="mt-2 flex text-center text-blue-500">
            <AiOutlineCloudDownload size={25} />
            <p className="mx-2">Unduh Instruksi Bayar</p>
          </button>
        </div> */}
      </div>
    </>
  );
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
export default VAInformation;
