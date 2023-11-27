import React from "react";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import cheerio from "cheerio";
import { HiChevronRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const ListBerita = ({ news, prefix }: any) => {
  return (
    news.map((item: any) => {
      const date = new Date(item.create_date);
      const create_date = format(date, "d MMMM yyyy", { locale: id });

      // Parsing HTML menggunakan cheerio
      const $ = cheerio.load(item.description);
      const slicedText =
        $("p")
          .text()
          .replace(/<\/p><p>|(?<=\.)\s*/g, " ")
          .split(". ")
          .slice(0, 2)
          .join(". ") + ".";

      return (
        <div className="px-3 pt-4 pb-2">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-xl"></div>
            <div className="px-3">
              <h2 className="text-black-500" style={{ fontSize: "12px" }}>
                Tanggal, {create_date}
              </h2>
            </div>
          </div>
          <div className="flex px-8 py-2">
            <div className="w-304 h-401 bg-gray-100 rounded-md">
              <div className="px-4 py-2">
                <p style={{ fontSize: "14px" }}>{item.name}</p>
              </div>

              <div className="px-4 py-2">
                <Image
                  src={item.image_url}
                  alt="image"
                  width={360}
                  height={240}
                  decoding="async"
                  data-nimg="1"
                  quality={30}
                  priority
                  className="aspect-[16/10] h-fit w-full"
                />
              </div>

              <div className="px-4">
                <p style={{ fontSize: "14px" }}>{slicedText}</p>
              </div>
              <Link
                href={prefix + "/berita/" + item.slug}
                className="flex w-full items-center gap-2 space-x-2 
                bg-transparent hover:bg-blue-400 
                text-blue-400 font hover:text-white 
                py-1 px-4 
                hover:border-transparent 
                rounded-lg w-125 h-10 text-base"
              >
                Selengkapnya
                <HiChevronRight className="w-6 h-6 bg-transparent hover:bg-blue-400 text-white-400 font hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default ListBerita;


