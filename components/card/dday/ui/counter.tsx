import React from "react";

const DdayCounter = ({ Dday }) => {
  const savedDate = Dday.Dday.seconds * 1000;
  const today = new Date().getTime();
  const gap = savedDate - today;
  const dateGap = Math.ceil(new Date(gap).getTime() / 1000 / 60 / 60 / 24);
  const calculateDday = () => {
    if (dateGap < 0) return "D + " + Math.abs(dateGap);
    if (dateGap > 0) return "D - " + Math.abs(dateGap);
    return "D-Day";
  };
  return (
    <>
      <div className="text-2xl centerItem">
        <span className="text-main font-bold">{calculateDday()}</span>
      </div>
    </>
  );
};

export default DdayCounter;
