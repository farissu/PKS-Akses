import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import formatRupiah, { Currency } from "@/erp/Helpers/formatRupiah";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { findBySlug } from "@/erp/program";
import { get } from "@/erp/payment";
import Head from "next/head";
import Image from "next/image";
import { BsEmojiSmile } from "react-icons/bs";
import { PrefixContext } from "@/components/context/PrefixContext";

export async function getServerSideProps({ query }: any) {
  const slug = query.slug as string;
  let program = await findBySlug(slug);
  let payment = await get();
  return { props: { payment: Object.values(payment), program } };
}

export default function HalamanKeranjang({ payment, program }: any) {
  // cart

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    const updatedCartItems = cartItems.map((item: any) => ({
      ...item,
      selected: checked,
    }));
    setCartItems(updatedCartItems);
  };

  const handleItemSelectChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ) => {
    const checked = event.target.checked;
    const updatedCartItems = cartItems.map((item: any) => {
      if (item.id === itemId) {
        return {
          ...item,
          selected: checked,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleDeleteClick = () => {
    const updatedCartItems = cartItems.filter((item: any) => !item.selected);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  //muncul pop up saat klik icon header , keluar atau tetap di halaman
  const [showPopupHeader, setShowPopupHeader] = useState(false);
  const metodeBayarRef = useRef(null);
  const router = useRouter();
  const ref = router.query.source ?? "";
  function handleIconClickHeader() {
    setShowPopupHeader(true);
  }

  function handlePopupCloseHeader() {
    setShowPopupHeader(false);
  }

  // untuk pembayaran
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const [paymentMethodBayar, setSelectedOptionBayar] = useState<
    typeof payment | null
  >(null);
  const [errorBayar, setErrorBayar] = useState("");

  const handleOptionClickBayar = (
    event: React.MouseEvent<HTMLButtonElement>,
    option: typeof payment
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedOptionBayar(option);
    togglePopup();
  };

  // untuk button nominal
  const [paymentMethod, setpaymentMethod] = useState<number | null>(null);

  // warning
  const [showWarning, setShowWarning] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Name
  const validateName = (name: string) => {
    const regex = /[^A-Za-z ]/g;
    return regex.test(name);
  };
  const handleInputChangeNama = (event: { target: { value: string } }) => {
    setName(event.target.value);
    setNameError("");
  };
  //phone
  const validatePhone = (phone: string) => {
    const regex = /[^0-9]/g;
    return regex.test(phone);
  };

  const handleInputChangePhone = (event: { target: { value: string } }) => {
    setPhone(event.target.value);
    setPhoneError("");
  };

  //email
  const validateEmail = (email: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  };
  const handleChange = (event: { target: { value: string } }) => {
    setEmail(event.target.value);
    setEmailError("");
  };
  function generateNumber() {
    let num = "";
    for (let i = 0; i < 12; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  }
  // const id_donasi = generateNumber();
  // console.log(id_donasi, "id donasi masuk");

  // Warning
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prefix = useContext(PrefixContext)
    let hasErrors = false;

    if (validateName(name)) {
      setNameError("*Format nama tidak valid");
      hasErrors = true;
    } else if (name == "") {
      setNameError("*Mohon diisi terlebih dahulu");
      hasErrors = true;
    } else {
      setNameError("");
      localStorage.setItem("name", name);
    }

    if (!validateEmail(email)) {
      setEmailError("*Format email tidak valid");
      hasErrors = true;
    } else if (email == "") {
      setEmailError("*Mohon diisi terlebih dahulu");
      hasErrors = true;
    } else {
      setEmailError("");
      localStorage.setItem("email", email);
    }

    if (!validatePhone(phone)) {
      localStorage.setItem("phone", phone);
    } else if (phone == "") {
    } else {
      setPhoneError("*Format phone tidak valid");
      hasErrors = true;
    }

    if ((paymentMethod && paymentMethod < 1000) || paymentMethod === 0) {
      setShowWarning("*Minimum nominal Rp1.000");
      hasErrors = true;
    } else if (paymentMethod === null) {
      setShowWarning("*Mohon diisi terlebih dahulu");
      hasErrors = true;
    } else {
      setShowWarning("");
    }
    if (selectedImage) {
      localStorage.setItem("image", selectedImage);
    }

    if (!paymentMethodBayar) {
      const element = document.getElementById("metode_bayar_id");

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setErrorBayar("*Mohon diisi terlebih dahulu");
      hasErrors = true;
    } else {
      setErrorBayar("");
      localStorage.setItem("metode", JSON.stringify(paymentMethodBayar));
    }

    if (hasErrors) {
      return;
    }
    const program = cartItems
      ? cartItems.map((item) => ({ id: item.id, nominal: item.nominal }))
      : null;
    const program_ids = program ? program.map((item) => item.id) : null;
    let number = generateNumber();
    let postData = {
      no_bukti: number,
      id_donasi: number,
      name,
      phone,
      email,
      payment_id: paymentMethodBayar?.id,
      donations: [] as { program_id: number; nominal: number }[],
      program_ids: program_ids,
      amount: paymentMethod,
      doa_message: inputDoa,
      is_anonymous: checked,
      affliater_code: ref,
    };

    if (program) {
      program.forEach(({ id, nominal }) => {
        postData.donations.push({
          program_id: id,
          nominal: nominal,
        });
      });
    }
    // console.log(postData, "postdata")

    const response = await fetch("/api/donasi", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // localStorage.removeItem("cartItems");
    const data = await response.json();
    const id_donasi = data.transactionsCartList[0].id_donasi;
    const payment_link = data.transactionsCartList[0].payment_link;
    if (data.transactionsCartList[0].payment_id == "15") {
      window.open(payment_link);
    } else {
      if (ref !== "") {
        router.push(`/donation/${id_donasi}/checkout/midtrans?source=${ref}`);
        
      } else {
        router.push(`/donation/${id_donasi}/checkout/midtrans`);
      }
    }
  };

  //untuk input doa
  const [inputDoa, setDoa] = useState("");

  const handleInputChangeDoa = (event: any) => {
    setDoa(event.target.value);
  };

  // CheckBox
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  // PopUp
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleButtonClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent form submission event
    togglePopup();
  };

  // Button DropDown
  const [isOpen1, setIsOpen1] = useState(false);
  const toggleDropdown1 = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen1(!isOpen1);
  };

  const [isOpen2, setIsOpen2] = useState(false);
  const toggleDropdown2 = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen2(!isOpen2);
  };

  const [isOpen3, setIsOpen3] = useState(false);
  const toggleDropdown3 = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen3(!isOpen3);
  };

  const [isOpen4, setIsOpen4] = useState(false);
  const toggleDropdown4 = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen4(!isOpen4);
  };

  const totalNominal = cartItems.reduce((acc, item) => {
    if (item.length === 1) {
      return item.nominal;
    }
    return acc + item.nominal;
  }, 0);

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedMetode = localStorage.getItem("metode");
    const storedImage = localStorage.getItem("image");
    if (storedMetode) setSelectedOptionBayar(JSON.parse(storedMetode));
    if (storedImage) setSelectedImage(storedImage);
    if (storedPhone) setPhone(storedPhone);
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    setpaymentMethod(totalNominal);
  }, [totalNominal]);
  const prefix = useContext(PrefixContext)
  return (
    <>
      <Head>
        <title>Keranjang</title>
      </Head>

      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md">
            <header className="flex items-center justify-between bg-[#346FB2] text-white p-4">
              <div className="flex items-center">
                <button
                  className="flex items-center"
                  onClick={handleIconClickHeader}
                >
                  <IoArrowBack className="w-6 h-6 hover:text-white inline-block align-middle transform mr-2" />
                </button>
                <p className="text-lg font-ui-sans">Keranjang</p>
              </div>
            </header>

            {showPopupHeader && (
              <>
                <div className="fixed top-0 left-0 w-full h-full z-10 ">
                  <div className="max-w-md mx-auto bg-gray-700 opacity-50 h-full" />
                </div>
                <div className="popup fixed z-50 top-1/2 left-1/2 transform w-full max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-lg shadow-lg">
                  <p className="text-lg font-medium mb-4 flex items-center justify-center">
                    Yakin Mau Keluar
                  </p>
                  <p className="text-sm mb-7 text-center">
                    Apakah anda yakin ingin meninggalkan donasi ini
                  </p>
                  <div className="justify-center">
                    <button
                      onClick={handlePopupCloseHeader}
                      className="w-full mb-3 bg-[#346FB2] text-white px-4 py-2 rounded mr-4"
                    >
                      Lanjutkan Donasi
                    </button>
                    <button
                      onClick={() => router.back()}
                      className="w-full bg-[#ED6C56] text-white px-4 py-2 rounded"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </>
            )}
            {cartItems === null || cartItems.length === 0 ? (
              <div className="mx-auto min-h-screen shadow-lg max-w-md bg-white">
                <div className="items-center flex flex-col justify-center p-4">
                  <BsEmojiSmile className="w-[128px] h-[128px]" />
                  <p className="pt-4 text-lg">Belum ada transaksi untuk kamu</p>
                  <a
                    onClick={() =>
                      router.push(`${prefix != null && prefix != "" ?  prefix +"/" : "/program/" }${ref !== "" ? `?source=${ref}` : ""}`)
                    }
                    className="w-full pt-4"
                  >
                    <button className="mx-auto w-full bg-[#ED6C56] hover:bg-red-500 text-white py-2 mb-4 rounded">
                      Bantu Sekarang
                    </button>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="bg-white shadow-md rounded p-4 ">
                  <div className="flex flex-col items-center justify-center ">
                    <p className="text-center block text-black font-bold mb-4 font-ui-sans">
                      Rincian Transaksi
                    </p>
                  </div>
                  <div className="flex justify-between pb-4">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="mr-2 w-5 h-5"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                      <p>Pilih Semua</p>
                    </div>
                    <p
                      className="font-semibold text-red-500"
                      onClick={handleDeleteClick}
                    >
                      Hapus
                    </p>
                  </div>
                  {cartItems.map((item: any) => (
                    <div className="flex justify-between pb-4" key={item}>
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="mr-2 w-5 h-5"
                          checked={item.selected}
                          onChange={(event) =>
                            handleItemSelectChange(event, item.id)
                          }
                        />
                      </div>
                      <div className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded flex items-center bg-white leading-[1.25em] border-gray-200 max-w-[380px] max-h-full">
                        <figure className="m-0 mr-5 flex aspect-[16/10] h-fit flex-1 items-center justify-center">
                          <Image
                            src={item.thumbnail}
                            alt={item.name}
                            width={200}
                            height={125}
                            decoding="async"
                            data-nimg="1"
                            quality={30}
                            priority
                            className="h-full w-full object-fill rounded-bl rounded-tl"
                          />
                        </figure>
                        <div className="pr-2 py-2 max-w-[65%] flex-col flex-1">
                          <h3 className="font-semibold text-xs h-8 w-full line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="mt-2 flex flex-col w-full text-sm md:max-w-[360px]:text-[10px]">
                            <p className="font-bold">
                              {formatRupiah(item.nominal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border border-gray-200 shadow-gray-400 w-full bg-white shadow-md overflow-hidden">
                    <div className="px-4 pt-4 pb-8">
                      <div className="mb-2 text-base font-semibold">
                        Total Pembayaran
                      </div>
                      <div className="bg-white overflow-hidden border rounded border-gray-200 shadow-gray-400 shadow-md">
                        <div className="px-3 py-1 h-12 flex items-center">
                          <div className="font-bold text-lg">Rp</div>
                          <div className="font-bold text-lg outline-none">
                            {Currency(paymentMethod)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-[2px]" />

                <div className="bg-white shadow-md rounded p-4">
                  <div
                    className={`${
                      nameError
                        ? "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md"
                        : "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md mb-4"
                    }`}
                  >
                    <input
                      className="font-ui-sans text-sm w-full px-4 py-4 outline-none"
                      type="text"
                      name="name"
                      placeholder="Nama Lengkap"
                      value={name}
                      onChange={handleInputChangeNama}
                    />
                  </div>
                  {nameError && (
                    <div className="mb-2">
                      <span className="text-red-600 text-xs">{nameError}</span>
                    </div>
                  )}

                  <div
                    className={`${
                      emailError
                        ? "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md"
                        : "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md mb-4"
                    }`}
                  >
                    <input
                      className="font-ui-sans text-sm w-full px-4 py-4 outline-none"
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>
                  {emailError && (
                    <div className="mb-2">
                      <span className="text-red-600 text-xs">{emailError}</span>
                    </div>
                  )}

                  <div
                    className={`${
                      phoneError
                        ? "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md"
                        : "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md mb-4"
                    }`}
                  >
                    <input
                      className="font-ui-sans text-sm w-full px-4 py-4 outline-none"
                      type="text"
                      name="phone"
                      placeholder="Nomor Whatsapp (Optional)"
                      value={phone}
                      onChange={handleInputChangePhone}
                    />
                  </div>

                  {phoneError && (
                    <div className="mb-2">
                      <span className="text-red-600 text-xs">{phoneError}</span>
                    </div>
                  )}

                  <div className="mx-auto bg-white overflow-hidden border border-gray-200 shadow-gray-400 shadow-md mb-4">
                    <textarea
                      onChange={handleInputChangeDoa}
                      value={inputDoa}
                      className="font-ui-sans text-sm w-full h-20 px-4 py-3 outline-none"
                      name="doa_message"
                      placeholder="Doa Terbaik Anda (Opsional)"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="is_anonymous"
                      checked={checked}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-3 w-9"
                    />
                    <label
                      htmlFor="newsletter"
                      className="block text-sm font-ui-sans"
                    >
                      Donasi Sebagai Hamba Allah
                    </label>
                    {ref !== "" && (
                      <input type="hidden" name="affliater_code" value={ref} />
                    )}
                  </div>
                </div>

                <div className="border-[2px]" />

                <div
                  id="metode_bayar_id"
                  className="bg-white shadow-md rounded px-4 pt-4 pb-24"
                >
                  <div className="flex items-center justify-center ">
                    <p className="font-ui-sans text-center block text-black font-bold pb-4">
                      Metode Pembayaran
                    </p>
                  </div>

                  <button
                    onClick={handleButtonClick}
                    className="text-sm hover:shadow-lg w-full bg-white text-black py-4 px-4 rounded flex justify-between items-center shadow-md shadow-gray-400 border border-gray-200"
                  >
                    <span className="">
                      {selectedImage && (
                        <img
                          src={selectedImage}
                          alt="logo"
                          className="w-10 h-4 mr-8 inline-block"
                        />
                      )}
                      {paymentMethodBayar?.name || "Pilih Metode Pembayaran"}
                    </span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="ml-auto h-4 w-4"
                    />
                  </button>

                  {errorBayar && (
                    <span className="text-red-600 text-xs">{errorBayar}</span>
                  )}

                  <div>
                    {showPopup && (
                      <div className="fixed top-0 left-0 w-full h-full z-10">
                        <div className="max-w-md mx-auto bg-gray-400 opacity-50 h-full"></div>
                      </div>
                    )}

                    <div className="flex items-center justify-center overflow-y-scroll">
                      <div ref={metodeBayarRef} />
                      <div
                        className={`fixed z-20 bottom-0 bg-white w-full transition-all duration-500 ${
                          showPopup ? "h-3/4" : "h-0"
                        } max-w-md rounded-t-xl overflow-y-scroll`}
                      >
                        <div className="fixed z-30 flex justify-start border-b bg-white w-full max-w-md rounded-t-xl ">
                          <button onClick={handleButtonClick} className="p-5">
                            <IoClose className="h-6 w-6" />
                          </button>
                          <span className="py-4 mt-1">
                            Pilih Metode Pembayaran
                          </span>
                        </div>
                        <div className="px-4 pb-4 pt-20 w-full">
                          <div className="relative">
                            <button
                              onClick={toggleDropdown1}
                              className="hover:text-black text-sm w-full bg-gray-100 text-black py-3 mb-2 px-4 flex justify-between items-center"
                            >
                              <span
                                className={`font-bold ${
                                  (paymentMethod && paymentMethod < 1000) ||
                                  paymentMethod == null ||
                                  paymentMethod == 0 ||
                                  paymentMethod == 0
                                    ? "text-gray-500"
                                    : ""
                                }`}
                              >
                                E-Wallet
                              </span>
                              <span className="p-1 text-gray-500">
                                {" "}
                                (Minimal Rp.1.000)
                              </span>
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className={`h-4 w-4 ml-auto ${
                                  isOpen1 ? "transform rotate-90" : ""
                                }`}
                                onClick={toggleDropdown1}
                              />
                            </button>
                            {isOpen1 && (
                              <div className="w-full right-0 bg-white mb-2 flex-col">
                                {payment.map((item: any) => {
                                  if (item.category == "e-wallet") {
                                    return (
                                      <div
                                        key={item.id}
                                        className={`${
                                          (paymentMethod &&
                                            paymentMethod < 1000) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                            ? "bg-gray-100"
                                            : ""
                                        }`}
                                      >
                                        <button
                                          disabled={
                                            (!!paymentMethod &&
                                              paymentMethod < 1000) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                          }
                                          className={`px-4 py-4 text-sm w-full flex justify-start ${
                                            (paymentMethod &&
                                              paymentMethod < 1000) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                              ? "text-gray-500"
                                              : ""
                                          }`}
                                          onClick={(e) => {
                                            handleImageSelect(item.logo);
                                            handleOptionClickBayar(e, item);
                                          }}
                                        >
                                          <img
                                            src={item.logo}
                                            alt="Logo"
                                            className={`w-10 h-4 inline-block mr-8 ${
                                              (paymentMethod &&
                                                paymentMethod < 1000) ||
                                              paymentMethod == null ||
                                              paymentMethod == 0
                                                ? "filter grayscale"
                                                : ""
                                            }`}
                                          />
                                          {item.name}
                                        </button>
                                        <hr className="w-full border-gray-200 px-9" />
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            )}
                          </div>

                          <div className="relative">
                            <button
                              onClick={toggleDropdown2}
                              className="hover:text-black mb-2 text-sm w-full bg-gray-100  text-black py-3 px-4 flex justify-between items-center"
                            >
                              <span
                                className={`font-bold ${
                                  (paymentMethod && paymentMethod < 20000) ||
                                  paymentMethod == null ||
                                  paymentMethod == 0
                                    ? "text-gray-500"
                                    : ""
                                }`}
                              >
                                Virtual Account
                              </span>
                              <span className="p-1 text-gray-500">
                                {" "}
                                (Minimal Rp.20.000)
                              </span>
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className={`h-4 w-4 ml-auto ${
                                  isOpen2 ? "transform rotate-90" : ""
                                }`}
                                onClick={toggleDropdown2}
                              />
                            </button>

                            {isOpen2 && (
                              <div className="w-full right-0 bg-white mb-2 flex-col">
                                {payment.map((item: any) => {
                                  if (item.category == "va_bank") {
                                    return (
                                      <div
                                        key={item.id}
                                        className={`${
                                          (paymentMethod &&
                                            paymentMethod < 20000) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                            ? "bg-gray-100"
                                            : ""
                                        }`}
                                      >
                                        <button
                                          disabled={
                                            (!!paymentMethod &&
                                              paymentMethod < 20000) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                          }
                                          className={`px-4 py-4 text-sm w-full flex justify-start ${
                                            (paymentMethod &&
                                              paymentMethod < 20000) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                              ? "text-gray-500"
                                              : ""
                                          }`}
                                          onClick={(e) => {
                                            handleImageSelect(item.logo);
                                            handleOptionClickBayar(e, item);
                                          }}
                                        >
                                          <img
                                            src={item.logo}
                                            alt="Logo"
                                            className={`w-10 h-4 inline-block mr-8 ${
                                              (paymentMethod &&
                                                paymentMethod < 20000) ||
                                              paymentMethod == null ||
                                              paymentMethod == 0
                                                ? "filter grayscale"
                                                : ""
                                            }`}
                                          />
                                          {item.name}
                                        </button>
                                        <hr className="w-full border-gray-200 px-9" />
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            )}
                          </div>

                          <div className="relative">
                            <button
                              onClick={toggleDropdown3}
                              className="hover:text-black mb-2 text-sm w-full bg-gray-100  text-black py-3 px-4 flex justify-between items-center"
                            >
                              <span
                                className={`font-bold ${
                                  (paymentMethod && paymentMethod < 20000) ||
                                  paymentMethod == null ||
                                  paymentMethod == 0
                                    ? "text-gray-500"
                                    : ""
                                }`}
                              >
                                Transfer Bank
                              </span>{" "}
                              <span className="p-1 text-gray-500">
                                {" "}
                                (Minimal Rp.20.000)
                              </span>
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className={` h-4 w-4 ml-auto ${
                                  isOpen3 ? "transform rotate-90" : ""
                                }`}
                                onClick={toggleDropdown3}
                              />
                            </button>

                            {isOpen3 && (
                              <div className="w-full right-0 bg-white mb-2 flex-col">
                                {payment.map((item: any) => {
                                  if (item.category == "tf_bank") {
                                    return (
                                      <div
                                        key={item.id}
                                        className={`${
                                          (paymentMethod &&
                                            paymentMethod < 20000) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                            ? "bg-gray-100"
                                            : ""
                                        }`}
                                      >
                                        <button
                                          disabled={
                                            (!!paymentMethod &&
                                              paymentMethod < 20000) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                          }
                                          className={`px-4 py-4 text-sm w-full flex justify-start ${
                                            (paymentMethod &&
                                              paymentMethod < 20000) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                              ? "text-gray-500"
                                              : ""
                                          }`}
                                          onClick={(e) => {
                                            handleImageSelect(item.logo);
                                            handleOptionClickBayar(e, item);
                                          }}
                                        >
                                          <img
                                            src={item.logo}
                                            alt="Logo"
                                            className={`w-10 h-4 inline-block mr-8 ${
                                              (paymentMethod &&
                                                paymentMethod < 20000) ||
                                              paymentMethod == null ||
                                              paymentMethod == 0
                                                ? "filter grayscale"
                                                : ""
                                            }`}
                                          />
                                          {item.name}
                                        </button>
                                        <hr className="w-full border-gray-200 px-9" />
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            )}
                          </div>

                          <div className="relative">
                            <button
                              onClick={toggleDropdown4}
                              className="hover:text-black mb-2 text-sm w-full bg-gray-100  text-black py-3 px-4 flex justify-between items-center"
                            >
                              <span
                                className={`font-bold ${
                                  (paymentMethod && paymentMethod < 20000) ||
                                  paymentMethod == null ||
                                  paymentMethod == 0
                                    ? "text-gray-500"
                                    : ""
                                }`}
                              >
                                Kartu Creadit
                              </span>{" "}
                              <span className="p-1 text-gray-500">
                                {" "}
                                (Minimal Rp.20.000)
                              </span>
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className={`h-4 w-4 ml-auto ${
                                  isOpen4 ? "transform rotate-90" : ""
                                }`}
                                onClick={toggleDropdown4}
                              />
                            </button>

                            {isOpen4 && (
                              <div className="w-full right-0 bg-white mb-2 flex-col">
                                {payment.map((item: any) => {
                                  if (item.category == "credit") {
                                    return (
                                      <div
                                        key={item.id}
                                        className={`${
                                          (paymentMethod &&
                                            paymentMethod < 20000) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                            ? "bg-gray-100"
                                            : ""
                                        }`}
                                      >
                                        <button
                                          disabled={
                                            (!!paymentMethod &&
                                              paymentMethod < 20000) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                          }
                                          className={`px-4 py-4 text-sm w-full flex justify-start ${
                                            (paymentMethod &&
                                              paymentMethod < 20000) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                              ? "text-gray-500"
                                              : ""
                                          }`}
                                          onClick={(e) => {
                                            handleImageSelect(item.logo);
                                            handleOptionClickBayar(e, item);
                                          }}
                                        >
                                          <img
                                            src={item.logo}
                                            alt="Logo"
                                            className={`w-10 h-4 inline-block mr-8 ${
                                              (paymentMethod &&
                                                paymentMethod < 20000) ||
                                              paymentMethod == null ||
                                              paymentMethod == 0
                                                ? "filter grayscale"
                                                : ""
                                            }`}
                                          />
                                          {item.name}
                                        </button>
                                        <hr className="w-full border-gray-200 px-9" />
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white max-w-md w-full bottom-0 fixed">
                  <div className="w-full p-4">
                    <button
                      type="submit"
                      className="bg-[#ED6C56] w-full hover:bg-red-500 text-white p-3 rounded"
                    >
                      <p>Lanjut Pembayaran</p>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
