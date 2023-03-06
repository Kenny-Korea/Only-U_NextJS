import React from "react";

const DdayDetail = ({ Dday }) => {
  return (
    <>
      <div className="w-32 flex flex-col gap-1 ellipsis">
        <span className="text-bold text-sm">{Dday.title}</span>
        <span className="text-xs">
          {new Intl.DateTimeFormat("ko-KR").format(Dday.Dday.seconds * 1000)}
        </span>
      </div>
    </>
  );
};

export default DdayDetail;
