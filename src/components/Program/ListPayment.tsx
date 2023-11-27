import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
export const ListPayment = ({ data , amount } :any) => {

    const [showListPayment, setShowListPayment] = useState(false)
    const groupedData = data.reduce((result:any, item:any) => {
        const category = item.category;

        if (!result[category]) {
            result[category] = [];
        }

        result[category].push(item);

        return result;
    }, {});

    const handleButtonClick = () => {
        setShowListPayment(false)
    }

    const aliasCategory = (key:string) => {
        switch (key) {
            case "e-wallet":
                return "E-Wallet";
                break;
            case "tf_bank":
                return "Transfer Bank";
                break;
            case "va_bank":
                return "Virtual Account";
                break;
            case "convenience_store":
                return "Convenience Store";
                break;
            default:
                return ""
        }
    }
    

    const imgixGenerate = (host: string, model: string, id_payment: string | number, fields: string) => {
        return `${host}${model}/${id_payment}/${fields}/${id_payment}.png`
    }

    return (
        <div
            id="metode_bayar_id"
            className="bg-white rounded px-4 pt-4 pb-24"
        >
            <div className="flex items-center justify-center ">
                <p className="font-ui-sans text-center block text-black font-bold pb-4">
                    Metode Pembayaran
                </p>
            </div>
            <button
                onClick={() => setShowListPayment(true)}
                className="text-sm hover:shadow-lg w-full bg-white text-black py-4 px-4 rounded flex justify-between items-center border border-gray-200"
            >
                <span className="">
                    {/* {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="logo"
                            className="w-10 h-4 mr-8 inline-block"
                        />
                    )} */}
                    {"Pilih Metode Pembayaran"}
                </span>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ml-auto h-4 w-4"
                />
            </button>


            {showListPayment && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full z-10">
                        <div className="max-w-md mx-auto bg-gray-400 opacity-50 h-full"></div>
                    </div>
                    <div className="flex items-center justify-center overflow-y-scroll">
                        {/* <div ref={metodeBayarRef} /> */}
                        <div
                            className={`fixed z-20 bottom-0 bg-white w-full transition-all duration-500  max-w-md h-3/4 rounded-t-xl overflow-y-scroll`}
                        >
                            <div className="sticky px-2 border top-0 z-30 flex mb-2 justify-start border-b bg-white w-full max-w-md rounded-t-xl ">
                                <button onClick={handleButtonClick} className="p-5">
                                    <IoClose className="h-6 w-6" />
                                </button>
                                <span className="py-4 mt-1 font-semibold">
                                    Pilih Metode Pembayaran
                                </span>
                            </div>
                            {Object.keys(groupedData).map((item) => {
                                return (
                                    <div className="px-2">
                                        <div className="hover:text-black text-sm w-full bg-gray-100 text-black py-3 px-4 flex justify-between items-center font-bold  mb-2 " key={item}>
                                            {aliasCategory(item)}
                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                                className={`h-4 w-4 ml-auto transform rotate-90" : ""
                                            }`}
                                            />
                                        </div>
                                        {groupedData[item].map((pay: any) => {
                                            return (
                                                <div className="px-4 py-4 text-sm w-full flex justify-start  border-b" key={pay.name}>
                                                    <Image src={imgixGenerate(pay.url_web, 'cnt_cf.payment', pay.id, 'logo')} width={0} height={0} alt={pay.name} sizes="100vw" className="w-10 h-4 inline-block mr-8" />
                                                    {pay.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>

            )}


            {/* {errorBayar && (
                <span className="text-red-600 text-xs">{errorBayar}</span>
            )} */}



        </div>
    )
}