import ChatInput from "@/components/card/chat/chatInput";
import ChatItem from "@/components/card/chat/chatItem";
import { useItemData } from "@/hooks/useItemData";
import { usePath } from "@/hooks/usePath";
import { toDate, toDay, toMonth, toYear } from "@/utils/dateFormat";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const Chat = () => {
  usePath("Chat");
  const dispatch = useDispatch();
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useItemData("chats");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  const scrollToLatestMessage = useCallback(() => {
    if (chatBoxRef && chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
      });
    }
  }, []);

  useEffect(() => {
    scrollToLatestMessage();
  }, [data]);

  const showNavbar = () => {
    dispatch({ type: "SHOW_NAVBAR" });
    scrollToLatestMessage();
  };

  return (
    <>
      <div className="w-full h-full">
        <div
          className="w-full h-[calc(100%-3.5rem)] overflow-y-scroll"
          onClick={showNavbar}
          ref={chatBoxRef}
        >
          {data?.map((item, index) => {
            if (index === data.length - 1)
              return <ChatItem item={item} key={item.regdate} />;
            if (
              toDate(data[index].regdate) !== toDate(data[index + 1].regdate)
            ) {
              console.log("hey");
              return (
                <div className="w-full flex flex-col" key={item.regdate}>
                  <ChatItem item={item} />
                  <div className="w-full flex justify-between text-xs text-gray-500">
                    <hr className="hr" />
                    {toYear(data[index].regdate)}.{toMonth(data[index].regdate)}
                    .{toDate(data[index].regdate)} -{" "}
                    {toDay(data[index].regdate)}
                    <hr className="hr" />
                  </div>
                </div>
              );
            } else {
              return <ChatItem item={item} key={item.regdate} />;
            }
          })}
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
