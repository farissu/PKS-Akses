import { Html, Head, Main, NextScript } from 'next/document'


// export async function getServerSideProps() {
//   return {
//     props: {  },
//   };
// }

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link rel="icon" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
