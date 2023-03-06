import React, { useEffect } from "react";

// import MenuButton from "../Buttons/MenuButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
// import "./navbar.module.css";
// import { useRecoilState } from "recoil";
// import { hidingNavbarState } from "../../atoms";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () =>
  // { currentPage }
  {
    // const [hideNavbar, setHideNavbar] = useRecoilState(hidingNavbarState);
    const hideNavbar = false;
    const currentPage = "temporary";

    const menu = ["Home", "Post", "Chat", "Place", "Gift"];
    useEffect(() => {
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
        <div className="Navbar">
          <div
            className={`w-full bg-bgColor rounded-tr-lg rounded-tl-lg z-50 
        ${hideNavbar ? "hidden" : "centerItem"}
        `}
          >
            <div className="navigation">
              <ul>
                <li className="list active">
                  <Link href="/">
                    <span className="icon">
                      <HomeRoundedIcon />
                    </span>
                    <span className="text">Home</span>
                  </Link>
                </li>
                <li className="list">
                  <Link href="/post">
                    <span className="icon">
                      <PhotoRoundedIcon />
                    </span>
                    <span className="text">Post</span>
                  </Link>
                </li>
                <li className="list">
                  <Link href="/chat">
                    <span className="icon">
                      <ChatBubbleOutlineRoundedIcon />
                    </span>
                    <span className="text">Chat</span>
                  </Link>
                </li>
                <li className="list">
                  <Link href="/place">
                    <span className="icon">
                      <PlaceRoundedIcon />
                    </span>
                    <span className="text">Place</span>
                  </Link>
                </li>
                <li className="list">
                  <Link href="/gift">
                    <span className="icon">
                      <CardGiftcardRoundedIcon />
                    </span>
                    <span className="text">Gift</span>
                  </Link>
                </li>
                <div className="indicator"></div>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

export default Navbar;
