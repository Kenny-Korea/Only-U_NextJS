import React, { useEffect, useMemo } from "react";

// import MenuButton from "../Buttons/MenuButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
// import { useRecoilState } from "recoil";
// import { hidingNavbarState } from "../../atoms";
import Link from "next/link";
import { navbarItems } from "@/utils/navbarItems";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const hideNavbar = useMemo(() => {
    return false;
  }, []);
  const currentPage = useMemo(() => {
    return "temporary";
  }, []);

  const changePath = (path: string) => {
    dispatch({ type: "CHANGE_PATH", payload: path });
  };

  const menu = useMemo(() => {
    return ["Home", "Post", "Chat", "Place", "Gift"];
  }, []);
  useEffect(() => {
    console.log("Navbar useEffect triggered");
    const list = window.document.querySelectorAll(".list");
    list.forEach((item, itemIndex) => {
      if (currentPage === menu[itemIndex]) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }, [currentPage]);

  return (
    <>
      <div className="Navbar fixed bottom-0 right-0">
        <div
          className={`w-full bg-bgColor rounded-tr-lg rounded-tl-lg z-50 
        ${hideNavbar ? "hidden" : "centerItem"}
        `}
        >
          <div className="navigation">
            <ul>
              {navbarItems.map((item) => (
                <li className="list active" key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => {
                      changePath(item.name);
                    }}
                  >
                    <span className="icon">{<item.icon />}</span>
                    <span className="text">{item.name}</span>
                  </Link>
                </li>
              ))}
              <div className="indicator"></div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
