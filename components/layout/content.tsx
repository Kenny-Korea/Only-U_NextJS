import { PageReducerSelector } from "@/state/reducers/pageReducer";
import React from "react";
import { useSelector } from "react-redux";

type ContentProp = {
  children: React.ReactNode;
};

const Content = (props: ContentProp) => {
  const navbar = useSelector(
    (state: PageReducerSelector) => state.pageReducer.navbar
  );
  return (
    <>
      {/* -8rem으로 고정하는게 아니라, 동적인 값을 주게 되면 navbar가 hide 되었을 때 컨텐츠가 더 넓은 영역을 차지하게 되어 채팅 시, 자판 위에 빈 영역이 생기는 것을 막을 수 있음 */}
      <div
        className={`w-full overflow-y-scroll flex justify-center bg-backgroundColor ${
          navbar ? "h-[calc(100vh-8rem)]" : "h-[calc(100vh-4rem)]"
        }`}
      >
        <main className="w-5/6 flex flex-col items-center rounded-2xl z-10">
          {props.children}
        </main>
      </div>
    </>
  );
};

export default Content;
