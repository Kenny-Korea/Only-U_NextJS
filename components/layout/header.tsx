import React, { useContext, useEffect, useMemo, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"; //이거 그 web dev simplified에서 구현한걸로 변경하기
import onlyU from "../../Images/OnlyU-64.png";
import { store } from "@/state/store";
import { useSelector } from "react-redux";
// import ModalSettings from "../Modal/ModalSettings";
// import { AuthContext } from "../../Context/AuthContext";
// import { currentPageState, hidingFooterState } from "../../atoms";

const Header = () => {
  // const { currentUser } = useContext(AuthContext); - redux로 관리
  const [settings, setSettings] = useState(false);
  const headerTitle = useSelector((state) => state.currentPage);

  const onClickSettings = () => {
    setSettings(!settings);
  };

  return (
    <>
      <div className="w-screen h-16 text-brightRed flex justify-between items-end px-5 py-2 relative">
        <div className="roundDecoration" />
        <div className="px-3 text-white font-bold text-xl rounded-full border-2 border-white z-10">
          {headerTitle}
        </div>
      </div>
    </>
  );
};

export default Header;
