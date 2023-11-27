import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { CompanyContext } from "../context/CompanyContext";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import { PrefixContext } from "../context/PrefixContext";


const Navbar = ({ mendesak }: any) => {
  const [content, setContent] = useState('');
  const textArray = mendesak;
  const company: any = useContext(CompanyContext);
  const prefix = useContext(PrefixContext);
  const router = useRouter();
  const ref = router.query.source ?? "";
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const timer = setInterval(() => {
      setContent(textArray[currentIndex].name);
      currentIndex = (currentIndex + 1) % textArray.length;
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      Search();
    }
  };

  const Search = () => {
    router.push(
      `${
        prefix != null && prefix !== "" ? prefix + "/" : "/program/"
      }search${searchQuery !== "" ? `?key=${searchQuery}` : ""}${
        ref !== "" ? `&source=${ref}` : ""
      }`
    );
  };

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const searchboxFocus = () => {
    document.getElementById('searchbox')?.focus();
  };

  const divStyle: React.CSSProperties = {
    backgroundColor: "#FF5001",
    height: "70px",
    position: "relative",
    zIndex: 1,
  };

  return (
    <nav className="flex items-center justify-between max-w-sm" style={divStyle}>
      {company ? (
        <Image
        src={`/pks.png?w=100&h=42&q=100&upscale=true&auto=compress,format`}
        alt="logo"
        width={25.50}
        height={25.50}
        style={{
          margin: '0 15px',
          marginTop: '17px', // Added marginTop here
          marginLeft: '19px',
          marginRight: '25px',
          marginBottom: '20px'
        }}
      />
      
      ) : (
        <div className="flex items-center mr-4 w-auto h-8" ></div>
      )}
      <div className="box" style={{ marginTop: '15px', marginBottom: '20px' }}>
      <input type="checkbox" id="check" />
      <div className="search-box flex items-center">
        <input
          id="searchbox"
          className="placeholder:text-sm italic" // Add text-center and italic classes
          type="text"
          placeholder={"Cari apa saja di sini"}
          // onKeyDown={handleKeyDown}
          // value={searchQuery}
          // onChange={handleInputChange}
        />
        <label htmlFor="check" className="icon py-2 px-2">
          {/* <IoSearch className="w-7 h-7" onClick={searchboxFocus} /> */}
        </label>
      </div>
    </div>
    
      
      {/* Group Image */}
      <Image
        src="/Ellipse 1.png?w=100&h=42&q=100&upscale=true&auto=compress,format"
        alt="logo"
        width={34}
        height={34}
        style={{ margin: '0 15px', marginTop: '17px', marginLeft: '17px', marginBottom: '20px' , filter: 'brightness(0) invert(1)' }}
      />
<div style={{ position: 'absolute', backgroundColor: "#FF5001", top: '60px', width: '100%', height: '75px' }}></div>
<div style={{
  position: 'absolute',
  backgroundColor: "#fff",
  width: "100%", 
  height: "150px",
  top: "110px", 
  left: "0px", 
  right: "opx", 
  borderRadius: "20px", 

}}></div>

      
      {/* Text */}
      <p style={{ position: 'absolute', zIndex: 3, left: '20px', top: '62px', color: 'white',fontSize: '14px', fontStyle: 'italic' }}>
        Assalamu'alaikum, <span style={{ fontWeight: 'bold', fontFamily: "'Rajdhani', sans-serif", fontSize: '14px'}}>Rizki Faris</span>
        <br />Di kabupaten Bandung, Ashar jam 15:09
        <span style={{fontFamily: "'Rajdhani', sans-serif", fontSize: '12px'}}> (01:23:12)</span>
      </p>

    </nav>
  );
};

export default Navbar;
