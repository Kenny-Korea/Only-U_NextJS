import ChatInput from "@/components/card/chat/chatInput";
import ChatItem from "@/components/card/chat/chatItem";
import { useItemData } from "@/hooks/useItemData";
import { usePath } from "@/hooks/usePath";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const Chat = () => {
  usePath("Chat");
  const dispatch = useDispatch();
  const { data, isLoading, error } = useItemData("chats");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;
  const showNavbar = () => {
    dispatch({ type: "SHOW_NAVBAR" });
  };

  return (
    <>
      <div className="w-full h-full">
        <div
          className="w-full h-[calc(100%-3.5rem)] overflow-y-scroll"
          onClick={showNavbar}
        >
          {data?.map((item) => (
            <ChatItem item={item} />
          ))}
          {!data && (
            <p className="w-full text-center">
              Start a new chat with your partner!
            </p>
          )}
        </div>

        <ChatInput />
      </div>
    </>
  );
};

export default Chat;
