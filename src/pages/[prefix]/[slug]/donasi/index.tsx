import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import formatRupiah, { Currency } from "@/erp/Helpers/formatRupiah";
import { IoArrowBack, IoClose } from "react-icons/io5";
import {  getNew } from "@/erp/payment";
import getFBCLID from '@/helpers/getFBCLID'
import Head from "next/head";
// import { openApiCompany } from "@/erp/company";
import * as googleAnalityc from '@/helpers/google-analityc'
import * as fbq from '@/helpers/fbpixel'
import { PrefixContext } from "@/components/context/PrefixContext";
import { CompanyContext } from "@/components/context/CompanyContext";

export async function getServerSideProps({ query, req }: any) {
  const slug = query.slug as string;
  const { host } = req.headers;
  let payment = await getNew(host);

  const total = query.total ? Number(query.total) : 0;
  const nominal = query.nominal ? Number(query.nominal) : 0;

  return {
    props: {
      payment: Object.values(payment),
      slug: slug,
      total,
      nominal
    },
  };
}

export default function HalamanDonasi({ payment, total, nominal, slug }: any) {
  const prefix = useContext(PrefixContext)
  const company: any = useContext(CompanyContext)
  // const [idCampaign, setIdCampaign] = useState(program ? program : null);
  //muncul pop up saat klik icon header , keluar atau tetap di halaman
  const [showPopupHeader, setShowPopupHeader] = useState(false);
  // @ts-ignore
  const [program, setProgram] = useState<any>(typeof window != "undefined" ? JSON.parse(window.localStorage.getItem('program')) : null);

  const metodeBayarRef = useRef(null);
  const router = useRouter();
  const ref = router.query.source ?? "";

  const [tenIsSelected, setTenIsSelected] = useState(false);
  const [twoFiveIsSelected, setTwoFiveIsSelected] = useState(false);
  const [fiftyIsSelected, setFiftyIsSelected] = useState(false);
  const [hundIsSelected, setHundIsSelected] = useState(false);

  const imgixGenerate = (host: string, model: string, id_payment: string | number, fields: string) => {
    return `${host}${model}/${id_payment}/${fields}/${id_payment}.png`
  }

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

  const [paymentMethodBayar, setSelectedOptionBayar] = useState<typeof payment | null>(null);
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


  const [inputValue, setInputValue] = useState("");

  // untuk button nominal
  const [paymentMethod, setpaymentMethod]: any = useState<number | null>(null);

  const handleOptionClick = (option: number, chips: string) => {

    if (chips == 'ten') {
      setTenIsSelected(true)
      setTwoFiveIsSelected(false)
      setFiftyIsSelected(false)
      setHundIsSelected(false)
    } else if (chips == 'twentyfive') {
      setTenIsSelected(false)
      setTwoFiveIsSelected(true)
      setFiftyIsSelected(false)
      setHundIsSelected(false)
    } else if (chips == 'fifty') {
      setTenIsSelected(false)
      setTwoFiveIsSelected(false)
      setHundIsSelected(false)
      setFiftyIsSelected(true)
    } else if (chips == 'hundred') {
      setFiftyIsSelected(false)
      setTenIsSelected(false)
      setTwoFiveIsSelected(false)
      setHundIsSelected(true)
    } else {
      setFiftyIsSelected(false)
      setTenIsSelected(false)
      setTwoFiveIsSelected(false)
      setHundIsSelected(false)
    }
    setpaymentMethod(option);
  };


  const [isMobile, setIsMobile] = useState(0);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768 ? 1 : 0);
    }

    // fetch("/api/program/single?slug=" + slug + "&fields=id,name,option_amount,minimum_amount")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProgram(data.program)
    //   });
    const storedPhone = localStorage.getItem("phone");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedNominal = localStorage.getItem("nominal");
    const storedMetode = localStorage.getItem("metode");
    const storedImage = localStorage.getItem("image");
    const fix_amount = Number(program?.fix_amount);
    if (storedMetode) {
      const lsMetode = JSON.parse(storedMetode)
      const payments = payment.filter((item: any) => {
        return item.id === lsMetode.id
      })
      if (payments.length > 0) {
        setSelectedOptionBayar(JSON.parse(storedMetode))
        // @ts-ignore
        setSelectedImage(storedImage)
      }

      else {
        setSelectedOptionBayar(null)
        setSelectedImage("")
      };
    }

    if (storedPhone) setPhone(storedPhone);
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (program?.is_fix_amount) {
      setpaymentMethod(fix_amount)
    } else if (storedNominal) {
      setpaymentMethod(parseFloat(storedNominal));
    } else {
      setpaymentMethod(total);
      setpaymentMethod(nominal);
    };

  }, [total, nominal]);

  // warning
  const [showWarning, setShowWarning] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [atasnama, setAtasnama] = useState("");
  const [atasnamaError, setAtasnamaError] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Atas Nama
  const validateAtasnama = (atasnama: string) => {
    const regex = /[^A-Za-z, ]/g;
    return regex.test(atasnama);
  };
  const handleInputChangeAtasnama = (event: {
    target: { value: string };
  }) => {
    setAtasnama(event.target.value);
    setAtasnamaError("");
  };

  // Name
  const validateName = (name: string) => {
    const regex = /[^A-Za-z ]/g;
    return regex.test(name);
  };
  const handleInputChangeNama = (event: {
    target: { value: string };
  }) => {
    setName(event.target.value);
    setNameError("");
  };
  //phone
  const validatePhone = (phone: string) => {
    const regex = /[^0-9]/g;
    return regex.test(phone);
  };

  const handleInputChangePhone = (event: {
    target: { value: string };
  }) => {
    setPhone(event.target.value);
    setPhoneError("");
  };

  //email
  const validateEmail = (email: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  };
  const handleChange = (event: {
    target: { value: string };
  }) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  // Warning
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    googleAnalityc.Event({ action: 'doCheckout', value: nominal }, "doCheckout")

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
    // atas nama
    if (program?.atas_nama) {
      if (validateAtasnama(atasnama)) {
        setAtasnamaError("*Format nama tidak valid");
        hasErrors = true;
      } else if (atasnama == "") {
        setAtasnamaError("*Mohon diisi terlebih dahulu");
        hasErrors = true;
      } else {
        setAtasnamaError("");
      }
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
      localStorage.setItem("nominal", paymentMethod.toString());
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
    localStorage.removeItem("program")

    if (hasErrors) {
      return;
    }

    const fbclid = getFBCLID();
    //@ts-ignore
    let date = parseInt(Date.now() / 1000).toString();
    let postData: any = {
      name,
      phone,
      email,
      no_bukti: '',
      payment_id: paymentMethodBayar?.id,
      program_id: program ? program.id : null,
      amount: paymentMethod,
      doa_message: inputDoa,
      is_anonymous: checked === true ? "true" : "false",
      affliater_code: ref,
      event_id: date,
      fbclid: fbclid || '',
      atas_nama: atasnama,
      quantity: quantity
    };

    const response = await fetch("/api/donasi", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    try {
      fbq.event('AddToCart', {
        value: paymentMethod,
        content_name: program.name,
        content_category: program.categoryname,
        currency: "IDR"
      });
    } catch (error) {
      console.log(error)
    }

    const id_donasi = data.results[0].id_donasi;

    // console.log(data)
    // const id_donasi = data.data.results[0].id_donasi;

    router.push(`${prefix}/donation/${id_donasi}/checkout/summary${window.location.search}`)

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

  const [isOpen5, setIsOpen5] = useState(false);
  const toggleDropdown5 = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen5(!isOpen5);
  };

  function checkCategoryExistence(category: string) {
    return payment.some((item: any) => item.category === category);
  }

  function getParentNominalMin(payment: any, category: string, format = true) {
    const nominalAmountMin = payment.filter((item: any) => {
      return item.category === category
    })
    if (nominalAmountMin.length > 0) {
      if (format) {
        return formatRupiah(nominalAmountMin[0]?.minimum_amount)
      } else {
        return Number(nominalAmountMin[0]?.minimum_amount)
      }
    }

    return 20000

  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      let newPaymentMethod = (quantity - 1) * program?.fix_amount;
      setpaymentMethod(newPaymentMethod);
    }
  };

  const increment = () => {
    if (quantity < 7) {
      setQuantity(quantity + 1);
      let newPaymentMethod = (quantity + 1) * program?.fix_amount;
      setpaymentMethod(newPaymentMethod);
    }
  };


  return (
    <>
      <Head>
        <title>Kontribusi</title>
        <link rel="icon" href={company.favicon_url} />
      </Head>

      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md">
            <header
              className={`flex items-center justify-between  text-white p-4`}
              style={{ backgroundColor: company.primary_colour }}
            >
              <div className="flex items-center">
                <button
                  className="flex items-center"
                  onClick={handleIconClickHeader}
                >
                  <IoArrowBack className="w-6 h-6 hover:text-white inline-block align-middle transform mr-2" />
                </button>
                <p className="text-lg font-ui-sans">Kontribusi</p>
              </div>
            </header>

            {showPopupHeader && (
              <>
                <div className="fixed top-0 left-0 w-full h-full z-10 ">
                  <div className="max-w-md mx-auto bg-gray-700 opacity-50 h-full" />
                </div>
                <div className="popup fixed z-50 top-1/2 left-1/2 transform w-full max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-lg shadow-lg">
                  <p className="text-lg font-medium mb-4 flex items-center justify-center">
                    Yakin mau keluar ?
                  </p>
                  <p className="text-sm mb-7 text-center">
                    Apakah anda yakin ingin meninggalkan halaman ini
                  </p>
                  <div className="justify-center">
                    <button
                      onClick={handlePopupCloseHeader}
                      className={`w-full mb-3  text-white px-4 py-2 rounded mr-4`}
                      style={{ backgroundColor: company.accent_colour }}
                    >
                      Lanjutkan Kontribusi
                    </button>
                    <button
                      onClick={() => { router.back(), localStorage.removeItem('program') }}
                      className={`w-full text-white px-4 py-2 rounded`}
                      style={{ backgroundColor: company.accent_colour }}
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </>
            )}

            <form onSubmit={handleSubmit}>
              <div className="bg-white shadow-md rounded p-4 ">
                <div className="flex flex-col items-center justify-center ">
                  <p className="text-center block text-black font-bold mb-4 font-ui-sans">
                    Masukan Nominal
                  </p>
                </div>

                <div className="border border-gray-200 w-full bg-white overflow-hidden">
                  <div className='p-4'>

                    {program?.is_fix_amount ? (
                      <>
                        <div className="flex items-center justify-center font-bold pb-4 text-lg">
                          {formatRupiah(paymentMethod)}
                        </div>
                        <div className="flex justify-between">
                          <div className="w-full flex items-center">
                            <p className="absolute z-10 text-[#8A8A8A] text-[12px] ml-[30px]">
                              Jumlah :
                            </p>
                            <input type='text' disabled className="pl-[150px] py-3 bg-white overflow-hidden border rounded border-gray-200 w-full" value={quantity} />
                            <button
                              className="w-[50px] px-5 h-[50px] bg-white border border-gray-200 hover:shadow-md"
                              onClick={decrement}
                            >
                              -
                            </button>
                            <button
                              className="w-[50px] px-5 h-[50px] border border-gray-200 hover:shadow-md"
                              onClick={increment}
                              style={{ backgroundColor: company.accent_colour }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </>
                    ) : program?.option_amount.length > 0 ? (
                      <OptionAmount amount={program?.option_amount.split(',')} paymentMethod={paymentMethod} setpaymentMethod={setpaymentMethod} />
                    ) : null}

                    {!program?.is_fix_amount &&
                      <>
                        <div className="mb-2 text-sm font-ui-sans">
                          Nominal Lain
                        </div>
                        <div className="bg-white overflow-hidden border rounded border-gray-200 hover:shadow-md">
                          <div className="px-3 py-2 flex items-center">
                            <div className="font-bold text-lg">Rp</div>
                            <input
                              className="font-bold text-lg w-full  outline-none placeholder:text-gray-400"
                              placeholder="1.000"
                              type="text"
                              value={Currency(paymentMethod)}
                              onChange={(event) => {

                                let newValue = parseFloat(
                                  event.target.value.replace(/[^0-9]/g, "")
                                ) || 0;
                                let chips = '';
                                if (newValue == 10000) {
                                  chips = "ten"
                                }
                                if (newValue == 25000) {
                                  chips = "twentyfive"
                                }
                                if (newValue == 50000) {
                                  chips = "fifty"
                                }
                                if (newValue == 100000) {
                                  chips = "hundred"
                                }

                                handleOptionClick(newValue, chips)

                                // setpaymentMethod(
                                //   parseFloat(
                                //     event.target.value.replace(/[^0-9]/g, "")
                                //   ) || 0
                                // );
                                localStorage.setItem("nominal", event.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </>}

                    {showWarning && (
                      <span className="text-red-600 text-xs">
                        {showWarning}
                      </span>
                    )}
                    <br></br>
                    {!program?.is_fix_amount ? (
                      <p className="text-gray-400 text-xs font-ui-sans">
                        Isikan nominal kontribusi terbaik Anda, minimal {formatRupiah(program?.minimum_amount)}
                      </p>) : (
                      <p className="text-gray-400 text-xs font-ui-sans">
                        Harga Paket {formatRupiah(program?.fix_amount)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-[2px]" />

              <div className="bg-white rounded p-4">
                {program?.atas_nama &&
                  <div
                    className={`${atasnamaError
                      ? "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 rounde hover:shadow-md"
                      : "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 rounded hover:shadow-md mb-4"
                      }`}
                  >
                    <input
                      className="font-ui-sans text-sm w-full px-4 py-2 outline-none"
                      type="text"
                      name="atasnama"
                      placeholder={quantity > 1 ? `Atas Nama, Contoh : Dwi, Rivan` : `Atas Nama, Contoh : Cepi Herdiansyah`}
                      value={atasnama}
                      onChange={handleInputChangeAtasnama}
                    />
                  </div>
                }
                {atasnamaError && (
                  <div className="mb-2">
                    <span className="text-red-600 text-xs">{atasnamaError}</span>
                  </div>
                )}
                <div
                  className={`${nameError
                    ? "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 rounde hover:shadow-md"
                    : "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 rounded hover:shadow-md mb-4"
                    }`}
                >
                  <input
                    className="font-ui-sans text-sm w-full px-4 py-2 outline-none"
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
                  className={`${emailError
                    ? "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 rounded hover:shadow-md"
                    : "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 rounded hover:shadow-md mb-4"
                    }`}
                >
                  <input
                    className="font-ui-sans text-sm w-full px-4 py-2 outline-none"
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
                  className={`${phoneError
                    ? "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 rounded hover:shadow-md"
                    : "font-ui-sans mx-auto bg-white overflow-hidden border border-gray-200 rounded hover:shadow-md mb-4"
                    }`}
                >
                  <input
                    className="font-ui-sans text-sm w-full px-4 py-2 outline-none"
                    type="text"
                    name="phone"
                    placeholder="Nomor Whatsapp"
                    value={phone}
                    onChange={handleInputChangePhone}
                  />
                </div>

                {phoneError && (
                  <div className="mb-2">
                    <span className="text-red-600 text-xs">{phoneError}</span>
                  </div>
                )}

                <div className="mx-auto bg-white overflow-hidden border border-gray-200 rounded hover:shadow-md mb-4">
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
                    Kontribusi Sebagai Hamba Allah
                  </label>
                  {ref !== "" && (
                    <input type="hidden" name="affliater_code" value={ref} />
                  )}
                </div>
              </div>

              <div className="border-[2px]" />

              <div
                id="metode_bayar_id"
                className="bg-white rounded px-4 pt-4 pb-24"
              >
                <div className="flex items-center justify-center ">
                  <p className="font-ui-sans text-center block text-black font-bold pb-4">
                    Metode Pembayaran
                  </p>
                </div>

                <button
                  onClick={handleButtonClick}
                  className="text-sm hover:shadow-lg w-full bg-white text-black py-4 px-4 rounded flex justify-between items-center border border-gray-200"
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
                      className={`fixed z-20 bottom-0 bg-white w-full transition-all duration-500 ${showPopup ? "h-3/4" : "h-0"
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
                        {checkCategoryExistence('e-wallet') ? <div className="relative">
                          <button
                            onClick={toggleDropdown1}
                            className="hover:text-black text-sm w-full bg-gray-100 text-black py-3 mb-2 px-4 flex justify-between items-center"
                          >
                            <span
                              className={`font-bold ${(paymentMethod && paymentMethod < getParentNominalMin(payment, 'va_bank', false)) ||
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
                              (Minimal {getParentNominalMin(payment, 'e-wallet', true)})
                            </span>
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className={`h-4 w-4 ml-auto ${isOpen1 ? "transform rotate-90" : ""
                                }`}
                              onClick={toggleDropdown1}
                            />
                          </button>
                          {isOpen1 && (
                            <div className="w-full right-0 bg-white mb-2 flex-col">
                              {payment.map((item: any) => {
                                if (item.category == "e-wallet") {
                                  const hideOnMobile = isMobile && item.account_number === '711';
                                  const hideOnNonMobile = !isMobile && ['713', '716'].includes(item.account_number);

                                  const hide = hideOnMobile || hideOnNonMobile;
                                  return (
                                    <div
                                      key={item.id}
                                      className={`${hide ? 'hidden' : ''} ${(paymentMethod &&
                                        paymentMethod < Number(item?.minimum_amount)) ||
                                        paymentMethod == null ||
                                        paymentMethod === 0
                                        ? 'bg-gray-100'
                                        : ''
                                        }`}
                                    >
                                      <button
                                        disabled={
                                          (!!paymentMethod &&
                                            paymentMethod < Number(item?.minimum_amount)) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                        }
                                        className={`px-4 py-4 text-sm w-full flex justify-start ${(paymentMethod &&
                                          paymentMethod < Number(item?.minimum_amount)) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                          ? "text-gray-500"
                                          : ""
                                          }`}
                                        onClick={(e) => {
                                          handleImageSelect(imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo'));
                                          handleOptionClickBayar(e, item);
                                        }}
                                      >
                                        <img
                                          src={imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo')}
                                          alt="Logo"
                                          className={`w-10 h-4 inline-block mr-8 ${(paymentMethod &&
                                            paymentMethod < Number(item?.minimum_amount)) ||
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
                        </div> : null}
                        {checkCategoryExistence('va_bank') ?
                          <div className="relative">
                            <button
                              onClick={toggleDropdown2}
                              className="hover:text-black mb-2 text-sm w-full bg-gray-100  text-black py-3 px-4 flex justify-between items-center"
                            >
                              <span
                                className={`font-bold ${(paymentMethod && paymentMethod < getParentNominalMin(payment, 'va_bank', false)) ||
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
                                (Minimal {getParentNominalMin(payment, 'va_bank', true)})
                              </span>
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className={`h-4 w-4 ml-auto ${isOpen2 ? "transform rotate-90" : ""
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
                                        className={`${(paymentMethod &&
                                          paymentMethod < Number(item?.minimum_amount)) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                          ? "bg-gray-100"
                                          : ""
                                          }`}
                                      >
                                        <button
                                          disabled={
                                            (!!paymentMethod &&
                                              paymentMethod < Number(item?.minimum_amount)) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                          }
                                          className={`px-4 py-4 text-sm w-full flex justify-start ${(paymentMethod &&
                                            paymentMethod < Number(item?.minimum_amount)) ||
                                            paymentMethod == null ||
                                            paymentMethod == 0
                                            ? "text-gray-500"
                                            : ""
                                            }`}
                                          onClick={(e) => {
                                            handleImageSelect(imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo'));
                                            handleOptionClickBayar(e, item);
                                          }}
                                        >
                                          <img
                                            src={imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo')}
                                            alt="Logo"
                                            className={`w-10 h-4 inline-block mr-8 ${(paymentMethod &&
                                              paymentMethod < Number(item?.minimum_amount)) ||
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
                          </div> : null}
                        {checkCategoryExistence('tf_bank') ? <div className="relative">
                          <button
                            onClick={toggleDropdown3}
                            className="hover:text-black mb-2 text-sm w-full bg-gray-100  text-black py-3 px-4 flex justify-between items-center"
                          >
                            <span
                              className={`font-bold ${(paymentMethod && paymentMethod < getParentNominalMin(payment, 'tf_bank', false)) ||
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
                              (Minimal {getParentNominalMin(payment, 'tf_bank', true)})
                            </span>
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className={` h-4 w-4 ml-auto ${isOpen3 ? "transform rotate-90" : ""
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
                                      className={`${(paymentMethod &&
                                        paymentMethod < Number(item?.minimum_amount)) ||
                                        paymentMethod == null ||
                                        paymentMethod == 0
                                        ? "bg-gray-100"
                                        : ""
                                        }`}
                                    >
                                      <button
                                        disabled={
                                          (!!paymentMethod &&
                                            paymentMethod < Number(item?.minimum_amount)) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                        }
                                        className={`px-4 py-4 text-sm w-full flex justify-start ${(paymentMethod &&
                                          paymentMethod < Number(item?.minimum_amount)) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                          ? "text-gray-500"
                                          : ""
                                          }`}
                                        onClick={(e) => {
                                          handleImageSelect(imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo'));
                                          handleOptionClickBayar(e, item);
                                        }}
                                      >
                                        <img
                                          src={imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo')}
                                          alt="Logo"
                                          className={`w-10 h-4 inline-block mr-8 ${(paymentMethod &&
                                            paymentMethod < Number(item?.minimum_amount)) ||
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
                        </div> : null}
                        {checkCategoryExistence('credit') ? <div className="relative">
                          <button
                            onClick={toggleDropdown4}
                            className="hover:text-black mb-2 text-sm w-full bg-gray-100  text-black py-3 px-4 flex justify-between items-center"
                          >
                            <span
                              className={`font-bold ${(paymentMethod && paymentMethod < getParentNominalMin(payment, 'credit', false)) ||
                                paymentMethod == null ||
                                paymentMethod == 0
                                ? "text-gray-500"
                                : ""
                                }`}
                            >
                              Kartu Credit
                            </span>{" "}
                            <span className="p-1 text-gray-500">
                              {" "}
                              (Minimal {getParentNominalMin(payment, 'credit', true)})
                            </span>
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className={`h-4 w-4 ml-auto ${isOpen4 ? "transform rotate-90" : ""
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
                                      className={`${(paymentMethod &&
                                        paymentMethod < Number(item?.minimum_amount)) ||
                                        paymentMethod == null ||
                                        paymentMethod == 0
                                        ? "bg-gray-100"
                                        : ""
                                        }`}
                                    >
                                      <button
                                        disabled={
                                          (!!paymentMethod &&
                                            paymentMethod < Number(item?.minimum_amount)) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                        }
                                        className={`px-4 py-4 text-sm w-full flex justify-start ${(paymentMethod &&
                                          paymentMethod < Number(item?.minimum_amount)) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                          ? "text-gray-500"
                                          : ""
                                          }`}
                                        onClick={(e) => {
                                          handleImageSelect(imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo'));
                                          handleOptionClickBayar(e, item);
                                        }}
                                      >
                                        <img
                                          src={imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo')}
                                          alt="Logo"
                                          className={`w-10 h-4 inline-block mr-8 ${(paymentMethod &&
                                            paymentMethod < Number(item?.minimum_amount)) ||
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
                        </div> : null}

                        {checkCategoryExistence('convenience_store') ? <div className="relative">
                          <button
                            onClick={toggleDropdown5}
                            className="hover:text-black mb-2 text-sm w-full bg-gray-100  text-black py-3 px-4 flex justify-between items-center"
                          >
                            <span
                              className={`font-bold ${(paymentMethod && paymentMethod < getParentNominalMin(payment, 'convenience_store', false)) ||
                                paymentMethod == null ||
                                paymentMethod == 0
                                ? "text-gray-500"
                                : ""
                                }`}
                            >
                              Convenience Store
                            </span>{" "}
                            <span className="p-1 text-gray-500">
                              {" "}
                              (Minimal {getParentNominalMin(payment, 'convenience_store', true)})
                            </span>
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className={`h-4 w-4 ml-auto ${isOpen4 ? "transform rotate-90" : ""
                                }`}
                              onClick={toggleDropdown5}
                            />
                          </button>

                          {isOpen5 && (
                            <div className="w-full right-0 bg-white mb-2 flex-col">
                              {payment.map((item: any) => {
                                if (item.category == "convenience_store") {
                                  return (
                                    <div
                                      key={item.id}
                                      className={`${(paymentMethod &&
                                        paymentMethod < Number(item?.minimum_amount)) ||
                                        paymentMethod == null ||
                                        paymentMethod == 0
                                        ? "bg-gray-100"
                                        : ""
                                        }`}
                                    >
                                      <button
                                        disabled={
                                          (!!paymentMethod &&
                                            paymentMethod < Number(item?.minimum_amount)) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                        }
                                        className={`px-4 py-4 text-sm w-full flex justify-start ${(paymentMethod &&
                                          paymentMethod < Number(item?.minimum_amount)) ||
                                          paymentMethod == null ||
                                          paymentMethod == 0
                                          ? "text-gray-500"
                                          : ""
                                          }`}
                                        onClick={(e) => {
                                          handleImageSelect(imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo'));
                                          handleOptionClickBayar(e, item);
                                        }}
                                      >
                                        <img
                                          src={imgixGenerate(item.url_web, 'cnt_cf.payment', item.id, 'logo')}
                                          alt="Logo"
                                          className={`w-10 h-4 inline-block mr-8 ${(paymentMethod &&
                                            paymentMethod < Number(item?.minimum_amount)) ||
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
                        </div> : null}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white max-w-md w-full bottom-0 fixed">
                <div className="w-full p-4">
                  <button
                    type="submit"
                    disabled={paymentMethod >= program?.minimum_amount ? false : true}
                    className={` hover:contrast-50 w-full text-white p-3 rounded ${paymentMethod < program?.minimum_amount ? 'bg-gray-500' : ''} transition-all`}
                    style={{ backgroundColor: paymentMethod >= program?.minimum_amount ? company.accent_colour : "#eee" }}
                  >
                    <p>Lanjut Pembayaran</p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


const OptionAmount = ({ amount, paymentMethod, setpaymentMethod }: { amount: any, setpaymentMethod: any, paymentMethod: number }) => {
  let company: any = useContext(CompanyContext)
  const doSelect = (value: number) => {
    setpaymentMethod(Number(value))
  }
  return (

    <div className="grid grid-cols-2 gap-3 mb-2">
      {
        amount.map((amt: string, index: number) => {
          return (
            <button
              key={index}
              onClick={() => doSelect(Number(amt))}
              className={`border hover:shadow-md font-ui-sans font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline`}
              type="button"
              style={{
                backgroundColor: `${paymentMethod === Number(amt) ? `${company.accent_colour}20` : ""}`,
                color: `${paymentMethod === Number(amt) ? `black` : ""}`,
                borderColor: `${paymentMethod === Number(amt) ? `${company.accent_colour}` : "rgb(229 231 235)"}`,
              }}>
              {amt ? formatRupiah(amt) : <div className="py-3"></div>}
            </button>
          )
        })
      }
    </div >

  )

}