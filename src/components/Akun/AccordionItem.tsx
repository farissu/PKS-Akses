import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function AccordionItem({ item }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" ">
      <div
        className=""
        onClick={toggleAccordion}
      >
        <div id="heade" className="border py-2 px-2 flex items-center justify-between">
          <h2 className="text-md font-semibold bg-white text-sm">{item.question}</h2>

          {isOpen ? <Icon icon="mdi:chevron-up" /> : <Icon icon="mdi:chevron-down" />}
        </div>
      </div>
      <div className={`${isOpen ? '' : 'hidden'} px-4 py-2 bg-gray-100`}>
        <p className="text-gray-700">{item.answer}</p>
      </div>
    </div>
  );
};
export default AccordionItem;