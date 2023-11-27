import ProgramCard from "./ProgramCard";
import { useRouter } from "next/router";
import { useContext } from 'react'
import { PrefixContext } from "../context/PrefixContext";
import Link from "next/link";
import Image from "next/image";

import {
  IoHome,
  IoNewspaper,
  IoReaderOutline,
  IoPersonCircle,
  IoLogoWhatsapp,
} from "react-icons/io5";
const ProgramPilihan = ({ mendesak, company }: any) => {
  const router = useRouter()
  const ref = router.query.source ?? '';

  const prefix = useContext(PrefixContext)
  return (
    <>
      {mendesak ? (
        <section className="relative mx-4 my-7"  style={{marginTop: "-25px",}}>
          <div className="flex ">
          <button className="flex flex-col items-center justify-center bg-white">
          <Image
        src="/terbaru.png?w=100&h=42&q=100&upscale=true&auto=compress,format"
        alt="logo"
        width={36}
        height={36}
        style={{marginTop: '0px', marginLeft: '8px', marginBottom: '10px'}}
      />
        </button>
            <h2 style={{fontSize : "19px",marginTop: "0px",color: '#2D4356', opacity: "0.6"}}>Terbaru</h2>
            <Link href={`${prefix != null && prefix != "" ? prefix + "/programs" : "/program/"}${ref !== '' ? `?source=${ref}` : ''}?mendesak=${true}`}>
              {/* <h3 style={{ color: company.primary_colour }}>Lainnya</h3> */}
            </Link>
          </div>
          <div className="items-center justify-start overflow-x-scroll pb-2 px-0.5 flex flex-row space-x-4">
            {mendesak.map((item: any) => {
              return (
                <div className="min-w-[170px] " style={{marginBottom: "15px"}} key={item.id}>
                  <ProgramCard
                    // id={item.id}
                    thumbnail={item.image_url}
                    // name={item.name}
                    // category_ids={item.categoryname || null}
                    // total_funded={item.total_funded}
                    // slug={item.slug}
                    // expire_date={item.expire_date}
                    // target={item.target}
                    // bgColour={item.color}
                    // textColour={item.text_color}
                    // colorPrimary={company.primary_colour}
                    isShowCreateDate={false}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ) : (null)}
    </>
  );
};

export default ProgramPilihan;
