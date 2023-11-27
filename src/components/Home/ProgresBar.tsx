import React from "react";

const ProgresBar = ({ progress, target, colorPrimary }: any) => {
  progress = progress?.replace(/\.|Rp/g, "", "");
  target = target?.replace(/\.|Rp/g, "", "");
  let percent = 0;
  if (progress != 0 && target != 0) {
    percent = (progress / target) * 100;
  }

  return (
    <div className="w-full bg-gray-200 h-2 rounded-3xl">
      <div
        className={` bg-[#${colorPrimary}] h-2 rounded-3xl`}
        style={{ width: percent <= 100 ? `${percent}%` : "100%", backgroundColor: colorPrimary }}
      />

    </div>
  );
};
export default ProgresBar;
