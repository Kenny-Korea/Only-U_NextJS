import { ModalLayoutPropsType } from "@/types";

const ModalLayout = (props: ModalLayoutPropsType) => {
  const { children, modal, onClickSubmit, onClickCancel } = props;

  return (
    <>
      <>
        {/* 외부 레이아웃 */}
        {modal && (
          <div
            id={modal ? "fadeIn" : "fadeOut"}
            className="w-screen h-screen fixed top-0 left-0 z-10"
          />
        )}
        <div
          className="w-full h-screen fixed left-0 pt-12 itemCenter z-10"
          id={modal ? "addPostSlideIn" : "addPostSlideOut"}
        >
          {/* 내부 컨텐츠 */}
          <div className="rounded-xl overflow-hidden shadow-md m-4 p-3 bg-bgColor overflow-y-scroll">
            <div className="flex flex-col gap-2">{children}</div>
            <div className="flex justify-between gap-4 mx-3 my-2">
              <button
                className="w-1/2 h-8 bg-mainColor text-white rounded-md"
                onClick={onClickSubmit}
              >
                {true ? "저장" : "등록"}
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
