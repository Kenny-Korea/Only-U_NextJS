import React, { useContext, useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"; //이거 그 web dev simplified에서 구현한걸로 변경하기
import onlyU from "../../Images/OnlyU-64.png";
// import ModalSettings from "../Modal/ModalSettings";
// import { AuthContext } from "../../Context/AuthContext";
// import { currentPageState, hidingFooterState } from "../../atoms";

const Header = () => {
  // const { currentUser } = useContext(AuthContext); - redux로 관리
  const [settings, setSettings] = useState(false);
  const [pageName, setPageName] = useState("Home");

  const onClickSettings = () => {
    setSettings(!settings);
  };
  const path = window.location.pathname;
  useEffect(() => {
    switch (path) {
      case "/":
        setPageName("Home");
        break;
      default:
        const text = path.replace("/", "");
        setPageName(text.toLocaleUpperCase());
        break;
    }
  }, [path]);

  return (
    <>
      <div
        className="w-screen h-16 bg-white text-brightRed font-bold text-2xl
        flex justify-between items-end px-5 py-2 relative shadow-sm overflow-x-clip"
      >
        <div className="w-[50rem] h-[50rem] -top-[40rem] left-[calc(100vw/2-25rem)] rounded-full bg-gradient-to-br from-white via-sub to-yellow-200 absolute"></div>
        <div className="px-3 z-10 text-white bg-transparent font-extrabold text-xl rounded-full border-2 border-white">
          {pageName}
        </div>
        {/* {currentUser && (
          <MenuRoundedIcon
            onClick={onClickSettings}
            style={{ zIndex: 1, color: "white", fontSize: "2rem" }}
          />
        )} */}
        {/* <ModalSettings settings={settings} setSettings={setSettings} /> */}
      </div>
    </>
  );
};

export default Header;
