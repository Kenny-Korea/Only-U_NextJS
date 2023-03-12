import React from "react";

type ContentProp = {
  children: React.ReactNode;
};

const Content = (props: ContentProp) => {
  return (
    <>
      <div className="w-full h-[calc(100vh-8rem)] overflow-y-scroll bg-yellow-200 flex justify-center">
        <main className="w-5/6 flex flex-col items-center rounded-2xl z-10">
          {props.children}
        </main>
      </div>
    </>
  );
};

export default Content;
