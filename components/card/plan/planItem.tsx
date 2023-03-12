import { useMemo, useState } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PlanOrder from "@/components/home/planOrder";
import ItemModificationButton from "@/components/features/modifyItem";
// import ArrowBar from "./ui/arrow";

type PlanItemProps = {
  item: {
    id: number;
    title: string;
    date: number;
  };
};

const PlanItem = (props: PlanItemProps) => {
  const dateGap = useMemo(() => {
    const savedDate = props.item.date * 1000;
    // const savedDate = props.item.date.seconds * 1000;
    const today = new Date().getTime();
    const gap = savedDate - today;
    return Math.ceil(new Date(gap).getTime() / 1000 / 60 / 60 / 24);
  }, [props.item]);

  const [editClicked, setEditClicked] = useState(false);

  const onClickEdit = () => {
    setEditClicked(!editClicked);
  };

  const calculateDday = () => {
    // if (dateGap < 0) return "D + " + Math.abs(dateGap);
    // if (dateGap > 0) return "D - " + Math.abs(dateGap);
    return "D-Day";
  };

  // if (!props.item) return "새로운 디데이를 설정해보세요";

  return (
    <>
      <hr className="border-0 h-[1px] bg-main flex" />
      <div className="flex items-center justify-between">
        <PlanOrder />
        <div className="mx-5 w-full flex justify-between">
          <div className="w-32 flex flex-col gap-1 ellipsis">
            <span className="text-bold text-sm">{props.item.title}</span>
            <span className="text-xs">
              {new Intl.DateTimeFormat("ko-KR").format(
                props.item.date * 1000
                // Dday.Dday.seconds * 1000
              )}
            </span>
          </div>
          <div className="text-2xl centerItem">
            <span className="text-subColor">{calculateDday()}</span>
          </div>
        </div>
        <ItemModificationButton
          item={props.item}
          docName="plan"
          // key={props.item.id}
        />
        {/* <ModifyButton item={props.title} docName="Ddays" /> */}
      </div>
    </>
  );
};

export default PlanItem;
