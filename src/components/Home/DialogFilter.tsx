import React from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

export default function Modal({ onClose, category, sortItemsByCategory }: any) {
  return (
    <div className="justify-center items-center flex max-w-md w-full overflow-x-hidden h-full overflow-y-auto bg-black/30 fixed bottom-0 z-50 ml-[-16px] outline-none focus:outline-none">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed max-w-md w-full bottom-0"
      >
        <div className="border rounded-t-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-start p-4 border-b border-solid border-slate-200 gap-2">
            <button onClick={onClose}>
              <IoClose className="w-5 h-5 font-bold" />
            </button>
            <h3 className="text-base font-semibold">Filter</h3>
          </div>
          {/*body*/}
          <div className="relative px-6 pt-3 pb-6 flex-auto overflow-scroll">
            {category.map((item: any) => {
              return (
                <button key={item.name} onClick={() => { sortItemsByCategory(item); onClose(); }} className="w-full h-12 flex items-center border-b">
                  <p>{item?.name || item}</p>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
