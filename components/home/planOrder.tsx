import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const PlanOrder = () => {
  return (
    <>
      <div className="flex flex-col justify-between">
        <KeyboardArrowUpRoundedIcon style={{ fontSize: "1.2rem" }} />
        <KeyboardArrowDownRoundedIcon style={{ fontSize: "1.2rem" }} />
      </div>
    </>
  );
};

export default PlanOrder;
