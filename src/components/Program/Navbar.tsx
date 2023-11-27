import React, { useState , useContext} from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/router";
import { CompanyContext } from "../context/CompanyContext";
import { PrefixContext } from "../context/PrefixContext";
const Navbar = () => {
  const company:any = useContext(CompanyContext)
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const router = useRouter()
  const ref = router.query.source ?? ''
  const prefix = useContext(PrefixContext)
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
  const [searchQuery, setSearchQuery] = useState('');

  function handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      Search();
    }
  }

  function Search() {
    router.push(
      `${prefix != null && prefix != "" ?  prefix +"/" : "/program/" }search${searchQuery !== '' ? `?key=${searchQuery}` : ''}${ref !== '' ? `?source=${ref}` : ''}`
    );
  }
  function Logo() {
    router.push(
      `${prefix}${ref !== '' ? `?source=${ref}` : ''}`
    );
  }

  function handleInputChange(event: any) {
    setSearchQuery(event.target.value);
  }

  return (
    <>
      <nav
        className={`fixed max-w-sm w-full top-0 flex items-center justify-between  shadow-md z-50 px-4 py-3`}
        style={{backgroundColor:"#ffffff"}}
      >
        {company ? (
          <img
            src={company.image_url + "?w=100&q=100"}
            alt={company.name}
            width={80}
            height={36}
            decoding="async"
            data-nimg="1"
            className="flex items-center mr-4 "
            style={{cursor:"pointer"}}
            onClick={Logo}
          />
        ) : (<div className="flex items-center mr-4 w-auto h-8"></div>)}
        <div className="box">
          <input type="checkbox" id="check" />
          <div className="search-box">
            <input type="text" placeholder="Type here..." className="text-sm"
              onKeyDown={handleKeyDown}
              value={searchQuery}
              onChange={handleInputChange} />
            <label htmlFor="check" className="icon py-2 px-2">
              <IoSearch className="w-5 h-5" />
            </label>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
