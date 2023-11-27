import React, { Suspense, useState } from "react";
import ProgramCard from "../Home/ProgramCard";
import ListProgramCard from "../Home/ListProgramCard";
import DialogSort from "../Home/DialogSort";
import { IoGridOutline, IoList, IoArrowDown } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const ListZakat = ({ program, colorSecondary }: any) => {
  const [changeLayout, setchangeLayout] = useState(false);
  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  const handleExpand = () => {
    setchangeLayout(!changeLayout);
  };
  const router = useRouter();
  const ref = router.query.source ?? "";
  const [showSort, setshowSort] = useState(false);
  // sort by write_date
  const [items, setItems] = useState(program);
  const [sortedItems, setSortedItems] = useState(items);
  const sortItemsByCreateDate = () => {
    const sorted = program.sort((a: any, b: any) =>
      b.write_date < a.write_date ? 1 : -1
    );
    setSortedItems(sorted);
  };
  const sortItemsByMendesak = () => {
    const sorted = program.filter((item: any) => item.is_mendesak === true);
    setSortedItems(sorted);
  };

  return (
    <>
      <section className="pb-4 pt-20 px-4 relative">
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            <div
              onClick={() => setshowSort(true)}
              className="flex w-[104px] h-9 border  border-blue-500 rounded-[5px] items-center gap-0.5 justify-center"
            >
              <IoArrowDown className="w-5 h-5 text-blue-500" />
              <button className="text-blue-500">Urutkan</button>
            </div>
          </div>
          {showSort && (
            <DialogSort
              onClose={() => setshowSort(false)}
              sortItemsByCreateDate={sortItemsByCreateDate}
              sortItemsByMendesak={sortItemsByMendesak}
            />
          )}

          <div
            onClick={handleExpand}
            className="flex w-9 h-9 border  border-blue-500 rounded-[5px] items-center justify-center"
          >
            {changeLayout ? (
              <button>
                <IoGridOutline className="w-5 h-5 text-blue-500" />
              </button>
            ) : (
              <button>
                <IoList className="w-5 h-5 text-blue-500" />
              </button>
            )}
          </div>
        </div>
        <Suspense fallback={<p>Loading.....</p>}>
          <a
            href={`/zakat/calculator${ref !== "" ? `?source=${ref}` : ""}`}
            className="bg-white max-w-md w-full"
          >
            <div className="w-full my-4">
              <button className={` w-full hover:bg-red-500 text-white p-3 rounded font-semibold text-base`}
              style={{backgroundColor:colorSecondary}}>
                <p>Klik disini untuk menghitung dengan kalkulator!</p>
              </button>
            </div>
          </a>
          {sortedItems ? (
            <>
              {changeLayout && (
                <AnimatePresence>
                  <motion.div
                    animate="show"
                    variants={variants}
                    initial="hidden"
                    className="flex flex-col gap-4 mb-16"
                  >
                    {sortedItems.map((item: any) => {
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
              {!changeLayout && (
                <AnimatePresence>
                  <motion.div
                    animate="show"
                    variants={variants}
                    initial="hidden"
                    className="grid grid-cols-2 grid-flow-row gap-4 mb-16"
                  >
                    {sortedItems.map((item: any) => {
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
          ) : null}
        </Suspense>
      </section>
    </>
  );
};

export default ListZakat;
