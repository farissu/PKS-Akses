// Import necessary dependencies
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import { PrefixContext } from "../context/PrefixContext";

// Import Swiper styles for pagination
import 'swiper/css/pagination';

// Banner component
export default function Banner({ data }: any) {
  const urlGambarDefault = "/default.png";

  const handleGambarError = (event: any) => {
    event.target.src = urlGambarDefault;
  };

  const prefix = useContext(PrefixContext);

  const roundedCornerSize = "15px";

  return (
    <>
      {data ? (
        <div className=" overflow-hidden relative">
          {/* Swiper component with circular pagination */}
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination", // Specify the CSS selector for pagination
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
              
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper z-0"
            style={{
              borderRadius: roundedCornerSize,
              overflow: "hidden",
              width: "90%", // Adjust the width as needed
              height: "270px", // Adjust the height as needed
              top: "65px",
            }}
          >
            {/* Mapping through data to generate slides */}
            {data.map((item: any, i: number) => (
              <SwiperSlide key={i}>
                {/* Link to each slide */}
                <Link
                  href={
                    item.new_tab
                      ? `${item.href}`
                      : `${
                          prefix != null && prefix !== ""
                            ? prefix + "/"
                            : "/program/"
                        }${item.slug}${
                          typeof window != "undefined"
                            ? window.location.search
                            : ""
                        }`
                  }
                  target={item.new_tab ? "_blank" : "_self"}
                >
                  {/* Image component */}
                  {/* <img
                    src={`${item.image_url}?w=400&h=auto&q=100&upscale=true&auto=compress,format`}
                    alt={item.slug}
                    className="lg:min-h-[150px] max-h-[150px] lg:max-h-[150px] bg-gray-500 w-full"
                    style={{
                      maxWidth: "100%",
                      borderRadius: roundedCornerSize,
                    }}
                    width={300}
                    height={150}
                    loading="lazy"
                    onError={handleGambarError}
                  /> */}
              <img
                src="/banner-1.png"  // Assuming banner-1.png is in the public folder
                alt={item.slug}
                className="lg:min-h-[170px] max-h-[170px] lg:max-h-[170px] bg-gray-500 w-full"
                style={{
                  maxWidth: "100%",
                  borderRadius: roundedCornerSize, // Make sure 'roundedCornerSize' is defined
                }}
                width={300} // Adjust the width as needed
                height={150} // Adjust the height as needed
                loading="lazy" // Optionally add the loading attribute for lazy loading
                onError={handleGambarError}
              />
              
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Circular pagination */}
          <div className="swiper-pagination" style={{color: '#2D4356', opacity: "0.5" }}></div>
        </div>
      ) : null}
    </>
  );
}
