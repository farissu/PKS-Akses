import {  findByKey } from "@/erp/program";
import { openApiGetCategory } from "@/erp/category";
import BottomNavbar from "@/components/Home/BottomNavbar";
import { useState, useEffect, useContext } from "react";
import ListProgramCard from "@/components/Home/ListProgramCard";
import { IoGridOutline, IoList, IoFilter, IoArrowDown } from "react-icons/io5";
import DialogFilter from "@/components/Home/DialogFilter";
import DialogSort from "@/components/Home/DialogSort";
// import { openApiCompany } from "@/erp/company";
import formatRupiah from "@/erp/Helpers/formatRupiah";
import Head from "next/head";
import Navbar from "@/components/Program/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { CompanyContext } from "@/components/context/CompanyContext";
import ProgramCard from "@/components/Home/ProgramCard";

export async function getServerSideProps({ query, req }: any) {
    let search = query.key ? String(query.key) : '';
    let layanan = await openApiGetCategory(req.headers.host);
    const program = await findByKey(query.key, req.headers.host)
    return { props: { layanan: layanan, program: program } };
}


interface Profile {
    id: number
    name: string
    categoryname: string
    total_funded: number
    slug: string
    expire_date: string
    target: number
    colorPrimary: string
    color: string
    text_color: string
    image_url: string
    url_web: string
}

export default function Search({ program, search, layanan }: any) {

    const company = useContext(CompanyContext)
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const [changeLayout, setchangeLayout] = useState(false);
    const [listProgram, setListProgram] = useState(program || [])
    useEffect(() => {
        setListProgram(program)
    }, [program])
    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsNavbarFixed(true);
        } else {
            setIsNavbarFixed(false);
        }
    };
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
    }
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Head><title>Program</title></Head>

                    <div className="bg-gray-100">
                        <div className="mx-auto min-h-screen shadow-lg max-w-md">
                            <Navbar />
                            <CategoryFilter company={company} dochangeLayout={setchangeLayout} layanan={layanan} filterData={setListProgram} />
                            <FilterComponent program={listProgram} isFlexLayout={changeLayout} company={company} />
                            {/* <ListSearch program={program} mendesak={mendesak} category={layanan} activeData={activeData} company={company} /> */}
                        </div>
                    </div>
                </motion.div>
                <div className="max-w-md mx-auto">
                    <BottomNavbar />
                </div>

            </AnimatePresence>
        </>
    );
}


const CategoryFilter = ({ company, dochangeLayout, layanan, filterData }: any) => {
    const [showFilter, setshowFilter] = useState(false)
    const [showSort, setshowSort] = useState(false)
    const [changeLayout, setchangeLayout] = useState(false)
    const [sortItemsByCategory, setsortItemsByCategory]: any = useState("");
    const [isSort, setIsSort]: any = useState("")
    const [isMendesak, setIsMendesak]: any = useState(false)
    useEffect(() => {
        const filterBycategori_id = async () => {
            if (sortItemsByCategory.id != undefined) {
                const res = await fetch(`/api/program/findByCategoryID?id=${sortItemsByCategory.id}`)
                const result = await res.json()
                setIsSort(false)
                setIsMendesak(false)
                filterData(result.program);
            }
        }
        filterBycategori_id()

    }, [sortItemsByCategory])

    useEffect(() => {
        if (isSort) {
            setIsMendesak(false)
            const filterBySort = async () => {
                const res = await fetch(`/api/program/findSort?sort=${isSort}`)
                const result = await res.json()

                filterData(result.program);
            }
            filterBySort()
        }

    }, [isSort])

    useEffect(() => {
        if (isMendesak) {
            setIsSort(false)
            const filterBySort = async () => {
                const res = await fetch(`/api/program/findMendesak?sort=${isMendesak}`)
                const result = await res.json()
                filterData(result.program);
            }
            filterBySort()
        }

    }, [isMendesak])

    const handleExpand = () => {

        dochangeLayout(!changeLayout);
        setchangeLayout(!changeLayout)

    };
    return (
        <>
            <section className=" pt-20 px-4 relative">
                <div className="flex justify-between w-full">
                    <div className="flex gap-4">
                        <div
                            onClick={() => setshowFilter(true)}
                            className="flex w-[78px] h-9 border  rounded-[5px] items-center gap-0.5 justify-center"
                            style={{ borderColor: company.primary_colour }}
                        >
                            <IoFilter className="w-5 h-5 " color={company.primary_colour} />
                            <button style={{ color: company.primary_colour }}>Filter</button>
                        </div>
                        <div
                            onClick={() => setshowSort(true)}
                            className="flex w-[104px] h-9 border   rounded-[5px] items-center gap-0.5 justify-center"
                            style={{ borderColor: company.primary_colour }}
                        >
                            <IoArrowDown className="w-5 h-5" color={company.primary_colour} />
                            <button style={{ color: company.primary_colour }}>Urutkan</button>
                        </div>
                    </div>
                    {showFilter && <DialogFilter onClose={() => setshowFilter(false)} category={layanan} sortItemsByCategory={setsortItemsByCategory} />}
                    {showSort && <DialogSort onClose={() => setshowSort(false)} sortItemsByCreateDate={setIsSort} sortItemsByMendesak={setIsMendesak} />}

                    <div
                        onClick={handleExpand}
                        className="flex w-9 h-9 border  rounded-[5px] items-center justify-center"
                        style={{ borderColor: company.primary_colour }}
                    >
                        {changeLayout ? (
                            <button>
                                <IoGridOutline className="w-5 h-5" color={company.primary_colour} />
                            </button>
                        ) : (
                            <button>
                                <IoList className="w-5 h-5" color={company.primary_colour} />
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </>

    )
}

const FilterComponent = ({ program, isFlexLayout, company }: any) => {
    const [filterData, setFilterData] = useState(program)
    useEffect(() => {
        setFilterData(program)
    }, [program])
    
    if (isFlexLayout == false) {
        return (
            <div className="px-4">
                <div className="grid grid-cols-2 gap-2 pt-5">
                    {filterData.length > 0 && filterData.map(({ id, name, categoryname, total_funded, slug, expire_date, target, colorPrimary, color, text_color, image_url, url_web }: Profile) => {
                        return (
                            <ProgramCard id={id} thumbnail={image_url.replace(/https:\/\/[^/]+\/web\/image\//, url_web) + "?w=230&h=180&fit=max&auto=format,compress"} name={name} category_ids={categoryname} total_funded={formatRupiah(total_funded)} slug={slug} expire_date={expire_date} progress={total_funded} target={formatRupiah(target)} colorPrimary={company.primary_colour} bgColour={color} textColor={text_color} />
                        )
                    })}
                </div>
            </div>

        )
    } else {
        return (
            <div className="px-4">
                <div className="flex flex-col">
                    {filterData.length > 0 && filterData.map(({ id, name, categoryname, total_funded, slug, expire_date, target, image_url, color, text_color, url_web }: Profile) => {
                        return (
                            <ListProgramCard
                                key={id}
                                thumbnail={image_url.replace(/https:\/\/[^/]+\/web\/image\//, url_web)}
                                name={name}
                                category_ids={categoryname || null}
                                total_funded={formatRupiah(total_funded)}
                                expire_date={expire_date}
                                slug={slug}
                                target={formatRupiah(target)}
                                bgColour={color}
                                colorPrimary={company.primary_colour}
                                textColour={text_color}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }

}