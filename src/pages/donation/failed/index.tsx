import React from "react"
import { RiErrorWarningFill } from "react-icons/ri"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from "next/head";
import { openApiCompany } from "@/erp/company";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { PrefixContext } from "@/components/context/PrefixContext";
import * as fbq from '@/helpers/fbpixel'
export async function getServerSideProps({ req }: any) {
    let company = await openApiCompany(req.headers.host);

    return { props: { company } };
}

export default function Failed({ company }: any) {
    const router = useRouter();
    const ref = router.query.source ?? '';
    const order_id: any = router.query.order_id ?? '';
    const [nominal, setNominal] = useState('');
    const [iddonasi, setIddonasi] = useState('')
    const prefix = useContext(PrefixContext)
    useEffect(() => {
        if (order_id != "") {
            setIddonasi(order_id)
        }

    }, [iddonasi])
    const [program, setProgram]: any = useState([])
    useEffect(() => {
        const id_donasi = router.query.id_donasi;
        const id_program = router.query.id_program;
        const nominal = router.query.nominal;
        const transaction_status = router.query.transaction_status;

        setNominal(nominal as string);
        setIddonasi(id_donasi as string);
        fetch("/api/program/findById?id=" + id_program)
            .then((res) => res.json())
            .then((data) => {
                setProgram(data?.program[0])
            });
        fbq.event('Donate', {
            value: nominal,
            currency: "IDR",
            order_id: id_donasi,
            content_name: program.slug,
            content_category: program.categoryname,
        });
    }, [router.query]);

    function detail_Donasi() {
        router.push(`${prefix}/donation/${iddonasi}${ref !== '' ? `?source=${ref}` : ''}`);
    }
    return (
        <>
            <Head><title>Gagal Donasi</title></Head>
            <AnimatePresence>
                <motion.div initial={{ y: 0, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }} className="bg-gray-100">
                    <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
                        <div className="flex items-center justify-center flex-col space-y-4 px-4 absolute h-3/4 bg-red-100 sm:px-16 max-w-md w-full">
                            <RiErrorWarningFill className="text-[96px] text-red-400" />
                            <h1 className="font-semibold text-xl text-center">Donasi Anda Tidak Berhasil</h1>
                            <div className="w-20 py-4">
                                <h1 className="border-[2px] border-red-500 "></h1>
                            </div>
                            <div className="text-center max-w-xs prose">
                                <p>
                                    Mohon maaf donasi anda tidak berhasil, Anda dapat mencoba berdonasi kembali setelah beberapa
                                    saat.
                                </p>
                            </div>
                        </div>
                        <div className="fixed bottom-0 w-full max-w-md p-4 justify-center items-center">
                            <button onClick={detail_Donasi} className={`px-4 py-2 rounded text-white w-full font-semibold`}
                                style={{ backgroundColor: company.accent_colour }}
                            >Kembali
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

        </>
    )
}