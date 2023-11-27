import React, { useEffect, useState, useContext, useCallback } from "react";
import Image from "next/image";

import { MdAccountCircle,
  MdEventAvailable,
  MdCardGiftcard,MdHome

} from "react-icons/md";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { PrefixContext } from "../context/PrefixContext";
import { CompanyContext } from "../context/CompanyContext";
import Link from "next/link";
function BottomNavbar({ active, colour }: any) {
  const router = useRouter();
  const prefix = useContext(PrefixContext)
  const company = useContext(CompanyContext)
  const ref = router.query.source ?? "";
  const [phones, setPhones] = useState("");
  const [donasi, setDonasi] = useState(true);

  const cookie_login = Cookies.get("login");
  useEffect(() => {
    if (cookie_login != undefined) {
      setDonasi(false);
    }
  }, [cookie_login, router]);

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    setTimeout(() => {
      //@ts-ignore
      setPhones(company.phone)
    }, 2000)

  }, [company]);

  const Home = useCallback(() => {
    router.push(`${prefix}/${ref !== "" ? `?source=${ref}` : ""}`);
  }, [router,prefix]);

  const rewards = useCallback(() => {
    router.push(`${prefix}/${ref !== "" ? `?source=${ref}` : ""}`);
  }, [router,prefix]);

  const Berita = useCallback(() => {
    router.push(`${prefix}/berita${ref !== "" ? `?source=${ref}` : ""}`);
  }, [router,prefix]);

  const Donasi = useCallback(() => {
    router.push(
      donasi ? `${prefix}/donation${ref !== "" ? `?source=${ref}` : ""}` : "/akun/donasi"
    );
  }, [router, donasi,prefix]);

  const Profil = useCallback(() => {
    router.push(`${prefix}/akun${ref !== "" ? `?source=${ref}` : ""}`);
  }, [router,prefix]);

  function Keranjang() {
    router.push(`${prefix}/keranjang${ref !== "" ? `?source=${ref}` : ""}`);
  }

  const divStyle = {
    color: '#FF5001'
  }

  const divStyleGrey = {
    color: '#a6a6a6'
  }

  return (
    <nav className="fixed max-w-sm w-full h-[58px] bottom-0  flex-col items-center drop-shadow-[0_-4px_10px_rgba(0,0,0,0.15)] border-t-[1px] justify-between px-2 py-2 bg-white" >
      <div className="flex items-center justify-between w-full">
      <a
        className="text-xs text-center whitespace-nowrap font-medium flex items-center justify-center flex-col cursor-pointer"
        onClick={Home}
      >
        <button className="flex flex-col items-center justify-center bg-white" style={{ marginBottom: "-2px" }}>
          {active === "Home" ? (
              <MdHome className="w-6 h-6" style={divStyle} />
              ) : (
                <MdHome className="w-6 h-6" style={divStyleGrey} />
          )}
        </button>

            <div className="mt-1 w-[66px] text-center text-gray-400">home</div>
          {/* )} */}
        </a>

        {/* <a
          className="text-xs text-center whitespace-nowrap font-medium flex items-center justify-center flex-col cursor-pointer"
          onClick={Donasi}
        >
          <button className="flex flex-col items-center justify-center bg-white ">
            {active == "Donasi" ? (
              <IoDocumentText className="w-6 h-6" style={divStyle} />
            ) : (
              <IoDocumentText className="w-6 h-6" style={divStyleGrey} />
            )}
          </button>
          {active == "Donasi" ? (
            <div className="mt-1 w-[66px] text-center" style={divStyle}>History</div>
          ) : (
            <div className="mt-1 w-[66px] text-center text-gray-400">History</div>
          )}
        </a> */}
        {/* <a
          className="text-xs text-center whitespace-nowrap font-medium flex items-center justify-center flex-col cursor-pointer"
          onClick={Keranjang}
        >
          <button className="flex flex-col items-center justify-center bg-white ">
            <IoCart className="w-6 h-6" />
          </button>
          <div className="mt-1 w-[66px] text-center">Keranjang</div>
          {cartItems.length > 0 &&(
            <span className="w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center absolute top-[8px] ml-4 text-[10px]">
              {cartItems.length}
            </span>
          )}
        </a> */}
        <a
          className="text-xs text-center whitespace-nowrap font-medium flex items-center justify-center flex-col cursor-pointer"
          onClick={Profil}
        >
        <button className="flex flex-col items-center justify-center bg-white" style={{ marginBottom: "-2px" }}>
          {active === "Profil" ? (
              <MdAccountCircle className="w-6 h-6" style={divStyle} />
              ) : (
                <MdAccountCircle className="w-6 h-6" style={divStyleGrey} />
          )}
        </button>
            <div className="mt-1 w-[66px] text-center text-gray-400">akun</div>
        </a>
        <a
          className="text-xs text-center whitespace-nowrap font-medium flex items-center justify-center flex-col cursor-pointer"
          onClick={Berita}
        >

<button className="flex flex-col items-center justify-center bg-white" style={{ marginBottom: "-2px" }}>
          {active === "Berita" ? (
              <MdEventAvailable className="w-6 h-6" style={divStyle} />
              ) : (
                <MdEventAvailable className="w-6 h-6" style={divStyleGrey} />
          )}
        </button>
            <div className="mt-1 w-[66px] text-center text-gray-400">aktifitas</div>
        </a>
        
        <a
          className="text-xs text-center whitespace-nowrap font-medium flex items-center justify-center flex-col cursor-pointer"
          onClick={rewards}
        >

<button className="flex flex-col items-center justify-center bg-white" style={{ marginBottom: "-2px" }}>
          {active === "rewards" ? (
              <MdCardGiftcard className="w-6 h-6" style={divStyle} />
              ) : (
                <MdCardGiftcard className="w-6 h-6" style={divStyleGrey} />
          )}
        </button>
            <div className="mt- w-[66px] text-center text-gray-400">rewards</div>
        </a>
        
        
      </div>
      {/* <div className="absolute top-[-42px] ">
        {phones && (<Link href={`https://wa.me/${phones}?text=Assalamualaikum, Saya mau berkonsultasi`} target="_blank" className="ease-in transition-all">
          <button className="bg-green-500 w-[125px] h-8 rounded-[5px] flex items-center justify-center gap-0.5 text-[14px]">
            <IoLogoWhatsapp className="w-4 h-4 text-white" />
            <p className="text-white">Hubungi Kami</p>
          </button>
        </Link>)}

        {!phones && (
          <button className="bg-green-500 w-[125px] h-8 rounded-[5px] flex items-center justify-center gap-0.5 text-[14px]">
            <IoLogoWhatsapp className="w-4 h-4 text-white" />
            <p className="text-white">Hubungi Kami</p>
          </button>)}

      </div> */}
    </nav>
  );
}

export default BottomNavbar;
