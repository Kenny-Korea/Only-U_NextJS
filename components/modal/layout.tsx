import { PageReducerSelector } from "@/state/reducers/pageReducer";
import { ModalLayoutProps } from "@/types";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ModalLayout = (props: ModalLayoutProps) => {
  const { children, modal, onClickSubmit, onClickCancel } = props;

  const navbar = useSelector(
    (state: PageReducerSelector) => state.pageReducer.navbar
  );

  const heightRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(heightRef.current?.clientHeight);
  }, [heightRef.current]);

  return (
    <>
      {/* 검정 배경 */}
      {modal && (
        <div
          id={modal ? "fadeIn" : "fadeOut"}
          className="w-screen h-screen fixed top-0 left-0 z-10 overflow-y-scroll"
        />
      )}
      {/* 올라오는 레이아웃 */}
      <div
        id={modal ? "addPostSlideIn" : "addPostSlideOut"}
        className="w-full h-screen fixed left-0 top-0 z-20 pt-0 overflow-y-scroll scrollbar-hide"
      >
        {/* 이 친구가 있어야 키보드 올라오면 스크롤 가능 */}
        <div className="w-full">
          {/* 내부 컨텐츠 */}
          <div
            className={`rounded-xl shadow-md m-4 p-3 bg-backgroundColor`}
            ref={heightRef}
          >
            <div className="flex flex-col gap-2">{children}</div>
            <div className="flex justify-between gap-4 mx-3 my-2">
              <button
                className="w-1/2 h-8 bg-mainColor text-white rounded-md font-bold"
                onClick={onClickSubmit}
              >
                {true ? "등록" : "등록"}
              </button>
              <button
                className="w-1/2 h-8 bg-slate-300 rounded-md"
                onClick={onClickCancel}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLayout;
