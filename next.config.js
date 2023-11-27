/** @type {import('next').NextConfig} */

const domain = process.env.ERP_URL || '';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    domains: [`${domain.split('//')[1]}`, 'cnt-id.imgix.net', 'cnt-id-laziskhu-dev1.imgix.net', 'cnt-id-rasi-dev1.imgix.net', 'cnt-id-rwi-dev1.imgix.net', 'cnt-id-ysm-dev1.imgix.net', 'cnt-id-rwi.imgix.net', 'cnt-id-rn-dev1.imgix.net', 'cnt-id-rn.imgix.net', 'cnt-id-ymn-dev1.imgix.net', 'cnt-id-ymn.imgix.net', 'cnt-id-adzdzikri-dev1.imgix.net', 'cnt-id-ummulquro-dev1.imgix.net', 'cnt-id-ummulquro.imgix.net', 'cnt-id-laziskhu.imgix.net', 'cnt-id-rasi.imgix.net' , 'erp16-krn-dev1.cnt.id' , 'cnt-id-rn-dev1.imgix.net','erp16-rwi-dev1.cnt.id','erp16-rwi-dev3.cnt.id','erp16-pi-dev3.cnt.id', 'cnt-id-pi.imgix.net'],
    // domains: [`localhost`],
  },
};


// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
//   openAnalyzer: false,
// })
// module.exports = withBundleAnalyzer(nextConfig)

// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
//   register: true,
//   skipWaiting: true,
// });

module.exports = nextConfig