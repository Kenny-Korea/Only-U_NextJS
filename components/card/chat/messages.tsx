import React, { useState } from "react";
import Message from "./chatItem";
import ChatInput from "../../Components/Inputs/ChatInput";

const Messages = ({ messages, divRef }) => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);

  return (
    <>
      <div
        className={`w-full "h-[calc(100vh-8.5rem)] flex flex-col`}
        // className={`w-full ${
        //   hideFooter ? "h-[calc(100vh-4rem)]" : "h-[calc(100vh-8.5rem)]"
        // } flex flex-col`}
      >
        <div
          ref={divRef}
          className={`w-full h-[calc(100vh-8.5rem)] bg-transparent overflow-y-scroll`}
        >
          {messages?.map((message, index) => {
            return <Message message={message} key={index} />;
          })}
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default Messages;
