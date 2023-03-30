import React, { useRef } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendIcon from "@mui/icons-material/Send";
import { useUserInfo } from "@/hooks/useUserInfo";
import { ChatArg, ChatVariables, ItemArg } from "@/types";
import { useSelector } from "react-redux";
import { AuthState } from "@/state/reducers/authReducer";
import { useMutation, useQueryClient } from "react-query";
import { createItem } from "@/api/apiService";
import { useDispatch } from "react-redux";

const ChatInput = () => {
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = useUserInfo();
  const userUid = useSelector((state: AuthState) => state.authReducer.userUid);

  const { mutate } = useMutation(
    (variables: any) => {
      return createItem(variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("chats");
      },
    }
  );

  const onClickSubmit = async () => {
    // 예외 처리
    if (!chatInputRef.current?.value || chatInputRef.current.value === "")
      return;

    const data: ItemArg<ChatArg> = {
      id: null,
      content: chatInputRef.current.value,
      writer: userUid,
      regdate: null,
    };

    const variables: ChatVariables = {
      type: "chats",
      data,
      docPath: user?.combinedId,
    };

    // mutation 객체에 데이터 전달
    chatInputRef.current.value = "";
    chatInputRef.current.focus();
    mutate(variables);
  };

  const hideNavbar = () => {
    dispatch({ type: "HIDE_NAVBAR" });
  };

  return (
    <>
      <div className={`w-screen min-h-[3.5rem] h-14 centerItem`}>
        <div className="w-full h-8 mx-2 flex justify-between rounded-full">
          <div className="w-[calc(100%-2.5rem)] flex">
            <div className="w-8 h-full bg-white centerItem rounded-tl-full rounded-bl-full">
              <div className="w-6 h-6 bg-mainColor rounded-full centerItem">
                <AddRoundedIcon
                  style={{ fontSize: "1.2rem", color: "white" }}
                />
              </div>
            </div>
            <textarea
              cols={30}
              rows={3}
              className="w-[calc(100%-4rem)] h-8 px-2 pt-[6px] bg-white resize-none outline-none text-sm"
              ref={chatInputRef}
              placeholder="Message"
              onFocus={hideNavbar}
            />
            <div className="w-8 h-full bg-white centerItem rounded-tr-full rounded-br-full">
              <input type="file" id="file" className="w-10 hidden" />
              <label htmlFor="file">
                <AttachFileRoundedIcon style={{ fontSize: "1.2rem" }} />
              </label>
            </div>
          </div>
          <button
            className="w-8 h-full bg-mainColor text-white rounded-full centerItem"
            onClick={onClickSubmit}
          >
            <SendIcon style={{ width: 16 }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
