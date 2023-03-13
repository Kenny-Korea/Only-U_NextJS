import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useDispatch } from "react-redux";

type CreateNewItemButtonProps = {
  path: string;
};

const CreateNewItemButton = (props: CreateNewItemButtonProps) => {
  const { path } = props;
  const dispatch = useDispatch();
  const handleClickButton = () => {
    switch (path) {
      case "Post":
        dispatch({ type: "" });
      // modal의 상태를 단순히 boolean 값으로만 주게 되면, 작성하다가 뒤로 가기를 누르는 경우, modal이 계속 true로 남아있을 수 있으므로 다시 생각을 해봐야겠다...
      // modal이 열리고 닫히는 상태를 굳이 전역 관리할 필요가 있을까?
    }
  };
  return (
    <>
      <div
        className="w-12 h-12 fixed bottom-24 right-6 bg-white shadow-addButton text-black text-4xl flex justify-center items-center rounded-full z-50 hover:font-bold hover:text-5xl"
        onClick={handleClickButton}
      >
        <AddRoundedIcon style={{ fontSize: "2rem" }} />
      </div>
    </>
  );
};

export default CreateNewItemButton;
