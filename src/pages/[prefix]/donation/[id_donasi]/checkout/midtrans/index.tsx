import React, { useState, useEffect, useContext } from "react";
import { IoCopyOutline, IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/router";
import Script from 'next/script'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { findByID } from "@/erp/payment";
import { findByIDDonasi } from '@/erp/transaction';
import { findByIDDonasiCart } from "@/erp/transaction_cart";
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import formatRupiah from "@/erp/Helpers/formatRupiah";
import { findNameByID } from "@/erp/donatur";
import Head from "next/head";
import { PrefixContext } from "@/components/context/PrefixContext";
const PUBLIC_MIDTRANS_CLIENT_ID = process.env.PUBLIC_MIDTRANS_CLIENT_ID
const colorPrimary = process.env.PUBLIC_THEME_PRIMARY_COLOR
const colorSecondary = process.env.PUBLIC_THEME_SECONDARY_COLOR

export async function getServerSideProps({ query }: any) {

    


    const id_donasi = query.id_donasi as string;
    if (!id_donasi) {
        throw new Error('Transaction Not found');
    }
    let transaction: any;
    if (id_donasi) {
        transaction = await findByIDDonasi(id_donasi);
    }
    if (transaction == null) {
        transaction = await findByIDDonasiCart(id_donasi)
    }
    if (!PUBLIC_MIDTRANS_CLIENT_ID) {
        return {
            redirect: {
                statusCode: 303,
                destination: transaction.payment_link
            }
        };
    }

    const urlPaymentSplitted = transaction.payment_link.split('/');
    return {
        props: {
            transaction: transaction,
            snapDataToken: urlPaymentSplitted[urlPaymentSplitted.length - 1],
            payment: await findByID(transaction.payment_id),
            donatur: await findNameByID(transaction.donor_id),
            colorPrimary,
            colorSecondary
        }
    };
}

export default function Intruction({ transaction, payment, snapDataToken, donatur, colorPrimary, colorSecondary }: any) {
    const router = useRouter();
    const ref = router.query.source ?? '';
    const date = new Date(transaction ? transaction.create_date : null);
    date.setHours(date.getHours() + 7);
    const create_date = format(date, 'EEEE, dd MMMM yyyy HH:mm', { locale: id });

    const id_donasi = transaction.id_donasi
    const prefix = useContext(PrefixContext)
    function cekStatus() {
        router.push(`${prefix}/donation/${id_donasi}${ref !== '' ? `?source=${ref}` : ''}`);
    }

    const copyIdDonasi = async () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(id_donasi);
                toast.success("Kode Donasi Berhasil Disalin", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (err) {
            }
        }
    };

    const copyToClipboard = async () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(transaction.amount);
                toast.success("Nominal Berhasil Disalin", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (err) {
            }
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
    
    useEffect(() => {

        
        // addFBQ({
        //     event_name: "Purchase",
        //     content_category: response.data.result.program_category_id,
        //     content_name: response.data.result.program.slug,
        //     currency: "IDR",
        //     order_id: order,
        //     event_id: response.data.result.fb_event_id ? response.data.result.fb_event_id : event_id,
        //     value: response.data.result.amount
        //   });
        showSnap();
    }, []);

    function showSnap() {
        setIsSnapOnProgress(true);

        const analytics_data = {
            nominal: transaction.amount,
            id_program: transaction.program_id,
            id_donasi: transaction.id_donasi
        };

        const analyticsSearchParams = new URLSearchParams(analytics_data);

        const snapTimeout = setTimeout(() => {
            (window as any).snap.pay(snapDataToken, {
                onSuccess: function (result: any) {
                    const successUrl = `${prefix}/donation/success?${analyticsSearchParams.toString()}${ref !== '' ? `?source=${ref}` : ''}`;
                    window.location.href = successUrl;
                },
                onPending: function (result: any) {
                    setIsSnapOnProgress(false);
                },
                onError: function (result: any) {
                    setIsSnapOnProgress(false);
                    const failedUrl = `${prefix}/donation/failed?${analyticsSearchParams.toString()}${ref !== '' ? `?source=${ref}` : ''}`;
                    window.location.href = failedUrl;
                },
                // onClose: function () {
                //     setIsSnapOnProgress(false);
                // }
            });
        }, 1000);
        return () => clearTimeout(snapTimeout);
    }


    return (
        <>
            <Head><title>Instruksi Pembayaran</title></Head>
            <div className="bg-gray-100">
                <Script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={process.env.PUBLIC_MIDTRANS_CLIENT_ID} />
                <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
                    <div className={`w-full max-h-[110px] h-full bg-[#${colorPrimary}]`}>
                        <div className="text-white p-4 text-sm">
                            <p className="mb-2">Batas Waktu Pembayaran belum bisa</p>
                            <p className="font-semibold">{create_date}</p>
                        </div>
                    </div>
                    <ToastContainer />
                    <div className="rounded-t-[10px] bg-white z-50 px-4 pt-6 pb-4">
                        <button onClick={showSnap}>
                            <div className="flex pb-4 items-center">
                                <img className="max-h-7 h-full w-auto max-w-[90px] mr-4" src={"data:image/png;base64," + payment.logo} alt="logo" />
                                <p>{payment.name}</p>
                            </div>
                        </button>
                        <p className="text-sm">Klik {payment.name} untuk melanjutkan pembayaran</p>
                        <div className="w-full p-4 bg-gray-100 mt-4 rounded flex justify-between items-center drop-shadow-md">
                            <div>
                                <p className="text-sm">Jumlah Donasi</p>
                                <p className="font-bold text-xl">{formatRupiah(transaction.amount)}</p>
                            </div>
                            <button onClick={copyToClipboard} className="text-[#2972b6] flex justify-center items-center gap-2">
                                <p>Salin</p>
                                <IoCopyOutline />
                            </button>
                        </div>
                    </div>
                    <div className="border-[2px]" />
                    <div className="p-4">
                        <button className="w-full" onClick={toggleCaraBayar}>
                            <div className={`p-4 flex border bg-white justify-between items-center ${caraBayar ? 'rounded-t' : 'drop-shadow-md rounded'}`}>
                                <div>
                                    <p className="text-sm">Cara Pembayaran</p>
                                </div>
                                <div className="text-gray-500">
                                    {caraBayar ? (<IoChevronForward className="w-5 h-5 rotate-90" />) :
                                        (
                                            <IoChevronForward className="w-5 h-5" />
                                        )}
                                </div>
                            </div>
                        </button>
                        <div className={`${caraBayar ? '' : 'hidden'} `}>
                            <div className="w-full border-x border-b text-sm px-4 py-2">
                                <p className="font-semibold">Cara Pembayaran</p>
                                {payment.category == 'e-wallet' ? (
                                    <ol style={{ listStyleType: 'decimal' }} className="pl-4">
                                        <li>Open your {payment.name} or other e-wallet app.</li>
                                        <li>Scan the QR code on your monitor.</li>
                                        <li>Confirm payment in the app.</li>
                                        <li>Payment complete</li>
                                    </ol>
                                ) : (
                                    <ol style={{ listStyleType: 'decimal' }} className="pl-4">
                                        <li>Lakukan pembayaran melalui ATM / mobile banking / SMS banking / kantor bank terdekat.</li>
                                        <li>Pilih Menu transfer.</li>
                                        <li>Isi <b>Nomor Virtual Account</b> sesuai yang ada di halaman pembayaran <b>(a.n Citra Niaga Teknologi).</b></li>
                                        <li>Masukan <b>nominal donasi</b> sesuai jumlah donasimu.</li>
                                        <li>Pembayaran akan diverifikasi. Waktu verifikasi paling lambat 1x24 jam untuk sesama bank, dan 2x24 jam dihari jika antar bank berbeda.</li>
                                    </ol>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="border-[2px]" />
                    <div className="p-4">
                        <div className="text-sm flex items-center mb-4">
                            <p className="mr-2">Kode Donasi</p>
                            <button onClick={copyIdDonasi} className="text-[#2972b6] font-semibold gap-1 flex justify-center items-center ">
                                <p>{id_donasi}</p>
                                <IoCopyOutline />
                            </button>
                        </div>
                        <button className="w-full" onClick={toggleAccordion}>
                            <div className={`p-4 flex border bg-white justify-between items-center ${isOpen ? 'rounded-t' : 'drop-shadow-md rounded'}`}>
                                <div>
                                    <p className="text-sm">Rincian Donasi</p>
                                </div>
                                <div className="text-gray-500">
                                    {isOpen ? (<IoChevronForward className="w-5 h-5 rotate-90" />) :
                                        (
                                            <IoChevronForward className="w-5 h-5" />
                                        )}

                                </div>
                            </div>
                        </button>
                        <div className={`pb-16 ${isOpen ? '' : 'hidden'} `}>
                            <div className="w-full border-x border-b text-sm px-4 py-2">
                                <p>Nama</p>
                                <p className="font-semibold">{transaction.is_anonymous || !donatur ? 'Hamba Allah' : donatur}</p>
                            </div>
                            <div className="w-full border-x border-b text-sm px-4 py-2">
                                <p>Nominal Donasi</p>
                                <p className="font-semibold">{formatRupiah(transaction.amount)}</p>
                            </div>
                            <div className="w-full border-x border-b text-sm px-4 py-2">
                                <p>Metode Pembayaran</p>
                                <p className="font-semibold">{payment.name}</p>
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
                        className="max-w-md w-full bottom-0 fixed">
                        <div className="bg-[#ED6C56] hover:bg-red-500 text-white m-4 p-3 rounded">
                            <p>Cek Status pembayaran</p>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}