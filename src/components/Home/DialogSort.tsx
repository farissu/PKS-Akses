import React from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const DialogSort = ({ onClose, sortItemsByCreateDate, sortItemsByMendesak }: any) => {
  const handleButtonMendesak = () => {
    sortItemsByMendesak(true);
    onClose();
  };
  const handleButtonDate = () => {
    sortItemsByCreateDate(true);
    onClose();
  };
  return (
    <div className="justify-center items-center flex max-w-md w-full overflow-x-hidden h-full overflow-y-auto bg-black/30 fixed bottom-0 z-50 ml-[-16px] outline-none focus:outline-none">
      <div className="fixed top-0 w-full max-w-md max-h-[598px] h-full" onClick={onClose} />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed w-full max-w-md bottom-0"
      >
        <div className="border rounded-t-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-start p-4 border-b border-solid border-slate-200 gap-2">
            <button onClick={onClose}>
              <IoClose className="w-5 h-5 font-bold" />
            </button>
            <h3 className="text-base font-semibold">Urutkan</h3>
          </div>
          {/*body*/}
          <div className="relative px-6 pt-3 pb-6 flex-auto">
            <button onClick={handleButtonDate} className="w-full h-12 flex items-center border-b">
              <p>Terbaru</p>
            </button>
            {sortItemsByMendesak ? (<button onClick={handleButtonMendesak} className="w-full h-12 flex items-center border-b">
              <p>Paling Mendesak</p>
            </button>) : (null)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default DialogSort