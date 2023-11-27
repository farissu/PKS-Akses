import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { motion } from "framer-motion";
function MidtransInformation({ transaction, payment, showSnap, bgColor }: any) {

    const [nominal, setNominal] = useState(transaction.amount);
    const [showToast, setshowToast] = useState(false)

    const handleSnapButtonClick = () => {
        showSnap();
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
                </div>
                <button onClick={handleSnapButtonClick} className="hover:contrast-50 w-full p-3 text-white mt-4 rounded"
                    style={{ backgroundColor: bgColor }}>
                    <div className="flex justify-center items-center">
                        <div>
                            <p className="text-md">Klik Disini untuk Melanjutkan</p>
                        </div>
                    </div>
                </button>
            </div>
        </>
    )
}

function Toast() {
    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1, translateX: 40 }}
            exit={{ opacity: 1, translateX: -40 }}
            transition={{ duration: 0.2 }} className="absolute top-5">
            <div className="bg-green-500 text-white rounded-lg py-2 px-8">
                Berhasil di salin
            </div>
        </motion.div>

    )
}

export default MidtransInformation;