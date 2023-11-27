import React, { useState, useContext } from "react";
import ProgramCard from "./ProgramCard";
import ListProgramCard from "./ListProgramCard";
import DialogFilter from "./DialogFilter";
import DialogSort from "./DialogSort";
import { IoGridOutline, IoList, IoFilter, IoArrowDown } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { PrefixContext } from "../context/PrefixContext";
import Link from "next/link";
const ListProgram = ({ program, mendesak, category, colorPrimary, colorSecondary }: any) => {
  const router = useRouter()
  const prefix = useContext(PrefixContext)

  const ref = router.query.source ?? ''
  const [changeLayout, setchangeLayout] = useState(true);
  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  const handleExpand = () => {
    setchangeLayout(!changeLayout);
  };
  const [showFilter, setshowFilter] = useState(false);
  const [showSort, setshowSort] = useState(false);
  const [items, setItems] = useState(program);
  const [sortedItems, setSortedItems] = useState(items);
  const sortItemsByCreateDate = () => {
    const sorted = sortedItems.sort((a: any, b: any) => b.write_date < a.write_date ? 1 : -1);
    setSortedItems(sorted);
  };
  const sortItemsByMendesak = () => {

    const sorted = mendesak.sort((a: any, b: any) => b.write_date < a.write_date ? 1 : -1);
    setSortedItems(sorted);
  };

  const [selectedCategory, setSelectedCategory] = useState("Filter");
  const sortItemsByCategory = (category: any) => {
    // setSelectedCategory(category);
    const sorted = items.filter((item: any) => item.categoryname === category);
    setSortedItems(sorted);
  };

  // test = selectedCategory
  const categoryArray = category ? category.map((item: any) => item.name) : null;

  return (
    <>
      <section className="pt-4 px-4 relative">
        <div className="flex mb-4 justify-between w-full">
          <div className="flex gap-4">
            <div
              onClick={() => setshowFilter(true)}
              className={`flex w-[78px] h-9 border rounded-[5px] items-center gap-0.5 justify-center text-xs`}
              style={{ borderColor: colorPrimary }}
            >
              <IoFilter className={`w-4 h-4 `} style={{ color: colorPrimary }} />
              <button style={{ color: colorPrimary }}>
                {selectedCategory}
              </button>
            </div>
            <div
              onClick={() => setshowSort(true)}
              className="flex w-[104px] h-9 border rounded-[5px] items-center gap-0.5 justify-center text-xs"
              style={{ borderColor: colorPrimary }}
            >
              <IoArrowDown className={`w-4 h-4`} style={{ color: colorPrimary }} />
              <button style={{ color: colorPrimary }}>Urutkan</button>
            </div>
          </div>
          {showFilter && (
            <DialogFilter
              onClose={() => setshowFilter(false)}
              category={categoryArray}
              sortItemsByCategory={sortItemsByCategory}
            />
          )}
          {showSort && (
            <DialogSort
              onClose={() => setshowSort(false)}
              sortItemsByCreateDate={sortItemsByCreateDate}
              sortItemsByMendesak={sortItemsByMendesak}
            />
          )}

          <div
            onClick={handleExpand}
            className={`flex w-9 h-9 border  rounded-[5px] items-center justify-center`}
            style={{ borderColor: colorPrimary }}
          >
            {changeLayout ? (
              <button>
                <IoGridOutline className={`w-4 h-4 `} style={{ color: colorPrimary }} />
              </button>
            ) : (
              <button>
                <IoList className={`w-4 h-4 `} style={{ color: colorPrimary }} />
              </button>
            )}
          </div>
        </div>
        {sortedItems ? (
          <>
            {changeLayout && (
              <AnimatePresence>
                <motion.div
                  animate="show"
                  variants={variants}
                  initial="hidden"
                  className="flex flex-col gap-2"
                >
                  {sortedItems.slice(0, 4).map((item: any) => {
                    return (
                      <ListProgramCard
                        key={item.id}
                        thumbnail={item.image_url}
                        name={item.name}
                        category_ids={item.categoryname || null}
                        total_funded={item.total_funded}
                        expire_date={item.expire_date}
                        colorPrimary={colorPrimary}
                        slug={item.slug}
                        target={item.target}
                        bgColour={item.color}
                        textColour={item.text_color}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
            {!changeLayout && (
              <AnimatePresence>
                <motion.div
                  animate="show"
                  variants={variants}
                  initial="hidden"
                  className="grid grid-cols-2 grid-flow-row gap-2"
                >
                  {sortedItems.slice(0, 4).map((item: any) => {
                    return (
                      <ProgramCard
                        key={item.id}
                        thumbnail={item.image_url}
                        name={item.name}
                        category_ids={item.categoryname || null}
                        total_funded={item.total_funded}
                        slug={item.slug}
                        expire_date={item.expire_date}
                        target={item.target}
                        colorPrimary={colorPrimary}
                        bgColour={item.color}
                        textColour={item.text_color}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </>
        ) : null}
        <div className="relative py-4 flex items-center justify-center">
          <Link href={`${prefix != null && prefix != "" ?  prefix +"/programs" : "/program/" }${ref !== '' ? `?source=${ref}` : ''}`} className="cursor-pointer">
            <button
              className={` w-[160px] h-7 rounded-full text-[14px]`}
              style={{ backgroundColor: colorSecondary }}
            >
              <p className="text-white" >Lihat Semua</p>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ListProgram;
