import { useState } from "react";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlanItem from "../card/planItem";

const Plan = () => {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  return (
    <>
      <div className="min-w-full min-h-[40vh] h-[60vh] flex flex-col gap-2 pt-2">
        <div className="apartItem bg-mainColor pl-3 pr-1 h-8 text-lg text-white bg-main rounded-full">
          <div className="flex items-center gap-2 font-bold">
            <CalendarTodayRoundedIcon style={{ fontSize: "1.2rem" }} />
            Plan
          </div>
          <div className="w-6 h-6 bg-white text-mainColor rounded-full centerItem">
            <AddRoundedIcon onClick={openModal} />
          </div>
        </div>
        <div className="w-full h-4/5 overflow-y-scroll">
          <div className="w-full h-fit flex flex-col gap-2">
            <hr />
            {items.map((item) => (
              <PlanItem item={item} />
            ))}
            {items.length === 0 && "Add new plan!"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
