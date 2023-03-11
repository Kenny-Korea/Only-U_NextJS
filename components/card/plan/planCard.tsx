import React, { useState } from "react";
import ModifyButton from "../Buttons/ModifyButton";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ArrowBar from "./ui/arrow";
import DdayCounter from "./ui/counter";
import DdayDetail from "./ui/detail";

const DdayCard = ({ Dday, index }) => {
  const [editClicked, setEditClicked] = useState(false);

  const onClickEdit = () => {
    setEditClicked(!editClicked);
  };

  if (!Dday) return "새로운 디데이를 설정해보세요";

  return (
    <>
      <hr className="border-0 h-[1px] bg-main flex" />
      <div className="flex items-center justify-between">
        <ArrowBar />
        <div className="mx-5 w-full flex justify-between">
          <DdayDetail />
          <DdayCounter />
        </div>
        <ModifyButton item={Dday} docName="Ddays" />
      </div>
    </>
  );
};

export default DdayCard;
