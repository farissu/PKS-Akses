import React, { useState } from "react";

function CategoryFaq({ category_faqs }: any) {
  return (
    <div>
      {category_faqs.map((item: any) => {
        return (
          <button
            type="button"
            className="text-left border w-full p-2 text-black flex items-center"
          >
            {item.name}
          </button>
        );
      })}
      {/* <button
        type="button"
        className="text-left border w-full p-2 text-black flex items-center"
      >
        <AntIcon.AiOutlineQuestionCircle className="h-6 w-6 mx-4 my-2" />
        Umum
      </button>
      <button
        type="button"
        className="text-left border w-full p-2 text-black flex items-center"
      >
        <AntIcon.AiOutlineHeart className="h-6 w-6 mx-4 my-2" />
        Donasi
      </button>
      <button
        type="button"
        className="text-left border w-full p-2 text-black flex items-center"
      >
        <AntIcon.AiOutlineInbox className="h-6 w-6 mx-4 my-2" />
        Program
      </button> */}
    </div>
  );
}
