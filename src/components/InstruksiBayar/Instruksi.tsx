import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";

function Instruksi({ instruksi_bayar }: any) {
    const [caraBayar, setCaraBayar] = useState(Array(instruksi_bayar.length).fill(false));

    const toggleCaraBayar = (index:  number) => {
      const newArray = [...caraBayar];
      newArray[index] = !newArray[index];
      setCaraBayar(newArray);
    };
  return (
    <>
      {instruksi_bayar.map((item : any, index : any) => {
        
        return (
            <div className="p-2">
            <button className="w-full" onClick={() => toggleCaraBayar(index)}>
              <div
                className={`p-4 flex border bg-white justify-between items-center ${
                  caraBayar[index] ? "rounded-t" : "drop-shadow-md rounded"
                }`}
              >
                <div>
                  <p className="text-sm">{item.title}</p>
                </div>
                <div className="text-gray-500">
                  {caraBayar[index] ? (
                    <IoChevronForward className="w-5 h-5 rotate-90" />
                  ) : (
                    <IoChevronForward className="w-5 h-5" />
                  )}
                </div>
              </div>
            </button>
            <div className={`${caraBayar[index] ? "" : "hidden"} `}>
              <div
                className="w-full border-x border-b text-sm px-8 py-2"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Instruksi;
