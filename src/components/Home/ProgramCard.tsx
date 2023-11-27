import ProgresBar from "./ProgresBar";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { useContext } from "react";
import { PrefixContext } from "../context/PrefixContext";
import Link from 'next/link'
import { useMemo } from "react";
import calculateDaysUntilExpiration from "@/helpers/expireDate";
const ProgramCard = ({
  isShowCreateDate = true,
  id,
  thumbnail,
  name,
  category_ids,
  total_funded,
  slug,
  expire_date,
  target,
  colorPrimary,
  bgColour,
}: any) => {
  const [isLoading, setLoading] = useState(false);
  const prefix = useContext(PrefixContext)
  const router = useRouter();
  const ref = router.query.source ?? "";
  const image = thumbnail;
  const roundedCornerSize = "17px";
  const routePath = useMemo(() => {
    return `${prefix != null && prefix != "" ? prefix + "/" : "/program/"}${slug}${typeof window != "undefined" ? window.location.search : ""}`;
  }, [slug, prefix]);

  const blurDataURL =
    "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxNTAiIHZpZXdCb3g9IjAgMCAxMDAgMTUwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjMjIyIj48cGF0aCBkPSJNMCAwdjE1MGg4NHYxNTBoLTg2eiIvPjwvc3ZnPg==";

  const Program = async (props: any) => {


    try {
      setLoading(true);
      // window.location.href = `${prefix}/program/` + slug + window.location.search;
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false); // Pastikan untuk mengatur isLoading ke false jika terjadi kesalahan.
    }
  };


  const divStyles = {
    backgroundColor: bgColour,
    color: "#FFFFFF", // Specify the text color here
  };

  const urlGambarDefault = "/default.png"; // Ganti dengan URL gambar default yang diinginkan

  const handleGambarError = (event: any) => {
    event.target.src = urlGambarDefault;
  };



  return (
    <>

      <div
      >

        <Link href={routePath} >
          <div onClick={Program} className="w-full cursor-pointer" key={id}>
             
            <div className="border rounded w-full max-h-full bg-white text-black hover:drop-shadow-lg hover:drop-shadow-cyan-500/50" style={{ borderRadius: roundedCornerSize,}}> 
              <Image
                style={{ borderRadius: roundedCornerSize,}}
                src={image + "?w=400&h=auto&q=100&upscale=true&auto=compress,format"}
                alt={name}
                width={0}
                height={0}
                sizes="100vw"
                quality={100}
                className=" aspect-[6/10] h-fit  w-full h-full "
                onError={handleGambarError}
              />
              {/* <h3 className="m-2 font-bold text-xs h-[32px] max-h-[32px] line-clamp-2">
                {name}
              </h3> */}
              {/* <div className="mx-2 mb-2"> */}
                {/* className={`bg-[${bgColour}] text-[${textColour}] rounded-lg text-xs md:text-[10px]`} */}
                {/* <button style={divStyles} className="rounded-lg text-xs">
                  <p className="mx-2">{category_ids}</p>
                </button> */}
              {/* </div> */}

              {/* <div className="mx-2 mt-2 flex items-center justify-between text-xs max-w-full md:max-w-[360px]:text-[10px] pb-2">
                <p className="font-semibold truncate">{total_funded}</p>

                {isShowCreateDate && (
                  <p className="text-xs line-clamp-1">{calculateDaysUntilExpiration(expire_date).message}</p>
                )}
              </div> */}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default ProgramCard;
