import { AuthState } from "@/state/reducers/authReducer";
import { ItemProps, ChatData } from "@/types";
import { useSelector } from "react-redux";

const ChatItem = (props: ItemProps<ChatData>) => {
  const { item } = props;
  const userUid = useSelector((state: AuthState) => state.authReducer.userUid);

  const messageWrapper = "h-auto p-2 flex gap-1 mx-2";
  const messageItem = "p-2 text-xs";

  return (
    <>
      <div
        className={
          item.writer === userUid
            ? `${messageWrapper} justify-end`
            : `${messageWrapper} justify-end flex-row-reverse`
        }
      >
        <div className="text-xs text-gray-400 flex justify-end items-end mr-1">
          {item.regdate}:{/* {item.regdate.toDate().getMinutes()} */}
        </div>
        <p
          style={{ maxWidth: "70%" }}
          className={
            item.writer === userUid
              ? `${messageItem} bg-blue-200 rounded-tl-xl rounded-bl-xl rounded-br-xl`
              : `${messageItem} bg-gray-200 rounded-tr-xl rounded-bl-xl rounded-br-xl`
          }
        >
          {item.content}
        </p>
      </div>
    </>
  );
};

export default ChatItem;
