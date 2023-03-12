import React, { useState } from "react";

type ComponentProps = {
  children: React.ReactNode;
};

const ModalLayout = ({ children }: ComponentProps) => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <>
        {modal && (
          <div
            id={modal ? "fadeIn" : "fadeOut"}
            className="w-screen h-screen fixed top-0 left-0 z-10"
          ></div>
        )}
        <div
          className="w-full h-screen fixed left-0 pt-14 itemCenter z-10"
          id={modal ? "addPostSlideIn" : "addPostSlideOut"}
        >
          <div className="rounded-xl overflow-hidden shadow-md m-4 p-3 bg-bgColor overflow-y-scroll">
            <div className="flex flex-col">{children}</div>
          </div>
        </div>
      </>
    </>
  );
};

export default ModalLayout;
