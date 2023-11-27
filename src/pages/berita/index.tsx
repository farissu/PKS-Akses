import { getAll as getAllNews, getNews } from "@/erp/news";
import { IoFilter, IoSearch } from "react-icons/io5";
import Image from "next/image";
import { useState, useEffect, useRef, useContext, use } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import BottomNavbar from "@/components/Home/BottomNavbar";
import { BsEmojiSmile } from "react-icons/bs";
import DialogSort from "@/components/Home/DialogSort";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CompanyContext } from "@/components/context/CompanyContext";
import { PrefixContext } from "@/components/context/PrefixContext";

export async function getServerSideProps({ req, res }: any) {
  let news = await getAllNews(5, 0, req.headers.host);
  // let newsNew = await getNews(6, 0, req.headers.host, "name,slug,create_date");
  return { props: { news } };
}

export default function News({ news }: any) {
  // @ts-ignore
  const newsNew: any = []
  const company: any = useContext(CompanyContext)
  const [penyaluran, setPenyaluran] = useState<any[]>([]);
  const [error, setError] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const router = useRouter();
  const ref = router.query.source ?? "";
  const prefix = useContext(PrefixContext)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
    const login = cookie.get("login");
    return () => {
      // cleanup function
    };
  }, [news, penyaluran]);

  const count = penyaluran.length;

  const [hasMore, setHasMore] = useState(true);
  const [listnew, setlistnew] = useState(news);
  const [currentNew, setCurrentNew] = useState(news)
  const sortItemsByCreateDate = () => {
    const sorted = currentNew.sort((a: any, b: any) =>
      b.create_date > a.create_date ? 1 : -1
    );
    setSelectedCategory(sorted);
  };

  // test = selectedCategory

  const [showFilter, setshowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Filter");
  const [pesan, setPesan] = useState(false);
  const [berita, setBerita] = useState(true);

  const clickPesan = () => {
    setPesan(true);
    setBerita(false);
    setNotifications(false);
  };
  const clickBerita = () => {
    setPesan(false);
    setBerita(true);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: any) => {
    const { value } = event.target;
    setSearchTerm(value);
  };



  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchBoxRef.current) {
        searchBoxRef.current.checked = !searchBoxRef.current.checked;

      }
    }
  };




  useEffect(() => {
    if (searchTerm.length > 0) {
      const findByKeyword = async (keyword: string) => {
        const res = await fetch(`/api/berita/findByKeyword?keyword=${keyword}&limit=8`);
        const result = await res.json();
        setCurrentNew(result.news);
        setHasMore(false); // Reset hasMore to true when searching
      };
      findByKeyword(searchTerm);
    } else if (searchTerm.length === 0) {
      setCurrentNew(news);
      setHasMore(true); // Reset hasMore to true when searchTerm is empty
    }
  }, [searchTerm]);


  const searchBoxRef = useRef<HTMLInputElement>(null);

  const getMorePost = async () => {
    const offset = currentNew.length;

    const res = await fetch(`/api/berita?offset=${offset}&limit=5`);
    const newPosts = await res.json();

    const data = newPosts.news;

    if (Array.isArray(data)) {
      setCurrentNew((posts: any) => [...posts, ...data]);
      setHasMore(data.length === 6);
    } else {
      console.error("newPosts is not an array", data);
    }
  };

  return (
    <>
      <AnimatePresence>

        <Head>
          <title>Berita</title>
          <link rel="icon" href={company.favicon_url} />
          {/* <link rel="manifest" href={`/${company.alias}/manifest.json`} /> */}
        </Head>

        <div className="bg-gray-100 pb-20">
          <div className="mx-auto min-h-screen shadow-lg max-w-sm bg-white pb-4">
            <nav
              className={`h-[60px] flex items-center px-4 sm:px-4 py-2.5 bg-white shadow-md`}
            >
              <Link href="/">
                <img src={company.image_url + "?w=100&q=100"} width="80" height="36" />
              </Link>
            </nav>
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >


              <div className="grid grid-cols-2">
                <button onClick={clickBerita}>
                  <div
                    className={`flex justify-center items-center py-3 border-b-4 `}
                    style={
                      berita
                        ? {
                          borderColor: company.accent_colour,
                          color: company.accent_colour,
                        }
                        : { borderColor: "#808080", color: "#808080" }
                    }
                  >
                    Berita
                  </div>
                </button>
                <button onClick={clickPesan}>
                  <div
                    className={`flex justify-center items-center py-3 border-b-4 `}
                    style={
                      pesan
                        ? {
                          borderColor: company.accent_colour,
                          color: company.accent_colour,
                        }
                        : { borderColor: "#808080", color: "#808080" }
                    }
                  >
                    <div className="relative">
                      Pesan
                      {count > 0 &&
                        notifications && ( // update the condition here
                          <span className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center absolute -top-1 -right-4 text-xs">
                            {count}
                          </span>
                        )}
                    </div>
                  </div>
                </button>
              </div>

              {berita && (
                <div className="px-4">
                  <div className=" py-3 text-sm text-gray-600">
                    Cek berita terbaru penyaluran kami
                  </div>
                  <div className=" pb-3 flex gap-2 items-center justify-between">
                    <div className="flex-grow">
                      <div className="relative rounded-full border border-gray-300 py-2 px-4">
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchTerm}
                          onChange={handleSearch}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent outline-none focus:outline-none"
                        />
                        <span className="absolute top-0 right-0 mt-2 mr-2">
                          <IoSearch className="w-5 h-5 text-gray-500" />
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-gray-600">
                        <div className="flex items-center justify-center h-10 w-10">
                          <div
                            onClick={() => setshowFilter(true)}
                            className=" flex w-[78px] h-9 border rounded-[5px] items-center gap-0.5 justify-center hover:bg-gray-200 focus:bg-gray-200"
                            style={{ borderColor: company.primary_color }}
                          >
                            <IoFilter
                              className="w-5 h-5 "
                              style={{ color: company.primary_color }}
                            />
                            {/* <button className="text-blue-500">{selectedCategory}</button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {showFilter && (
                      <DialogSort
                        onClose={() => setshowFilter(false)}
                        sortItemsByCreateDate={sortItemsByCreateDate}
                      />
                    )}
                  </div>
                  <InfiniteScroll
                    dataLength={newsNew.length}
                    next={() => getMorePost()}
                    hasMore={hasMore}
                    loader={<h3></h3>}
                    className="px-0.5"
                  >
                    {currentNew.map((item: any) => {
                      return (
                        <ListNews prefix={prefix} slug={item.slug} image_url={item.image_url} create_date={item.create_date} name={item.name} />
                      )
                    })}
                  </InfiniteScroll>
                </div>
              )}

              {pesan && (
                <div className="items-center flex flex-col justify-center p-4">
                  <BsEmojiSmile className="w-[64px] h-[64px]" />
                  <p className="pt-4 text-sm">
                    Belum ada berita untuk kamu.
                  </p>
                  <p className="text-center text-sm">
                    Mari buka kebaikanmu dengan mulai berdonasi untuk
                    membantu sesama.
                  </p>
                  <a
                    href={`${prefix != null && prefix != "" ? prefix + "/" : "/program/"}${ref !== "" ? `?source=${ref}` : ""}`}
                    className="w-full pt-4"
                  >
                    <button
                      className="mx-auto w-full hover:bg-red-500 text-white py-2 mb-4 rounded"
                      style={{ backgroundColor: company.accent_colour }}
                    >
                      Bantu Sekarang
                    </button>
                  </a>
                </div>
              )}
            </motion.div>
            <BottomNavbar active="Berita" colour={company.accent_colour} />
          </div>
        </div>

      </AnimatePresence>
    </>
  );
}


const ListNews = ({ prefix, slug, image_url, create_date, name }: { prefix: string, slug: string, image_url: string, create_date: string, name: string }) => {

  const dateFormat = (value: string) => {
    const date = new Date(value);

    // Get the components of the date
    const year = date.getFullYear();      // yyyy
    const month = date.getMonth() + 1;    // mm (January is 0, so add 1)
    const day = date.getDate();           // dd
    const hour = date.getHours();         // hh
    const minute = date.getMinutes();     // mm
    const second = date.getSeconds();     // ss
    // Format the components with leading zeros if necessary
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  }
  const date = dateFormat(create_date)
  return (
    <Link href={prefix + "/berita/" + slug}>
      <div className="card lg:card-side bg-base-100 shadow-sm flex my-2 gap-2 border rounded  ">
        <figure ><Image src={`${image_url}?w=220&q=100`} quality={100} alt="Album" width={0} height={0} sizes="100vw" className="min-w-[180px] min-h-[120px] max-h-[120px] object-cover rounded" /></figure>
        <div className="flex flex-col justify-evenly">
          <h2 className="font-semibold text-sm line-clamp-2">{name}</h2>
          <p className="text-xs">{date}</p>
        </div>
      </div>
    </Link>
  )
}


