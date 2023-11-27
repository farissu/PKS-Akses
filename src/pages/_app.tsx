
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import * as fbq from '../helpers/fbpixel'
import * as googleAnalityc from '../helpers/google-analityc';
import { useRouter } from 'next/router';
import { PrefixContext } from '@/components/context/PrefixContext';
import { CompanyContext } from '@/components/context/CompanyContext';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // const handleRouteChange = () => {
  //   fbq.pageview();
  //   googleAnalityc.pageViewGA();
  // }
  const [fbPixelID, setFbPixelID] = useState(null);
  const [gaID, setGaId] = useState(null);
  const [prefix, setPrefix] = useState('')
  const [company, setCompany]: any = useState('')

  async function fetchFbPixelID() {
    if (typeof window != undefined) {
      const id = await fbq.getDataPixel(window.location.origin);
      setFbPixelID(id);
    }
  }

  async function fetchGa() {
    const id = await googleAnalityc.getIDga(window.location.origin);
    setGaId(id);
  }

  useEffect(() => {
    async function loadCompany() {
      try {
        // if (!window.localStorage.getItem('company')) {
          const res = await fetch('/api/company');
          const result = await res.json();
          const data = result.company.results[0]

          setCompany(data)
          //@ts-ignore
          let companyObject = {
            "id": data.id,
            "name": data.name,
            "phone": data.phone,
            "description": data.description,
            "primary_colour": data.primary_colour,
            "secondary_colour": data.secondary_colour,
            "accent_colour": data.accent_colour,
            "info_colour": data.info_colour,
            "danger_colour": data.danger_colour,
            "success_colour": data.success_colour,
            "warning_colour": data.warning_colour,
            "logo_perusahaan_url": data.logo_perusahaan_url,
            "alias": data.alias,
            "company_id": data.company_id,
            "favicon_url": data.favicon_url,
            "image_url": data.image_url,
            "image_putih_url": data.image_putih_url
          }
          window.localStorage.setItem('company', JSON.stringify(companyObject))
        // } else {
        //   // console.log('ada di localstorage')
        //   // @ts-ignore
        //   setCompany(JSON.parse(window.localStorage.getItem('company')))
        // }
        
      } catch (error) {
        console.error(error)
      }
    }
    loadCompany();
  }, [])

  const [progress, setProgress] = useState(0)
  const [isProgressRun, setIsProgressRun] = useState(false)

  useEffect(() => {
    const handleRouteChangeError = (err: { cancelled: any; }, url: any) => {
      if (err.cancelled) {
        console.log(`Route to ${url} was cancelled!`)
      }
    }
    router.events.on('routeChangeError', handleRouteChangeError)
    return () => {
      router.events.off('routeChangeError', handleRouteChangeError)

    }
  }, [router])

  useEffect(() => {
    const handleRouterStart = (err: { cancelled: any; }, url: any) => {
      setProgress(20)
      setIsProgressRun(true)
    }

    router.events.on('routeChangeStart', handleRouterStart)
    return () => {
      setProgress(40)
      router.events.off('routeChangeStart', handleRouterStart)
      setProgress(100)
      setTimeout(() => {
        setIsProgressRun(false)
      }, 500)

    }
  }, [router])



  useEffect(() => {
    async function checkPrefixAndRedirect() {
      try {
        const res = await fetch('/api/company/prefix');
        const result = await res.json();
        if (result.company.results.length > 0) {
          let fetchedPrefix = ""
          if (router.query.prefix === 'donasi') {
            fetchedPrefix = '/donasi'
            setPrefix(fetchedPrefix)
          } else {
            fetchedPrefix = result.company.results[0].prefix;
            if (fetchedPrefix != null) {
              setPrefix(fetchedPrefix)
            }
            if (fetchedPrefix !== null) {
              const currentPathParts = router.asPath.split('/');
              const fetchedPathParts = fetchedPrefix.split('/');
              const currentPathWithoutQuery = currentPathParts[1].split('?')[0];
              if (fetchedPathParts[1] && currentPathWithoutQuery !== fetchedPathParts[1]) {
                setPrefix(fetchedPrefix);
                window.location.href = fetchedPrefix + router.asPath;

              }
            } else {
              if (prefix != '') {
                // 
              } else {
                setPrefix('');
                // window.location.href = prefix + router.asPath;
              }

            }
          }


        }
      } catch (error) {
        console.error('Error fetching prefix:', error);
      }
    }

    checkPrefixAndRedirect();
  }, [prefix]);


  useEffect(() => {
    fetchGa();
    fetchFbPixelID();
  }, []);

  const [folderName, setFolderName] = useState('')

  useEffect(() => {
    if (typeof window != "undefined") {
      setFolderName(window.location.host)
    }
  }, [])

  return (
    <>
      <CompanyContext.Provider value={company}>
        <PrefixContext.Provider value={prefix}>
          {/* <SessionProvider session={pageProps.session}> */}
          {gaID !== null && (

            <div>
              <Head>
                <link rel="manifest" href={`/${folderName}/manifest.json`} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
              </Head>
              <Script src={"https://accounts.google.com/gsi/client"} async />
              <Script
                src={"https://www.googletagmanager.com/gtag/js?id=" + gaID + "&v=1.0"}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config','${gaID}');
              `}
              </Script>
            </div>

          )}

          <Script id="pwa" strategy='afterInteractive'>
            {
              `if ('serviceWorker' in navigator) {
                   window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js')
                      .then((registration) => {
                        // console.log('ServiceWorker registered with scope:', registration.scope);
                      })
                      .catch((error) => {
                        console.error('ServiceWorker registration failed:', error);
                      });
                   });
                }
                `
            }
          </Script>

          {// @ts-ignore
            fbPixelID != null && fbPixelID != undefined && fbPixelID.length > 0 &&
            // @ts-ignore
            fbPixelID?.split(",").map((item, index) => (
              <div key={index} >
                <Script

                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq.disablePushState = true;
                    fbq('init', ${item});
                    fbq.allowDuplicatePageViews = true;
                  `
                  }}
                />
                <noscript>
                  <img
                    height="1"
                    width="1"
                    alt="fb-pixel"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${item}&ev=PageView&noscript=1&v=1.0`}
                  />
                </noscript>
              </div>
            )
            )
          }



          {isProgressRun && (
            <Loading progress={progress} primary_colour={company.primary_colour} />
          )}

          <Component {...pageProps} />
          {/* </SessionProvider> */}
        </PrefixContext.Provider>
      </CompanyContext.Provider>

    </>

  );
}


function loadCompany() {
  throw new Error('Function not implemented.');
}


const Loading = ({ progress, primary_colour }: any) => {
  return (
    <div className='fixed top-0 left-0 w-full  p-0.5 transition-all z-[9999]' style={{ width: progress + "%", background: primary_colour }}>
    </div>
  )
}