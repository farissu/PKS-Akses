import React, { useState } from "react";
import ProgramCard from "../Home/ProgramCard";
import ListProgramCard from "../Home/ListProgramCard";
import DialogFilter from "../Home/DialogFilter";
import DialogSort from "../Home/DialogSort";
import { IoGridOutline, IoList, IoFilter, IoArrowDown } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const ListSearch = ({ program, mendesak, category, activeData, company }: any) => {
  const [changeLayout, setchangeLayout] = useState(false);
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
  const [sortedItems, setSortedItems] = useState(items);
  const sortItemsByCreateDate = () => {
    const sorted = sortedItems.sort((a: any, b: any) => b.write_date < a.write_date ? 1 : -1);
    setSortedItems(sorted);
  };
  const sortItemsByMendesak = () => {
    const sorted = mendesak.sort((a: any, b: any) => b.write_date < a.write_date ? 1 : -1);
    setSortedItems(sorted);
  };
  const filteredItems = sortedItems.filter((item: any) => activeData.includes(item));

  const categoryArray = category ? category.map((item: any) => item.name) : null;

  const [selectedCategory, setSelectedCategory] = useState("");
  const sortItemsByCategory = (category: any) => {
    setSelectedCategory(category);
    const sorted = items.filter((item: any) => item.categoryname === category);
    setSortedItems(sorted);
  };

  return (
    <>
      <section className="pb-4 pt-20 px-4 relative">
        <div className="flex mb-4 justify-between w-full">
          <div className="flex gap-4">
            <div
              onClick={() => setshowFilter(true)}
              className="flex w-[78px] h-9 border shadow-lg rounded-[5px] items-center gap-0.5 justify-center"
              style={{borderColor:company.primary_colour}}
            >
              <IoFilter className="w-5 h-5 " color={company.primary_colour} />
              <button style={{color:company.primary_colour}}>Filter</button>
            </div>
            <div
              onClick={() => setshowSort(true)}
              className="flex w-[104px] h-9 border shadow-lg  rounded-[5px] items-center gap-0.5 justify-center"
              style={{borderColor:company.primary_colour}}
            >
              <IoArrowDown className="w-5 h-5" color={company.primary_colour} />
              <button style={{color:company.primary_colour}}>Urutkan</button>
            </div>
          </div>
          {showFilter && <DialogFilter onClose={() => setshowFilter(false)} category={categoryArray} sortItemsByCategory={sortItemsByCategory} />}
          {showSort && <DialogSort onClose={() => setshowSort(false)} sortItemsByCreateDate={sortItemsByCreateDate} sortItemsByMendesak={sortItemsByMendesak} />}

          <div
            onClick={handleExpand}
            className="flex w-9 h-9 border shadow-lg rounded-[5px] items-center justify-center"
            style={{borderColor:company.primary_colour}}
          >
            {changeLayout ? (
              <button>
                <IoGridOutline className="w-5 h-5" color={company.primary_colour} />
              </button>
            ) : (
              <button>
                <IoList className="w-5 h-5" color={company.primary_colour} />
              </button>
            )}
          </div>
        </div>
        {sortedItems ? (
          <>
            {filteredItems.length == 0 ? (
              <div className="w-full h-full text-center flex items-center justify-center mt-32">
                <p className="text-gray-400 font-semibold text-center">Mohon Maaf Program Tidak ditemukan</p>
              </div>
            ) : (
              <>
                {changeLayout && (
                  <AnimatePresence>
                    <motion.div
                      animate="show"
                      variants={variants}
                      initial="hidden"
                      className="flex flex-col gap-4 mb-16"
                    >
                      {filteredItems.map((item: any) => {
                        return (
                          <ListProgramCard
                            key={item.id}
                            thumbnail={item.image_url}
                            name={item.name}
                            category_ids={item.categoryname || null}
                            total_funded={item.total_funded}
                            days_to_expire={item.days_to_expire}
                            slug={item.slug}
                            target={item.target}
                          />
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                )}
              </>
            )}
            {!changeLayout && (
              <AnimatePresence>
                <motion.div
                  animate="show"
                  variants={variants}
                  initial="hidden"
                  className="grid grid-cols-2 grid-flow-row gap-4 mb-16"
                >
                  {filteredItems.map((item: any) => {
                    return (
                      <ProgramCard
                        key={item.id}
                        thumbnail={item.image_url}
                        name={item.name}
                        category_ids={item.categoryname || null}
                        total_funded={item.total_funded}
                        days_to_expire={item.days_to_expire}
                        slug={item.slug}
                        target={item.target}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </>
        ) : (null)}
      </section>

    </>
  );
};

export default ListSearch;
