import React from "react";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlanItem from "../card/plan/planItem";

type Test = {
  id: number;
  title: string;
  date: number;
};

const Plan = () => {
  const test: Array<Test | null> = [
    { id: 1, title: "test", date: 1 },
    { id: 2, title: "test2", date: 1 },
  ];
  return (
    <>
      <div className="min-w-full min-h-[40vh] h-[60vh] flex flex-col gap-2 pt-2">
        <div className="apartItem bg-mainColor pl-3 pr-1 h-8 text-lg text-white bg-main rounded-full">
          <div className="flex items-center gap-2 font-bold">
            <CalendarTodayRoundedIcon style={{ fontSize: "1.2rem" }} />
            Plan
          </div>
          <div className="w-6 h-6 bg-white text-mainColor rounded-full centerItem">
            <AddRoundedIcon
            // onClick={() => {
            //   setAddDday(!addDday);
            // }}
            />
          </div>
        </div>
        <div className="w-full h-4/5 overflow-y-scroll">
          <div className="w-full h-fit flex flex-col gap-2">
            <hr />
            {test.map((item) => {
              if (item) return <PlanItem item={item} key={item.id} />;
            })}
            {test.length === 0 && "Add new plan!"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
