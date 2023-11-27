import React, { useState, useEffect, Suspense } from "react";
import ProgramCard from "../Home/ProgramCard";
import ListProgramCard from "../Home/ListProgramCard";
import DialogFilter from "../Home/DialogFilter";
import DialogSort from "../Home/DialogSort";
import { IoGridOutline, IoList, IoFilter, IoArrowDown } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

const ListProgram = ({ program, mendesak, category, colorPrimary }: any) => {
  const [changeLayout, setchangeLayout] = useState(false);
  const router = useRouter();

  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  const handleExpand = () => {
    setchangeLayout(!changeLayout);
  };
  const [showFilter, setshowFilter] = useState(false);
  const [showSort, setshowSort] = useState(false);
  // sort by write_date
  const [items, setItems] = useState(program);
  const [hasMore, setHasMore] = useState(true);
  const [sortedItems, setSortedItems] = useState(items);

  const sortItemsByCreateDate = () => {
    const sorted = items.sort((a: any, b: any) => b.write_date < a.write_date ? 1 : -1);
    setSortedItems(sorted);
  };
  const sortItemsByMendesak = () => {
    const sorted = mendesak.sort((a: any, b: any) => b.write_date < a.write_date ? 1 : -1);
    setSortedItems(sorted);
  };

  const categoryArray = category ? category.map((item: any) => item.name) : null;

  const [selectedCategory, setSelectedCategory] = useState("");
  const sortItemsByCategory = (category: any) => {
    setSelectedCategory(category);
    const sorted = items.filter((item: any) => item.categoryName.toLowerCase() === category.toLowerCase());
    setSortedItems(sorted);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    if (router.query.mendesak === "true") {
      sortItemsByMendesak()
    } else if (router.query.category) {
      sortItemsByCategory(router.query.category);
    }
  }, [program, mendesak, category])

  const getMorePost = async () => {
    // const offset = sortedItems.length;
    // const res = await fetch(`/api/program?offset=${offset}`);
    // const newPosts = await res.json();
    // const data = newPosts.program

    // if (Array.isArray(data)) {
    //   setSortedItems((posts: any) => [...posts, ...data]);
    //   setHasMore(data.length === 6);
    // } else {
    //   console.error("newPosts is not an array", data);
    // }
  };

  return (
    <>
      <section className="pb-4 pt-20 px-4 relative">
        <div className="flex mb-4 justify-between w-full">
          <div className="flex gap-4">
            <div
              onClick={() => setshowFilter(true)}
              className="flex w-[78px] h-9 border  border-blue-500 rounded-[5px] items-center gap-0.5 justify-center"
              style={{borderColor:colorPrimary}}
            >
              <IoFilter className="w-5 h-5" style={{color:colorPrimary}} />
              <button style={{color:colorPrimary}}>Filter</button>
            </div>
            <div
              onClick={() => setshowSort(true)}
              className="flex w-[104px] h-9 border  border-blue-500 rounded-[5px] items-center gap-0.5 justify-center"
              style={{borderColor:colorPrimary}}
            >
              <IoArrowDown className="w-5 h-5" style={{color:colorPrimary}} />
              <button style={{color:colorPrimary}}>Urutkan</button>
            </div>
          </div>
          {showFilter && <DialogFilter onClose={() => setshowFilter(false)} category={categoryArray} sortItemsByCategory={sortItemsByCategory} />}
          {showSort && <DialogSort onClose={() => setshowSort(false)} sortItemsByCreateDate={sortItemsByCreateDate} sortItemsByMendesak={sortItemsByMendesak} />}

          <div
            onClick={handleExpand}
            className="flex w-9 h-9 border  rounded-[5px] items-center justify-center"
            style={{borderColor:colorPrimary}}
          >
            {changeLayout ? (
              <button>
                <IoGridOutline className="w-5 h-5" style={{color:colorPrimary}} />
              </button>
            ) : (
              <button>
                <IoList className="w-5 h-5" style={{color:colorPrimary}} />
              </button>
            )}
          </div>
        </div>


        {sortedItems ? (
          <>
            {changeLayout && (
              <InfiniteScroll
                dataLength={sortedItems.length}
                next={getMorePost}
                hasMore={hasMore}
                loader={<h3> </h3>}
                className="px-0.5"
              >
                <AnimatePresence>
                  <motion.div
                    animate="show"
                    variants={variants}
                    initial="hidden"
                    className="flex flex-col gap-4 mb-16"
                  >
                    <Suspense fallback={<p></p>}>
                      {
                        sortedItems.map((item: any) => {
                          return (

                            <ListProgramCard
                              key={item.id}
                              thumbnail={item.image_url.replace(/https:\/\/[^/]+\/web\/image\//, item.url_web)}
                              name={item.name}
                              category_ids={item.categoryName || null}
                              total_funded={item.total_funded}
                              days_to_expire={item.days_to_expire}
                              slug={item.slug}
                              target={item.target}
                              bgColour={item.color}
                              textColour={item.text_colour}
                            />

                          );
                        })
                      }
                    </Suspense>
                  </motion.div>
                </AnimatePresence>
              </InfiniteScroll>
            )}



            {!changeLayout && (
              <>
                {isLoading ? (
                  // Show skeleton UI while data is loading
                  <div className="grid grid-cols-2 grid-flow-row gap-4 animate-pulse">
                    {[0,1,2,3,4,5].map((item) => (
                      <div className="w-full h-[240px] bg-gray-200 rounded" key={item}></div>
                    ))}
                  </div>
                ) : (
                  <InfiniteScroll
                    dataLength={sortedItems.length}
                    next={getMorePost}
                    hasMore={hasMore}
                    loader={<h3> </h3>}
                    className="px-0.5"
                  >
                    <AnimatePresence>
                      <motion.div
                        animate="show"
                        variants={variants}
                        initial="hidden"
                        className="grid grid-cols-2 grid-flow-row gap-4"
                      >
                        {sortedItems.map((item: any) => {
                          return (
                            <ProgramCard
                              key={item.id}
                              thumbnail={item.image_url}
                              name={item.name}
                              category_ids={item.categoryName || null}
                              total_funded={item.total_funded}
                              days_to_expire={item.days_to_expire}
                              slug={item.slug}
                              target={item.target}
                              bgColour={item.color}
                              textColour={item.text_colour}
                            />
                          );
                        })}

                      </motion.div>
                    </AnimatePresence>
                  </InfiniteScroll>

                )}
              </>
            )}
          </>
        ) : (null)}
      </section>

    </>
  );
};

export default ListProgram;
