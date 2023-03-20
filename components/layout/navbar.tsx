import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { navbarItems } from "@/utils/navbarItems";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { PageReducerSelector } from "@/state/reducers/pageReducer";

const Navbar = () => {
  const currentPage = useSelector(
    (state: PageReducerSelector) => state.pageReducer.currentPage
  );
  const showNavbar = useSelector(
    (state: PageReducerSelector) => state.pageReducer.navbar
  );
  const router = useRouter();
  const onClickBackButton = (path: string) => {
    router.push(path);
    // router.push(path);
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
              // onClick={() => {
              //   onClickBackButton(item.path);
              // }}
            >
              <Link href={item.path}>
                <span className="icon">{<item.icon />}</span>
                <span className="text">{item.name}</span>
              </Link>
            </li>
          ))}
          <div className="indicator"></div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
