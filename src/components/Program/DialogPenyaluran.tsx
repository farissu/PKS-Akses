import React from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import formatRupiah from "@/erp/Helpers/formatRupiah";
import { AiFillQuestionCircle } from "react-icons/ai"

const DialogPenyaluran = ({ onClose, numDonatur, donatur, nominal, admin, operasional, sisa, penyaluran }: any) => {

    return (
        <div className="justify-center items-center flex max-w-md w-full overflow-x-hidden h-full overflow-y-auto bg-black/30 fixed bottom-0 z-50 ml-[-16px] outline-none focus:outline-none">
            <div className="fixed top-0 w-full max-w-md max-h-[598px] h-full" onClick={onClose} />
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed w-full max-w-md bottom-0"
            >
                <div className="border rounded-t-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-center justify-start p-4 border-b border-solid border-slate-200 gap-2">
                        <button onClick={onClose}>
                            <IoClose className="w-5 h-5 font-bold" />
                        </button>
                        <h3 className="text-base font-semibold">Informasi Penggunaan Dana</h3>
                    </div>
                    {/*body*/}
                    <div className="relative px-4 pt-4 pb-6 flex-col">
                        <div className="w-full h-full border bg-blue-500/25 rounded-md pb-4">
                            <div className="flex justify-between font-semibold mx-4 mt-4 text-sm">
                                <p>Dana Disalurkan</p>
                                <p>Dana Tersisa</p>
                            </div>
                            <div className="flex justify-between mx-4 text-sm">
                                <p>{formatRupiah(penyaluran)}</p>
                                <p>{formatRupiah(sisa)}</p>
                            </div>
                        </div>
                        <p className="font-bold text-sm py-3">Total Transaksi Hingga Kini</p>
                        <div className="flex justify-between text-sm">
                            <p>Jumlah Donatur</p>
                            <p className="font-semibold">{numDonatur}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p>Jumlah Transaksi</p>
                            <p className="font-semibold">{donatur ? donatur.length : null}</p>
                        </div>
                        <div className="flex justify-between text-sm pb-4">
                            <p>Dana Terkumpul</p>
                            <p className="font-semibold">{nominal}</p>
                        </div>
                        <p className="font-bold text-sm pb-3">Rincian Total Donasi</p>
                        <div className="flex justify-between text-sm">
                            <p>Donasi Bersih Untuk Disalurkan</p>
                            <p className="font-semibold">{formatRupiah(penyaluran)}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p>Biaya Operasional</p>
                            <p className="font-semibold">{formatRupiah(operasional)}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p>Biaya Admin Transaksi</p>
                            <p className="font-semibold">{formatRupiah(admin)}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p>Dana Tersisa</p>
                            <p className="font-bold">{formatRupiah(sisa)}</p>
                        </div>
                        <div className="flex justify-start items-center mt-4">
                            <AiFillQuestionCircle className="mr-2 text-blue-500" />
                            <p className="flex text-blue-500">Ketentuan</p>
                        </div>
                        <div className="w-full h-full border bg-blue-500/25 rounded-md mb-4">
                            <ol style={{ listStyleType: 'decimal' }} className="mr-4 ml-8 my-4 text-sm">
                                <li>Semua informasi yang disediakan disini bersifat real tanpa ada unsur pemalsuan.</li>
                                <li>Sebagai penyedia jasa akan mendapatkan sebanyak 2,5 per transaksi sebagai biaya operasional</li>
                                <li>Biaya admin dari midtrans dikenakan 1% per transaksi</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
export default DialogPenyaluran