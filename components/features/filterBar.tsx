import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TableRowsIcon from "@mui/icons-material/TableRows";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";

export type FilterBarProps = {
  type: "post" | "place";
  state: "flex" | "grid";
  setState: React.Dispatch<React.SetStateAction<"flex" | "grid">>;
};

const FilterBar = (props: FilterBarProps) => {
  const { type, state, setState } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();
  const toggleNavbar = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const removeInputValue = () => {
    setInputValue("");
  };

  const onClickFlexView = () => {
    // 불필요한 state 변화에 의한 렌더링을 막기 위한 early return
    if (state === "flex") return;
    const mode = localStorage.getItem(type + "View");
    if (mode === "flex") return;
    localStorage.setItem(type + "View", "flex");
    setState("flex");
  };

  const onClickGridView = () => {
    // 불필요한 state 변화에 의한 렌더링을 막기 위한 early return
    if (state === "grid") return;
    const mode = localStorage.getItem(type + "View");
    if (mode === "grid") return;
    localStorage.setItem(type + "View", "grid");
    setState("grid");
  };

  return (
    <div className="w-full flex gap-2 my-3 sticky top-3 z-20">
      <div className="w-full h-10 bg-white border p-2 rounded-md shadow-md">
        <div className="w-full centerItem relative">
          <input
            type="text"
            className="w-full bg-slate-100 rounded-full text-xs px-3 py-1 outline-none shadow-inner"
            placeholder="아직 필터링 기능 적용 안됨"
            onFocus={toggleNavbar}
            onBlur={toggleNavbar}
            value={inputValue}
            onChange={onChangeInput}
          />
          {inputValue !== "" && (
            <HighlightOffIcon
              onClick={removeInputValue}
              style={{
                position: "absolute",
                top: "calc(50% - 8px)",
                right: 5,
                fontSize: "16px",
                color: "gray",
              }}
            />
          )}
        </div>
      </div>
      <div className="min-w-min w-28 flex justify-center items-center bg-white rounded-md">
        <div
          className={`flexGridButton ${
            state === "flex"
              ? "text-mainColor shadow-md"
              : "text-gray-400 shadow-inner"
          }`}
        >
          <TableRowsIcon onClick={onClickFlexView} className="text-lg" />
        </div>
        <div
          className={`flexGridButton ${
            state === "grid"
              ? "text-mainColor shadow-md"
              : "text-gray-400 shadow-inner"
          }`}
        >
          <GridViewSharpIcon onClick={onClickGridView} className="text-lg" />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
