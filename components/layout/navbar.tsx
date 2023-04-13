import { useEffect } from "react";
import Link from "next/link";
import { navbarItems } from "@/utils/navbarItems";
import { useSelector } from "react-redux";
import { PageReducerSelector } from "@/state/reducers/pageReducer";

const menu = ["Home", "Post", "Chat", "Place", "Gift"];

const Navbar = () => {
  const currentPage = useSelector(
    (state: PageReducerSelector) => state.pageReducer.currentPage
  );
  const showNavbar = useSelector(
    (state: PageReducerSelector) => state.pageReducer.navbar
  );

  useEffect(() => {
    // TODO. DOM 객체를 직접 조작하지 않는 방법으로 Navbar css를 구성하는 방법으로 전환 필요
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
      <div className={`${showNavbar ? "navigation showNavbar" : "hideNavbar"}`}>
        <ul>
          {navbarItems.map((item) => (
            <li className="list active" key={item.name}>
              <Link href={item.path}>
                <span className="icon">{<item.icon />}</span>
              </Link>
            </li>
          ))}
          <div className="indicator" />
        </ul>
      </div>
    </>
  );
};

export default Navbar;
