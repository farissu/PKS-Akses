import React from "react"
import { BsPatchCheckFill } from "react-icons/bs"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from "next/head";
import { openApiCompany } from "@/erp/company";
import * as fbq from '@/helpers/fbpixel'
import { AnimatePresence, motion } from "framer-motion";
export async function getServerSideProps({ req }: any) {
    let company = await openApiCompany(req.headers.host);

    return { props: { company } };
}

export default function Pending({ company }: any) {
    const router = useRouter();
    const ref = router.query.source ?? '';
    const [nominal, setNominal] = useState('');
    const [iddonasi, setIddonasi] = useState('')
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
        router.push(`/donation/${iddonasi}${ref !== '' ? `?source=${ref}` : ''}`);
    }


    return (
        <>
            <Head>
                <title>Berhasil Donasi</title>
                <link rel="icon" href={company.favicon_url} />
            </Head>
            <AnimatePresence>
                <motion.div initial={{ y: 0, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-100">
                    <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
                        <div className="flex items-center justify-center flex-col space-y-4 px-4 absolute h-3/4 sm:px-16 max-w-md w-full"
                            style={{ backgroundColor: company.info_colour }}>
                            <BsPatchCheckFill className="text-[96px]" color={company.success_colour} />
                            <h1 className="font-semibold text-xl text-center">Donasi Anda Berhasil</h1>
                            <div className="w-20 py-4">
                                <h1 className="border-[2px] border-blue-500 "></h1>
                            </div>
                            <h1 className="font-semibold text-xl text-center">{nominal}</h1>
                            <div className="text-center max-w-xs prose">
                                <p>
                                    Order ID #{iddonasi}
                                </p>
                            </div>
                        </div>
                        <div className="fixed bottom-0 w-full max-w-md p-4 justify-center items-center">
                            <button onClick={detail_Donasi} className={`px-4 py-2 rounded text-black w-full font-semibold`}
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
