// import React from "react";
// import { CgCopyright } from "react-icons/cg";
// import Image from "next/image";
// import Link from "next/link";

// function MyList({ items }: any) {
//   return (
//     <div className="flex gap-2 items-center">
//       {items
//         ? items.map((item: any, i: number) => (
//           <a href={item.string_value} target="_blank" key={i}>
//             <Image src={item.icon_url + "?w=32&h=32&q=100&upscale=true&auto=compress,format"} quality={100} alt={item.name} width={0} height={0} sizes="100vw" className=" w-[32px]" />
//           </a>
//         ))
//         : null}
//     </div>
//   );
// }

// const Footer = ({ company, environment, colorPrimary }: any) => {
//   const divStyle = {
//     backgroundColor: colorPrimary,
//   };

//   const urlGambarDefault = "/default.png"; // Ganti dengan URL gambar default yang diinginkan

//   const handleGambarError = (event: any) => {
//     event.target.src = urlGambarDefault;
//   };

//   const handleClick = () => {
//     window.open("https://cnt.id/", "_blank"); // Membuka tautan di tab baru
//   };

//   return (
//     <>
//       {company ? (
//         <div
//           className={`relative pt-4 w-full pb-10 flex-col flex items-stretch mb-2`}
//           style={divStyle}
//         >
//           <Image
//             src={company.image_url + "?w=100&h=42&q=100&upscale=true&auto=compress,format"}
//             alt={company.name}
//             quality={100}
//             width={0}
//             height={0}
//             decoding="async"
//             data-nimg="1"
//             className="mt-4 w-full max-w-[100px] self-center "
//             sizes="100vw"
//             onError={handleGambarError}
//           />
//           <div className="text-sm text-center text-gray-600 px-4 mt-4">
//             <p>{company.description}</p>
//           </div>
//           <div className="flex justify-center gap-8 mt-4 ">
//             <MyList items={environment} />
//           </div>
//           {/* <div className="text-sm mt-4 px-4 w-full">
//             <p className="font-bold text-gray-700 ">Alamat</p>
//             <p className="text-gray-600 ">{company.street}</p>
//           </div> */}
//           <Link
//             href="/akun/tentang"
//             className="bg-grey-500 text-gray-700 font-smooth text-sm py-2 px-4 rounded text-center "
//           >
//             Tentang {company.name}
//           </Link>
//           <div className="text-gray-700 text-base mt-3 mb-10 px-4 flex items-center">
//             {/* <Link href="https://cnt.id/" className="flex items-center"> */}
//             {/* <CgCopyright className="w-4 h-4 mr-1" /> */}
//             {/* <p>2023 {company.name} <span className="text-sm opacity-10"> | v.1</span></p> */}
//             {/* </Link> */}
//           </div>
//         </div>
//       ) : (
//         <div
//           className={`relative pt-4 w-full h-[520px] flex-col flex items-stretch mb-6`}
//           style={divStyle}
//         >
//           <div className="text-sm text-center text-gray-600 px-4 mt-4"></div>
//           <div className="flex justify-center gap-8 mt-4 "></div>
//           <div className="text-gray-600 text-sm mt-10 px-4 w-full">
//             <p className="font-bold">Alamat</p>
//           </div>
//           <div className="text-gray-600 inline-flex text-base mt-6 px-4">
//             <CgCopyright className="w-4 h-4 mr-1" />
//             <p onClick={handleClick}>2023 {company.name} | v.1</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Footer;
