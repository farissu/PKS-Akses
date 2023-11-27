import React, { useContext } from "react";
import ProgresBar from "./ProgresBar";
import { useRouter } from "next/router";
import Image from "next/image";
import { PrefixContext } from "../context/PrefixContext";
import Link from "next/link";
import calculateDaysUntilExpiration from "@/helpers/expireDate";
const ListProgramCard = ({
  thumbnail,
  name,
  category_ids,
  total_funded,
  slug,
  expire_date,
  target,
  bgColour,
  colorPrimary
}: any) => {

  const router = useRouter();
  const ref = router.query.source ?? '';
  const prefix = useContext(PrefixContext)
  const image = thumbnail
  const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxNTAiIHZpZXdCb3g9IjAgMCAxMDAgMTUwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjMjIyIj48cGF0aCBkPSJNMCAwdjE1MGg4NHYxNTBoLTg2eiIvPjwvc3ZnPg=='

  const divStyles = {
    backgroundColor: bgColour,
    color: "#FFFFFF", // Specify the text color here
  };

  const urlGambarDefault = "/default.png"; // Ganti dengan URL gambar default yang diinginkan

  const handleGambarError = (event: any) => {
    event.target.src = urlGambarDefault;
  };

  return (
    <Link href={`${prefix != null && prefix != "" ?  prefix +"/" : "/program/" }` + slug + (typeof window != "undefined" ? window.location.search : "")} className="w-full cursor-pointer first:mt-3 mt-1">
      <div className="border rounded flex items-center  bg-white leading-[1.25em] border-gray-300 w-full max-h-full hover:drop-shadow-lg hover:drop-shadow-cyan-500/50">
        <figure className="m-0 mr-5 flex aspect-[16/10] h-fit flex-1 items-center justify-center">
          <Image src={image + "w=200&h=auto&q=100&upscale=true&auto=compress,format"} alt={name} onError={handleGambarError} quality={100} sizes="100vw" width={0} height={0} className="w-full" />
        </figure>
        <div className="pr-2 py-2  flex-col flex-1 ">
          <h3 className="font-bold text-xs h-8 w-full line-clamp-2 mb-5 ">
            {name}
          </h3>
          <ProgresBar
          progress={total_funded}
            target={target}
            colorPrimary={colorPrimary}
          />
          <div className=" flex items-center justify-between w-full text-xs md:max-w-[360px]:text-[10px]">
            <p className="font-semibold">{total_funded}</p>
            {calculateDaysUntilExpiration(expire_date).message}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListProgramCard;
