import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { navbarItems } from "@/utils/navbarItems";
import { useSelector } from "react-redux";
import { State } from "@/state/reducers/pageReducer";
import { useRouter } from "next/router";

const Navbar = () => {
  const currentPage = useSelector((state: State) => state.currentPage);
  const showNavbar = useSelector((state: State) => state.navbar);
  const router = useRouter();
  const onClickBackButton = (path: string) => {
    router.replace(path);
  };
  const hideNavbar = useMemo(() => {
    return false;
  }, []);

  const menu = useMemo(() => {
    return ["Home", "Post", "Chat", "Place", "Gift"];
  }, []);
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
      <div className={`${showNavbar ? "navigation" : "hidden"}`}>
        <ul>
          {navbarItems.map((item) => (
            <li
              className="list active"
              key={item.name}
              onClick={() => {
                onClickBackButton(item.path);
              }}
            >
              {/* <Link href={item.path}> */}
              <span className="icon">{<item.icon />}</span>
              <span className="text">{item.name}</span>
              {/* </Link> */}
            </li>
          ))}
          <div className="indicator"></div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
