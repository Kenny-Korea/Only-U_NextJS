import { useMemo } from "react";
import PlanOrder from "@/components/home/planOrder";
import ItemModificationButton from "@/components/features/modifyItem";
import { ItemProps, PlanData } from "@/types";
import { toDate } from "@/utils/dateFormat";

const PlanItem = (props: ItemProps<PlanData>) => {
  const { item } = props;

  const dateGap = useMemo(() => {
    const savedDate = item.plandate;
    const today = new Date().getTime();
    const gap = savedDate - today;
    return Math.ceil(new Date(gap).getTime() / 1000 / 60 / 60 / 24);
  }, [props.item]);

  const calculateDday = () => {
    if (dateGap < 0) return "D + " + Math.abs(dateGap);
    if (dateGap > 0) return "D - " + Math.abs(dateGap);
    return "D-Day";
  };

  const getPlannedDate = useMemo(() => {
    return toDate(item.plandate);
  }, [item]);

  return (
    <>
      <hr className="border-0 h-[1px] bg-main flex" />
      <div className="flex items-center justify-between">
        <PlanOrder />
        <div className="mx-5 w-full flex justify-between">
          <div className="w-32 flex flex-col gap-1 ellipsis">
            <span className="text-bold text-sm">{props.item.title}</span>
            <span className="text-xs">{getPlannedDate}</span>
          </div>
          <div className="text-2xl centerItem">
            <span className="text-subColor">{calculateDday()}</span>
          </div>
        </div>
        <ItemModificationButton
          item={item}
          type="plans"
          // key={props.item.id}
        />
      </div>
    </>
  );
};

export default PlanItem;
