import React, { useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import formatRupiah from "@/erp/Helpers/formatRupiah";


const ListDonatur = ({ donatur }: any) => {
    const date = new Date(donatur.create_date.replace(" ", "T"));
    date.setHours(date.getHours() + 7)
    const create_date = format(date, 'd MMMM yyyy HH:mm:ss', { locale: id });
    return (
        <div>
            <div className="flex items-center p-4  relative">
                <div className="items-center flex rounded-full bg-gray-500 min-w-[42px] w-[42px] h-[42px] mr-4">
                    <IoPersonSharp className="m-auto text-white w-[24px] h-[24px] " />
                </div>
                <div className="">
                    <h1 className="text-base font-semibold">{donatur.is_anonymous || !donatur ? 'Hamba Allah' : donatur.name}</h1>
                    <p className="text-sm font-semibold text-right absolute right-4">{formatRupiah(donatur.amount)}</p>
                    <h2 className="text-gray-500 text-sm">{create_date}</h2>
                    <h2 className="font-light text-sm">
                        {donatur.doa_message}
                    </h2>
                </div>

            </div>
        </div>
    )
};
export default ListDonatur;
