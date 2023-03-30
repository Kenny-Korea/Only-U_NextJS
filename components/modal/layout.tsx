import { ModalLayoutProps } from "@/types";

const ModalLayout = (props: ModalLayoutProps) => {
  const { children, modal, onClickSubmit, onClickCancel } = props;

  return (
    <>
      <>
        {/* 검정 배경 */}
        {modal && (
          <div
            id={modal ? "fadeIn" : "fadeOut"}
            className="w-screen h-screen fixed top-0 left-0 z-10 overflow-y-scroll"
          />
        )}
        {/* 흰색 레이아웃 */}
        <div
          id={modal ? "addPostSlideIn" : "addPostSlideOut"}
          className="w-full h-[120vh] fixed left-0 z-20 pt-0 bg-scroll"
        >
          {/* 내부 컨텐츠 */}
          <div className="rounded-xl overflow-hidden shadow-md m-4 p-3 bg-backgroundColor overflow-y-scroll">
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
      </>
    </>
  );
};

export default ModalLayout;
