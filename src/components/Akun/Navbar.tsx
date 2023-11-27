import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoSearch, IoArrowBack } from "react-icons/io5";
import { BiDonateHeart, BiArrowBack } from "react-icons/bi";
import { UrlObject } from "url";

function Navbar({ route, title, colorPrimary }:any) {

  const router = useRouter();
  function handleClick(link: string | UrlObject) {
    router.push(link);
  }
  return (
    <nav
      className={` fixed max-w-sm w-full max-h-[60px] h-full top-0 flex items-center shadow-md z-50 p-4`}
      style={{backgroundColor:"#ffffff"}}
    >
      <button onClick={() => handleClick(route)}>
        {route != "" ? (
          <IoArrowBack className="text-black w-6 h-6 mr-4" />
        ) : (
          <div></div>
        )}
      </button>
      <h1 className="text-black font-semibold">{title}</h1>
    </nav>
  );
}
export default Navbar;
