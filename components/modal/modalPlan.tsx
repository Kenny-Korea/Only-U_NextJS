import { useRef, useState } from "react";
import { ItemArg, ModalProps, PlanArg } from "@/types";
import { useDispatch } from "react-redux";
import ModalLayout from "./layout";
import { MissingValueErrorMessage } from "@/utils/missingValueError";
import { useUserInfo } from "@/hooks/useUserInfo";
import { usePostMutation } from "@/hooks/usePostMutation";
import { CreateItemArg } from "@/api/apiService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalPlan = (props: ModalProps) => {
  const { modal, setModal } = props;
  const today = Number(new Date());
  const [selectedDate, setSelectedDate] = useState<number>(today);
  const [missingValueError, setMissingValueError] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { mutate } = usePostMutation();
  const user = useUserInfo();

  const onClickSubmit = () => {
    // 1. 예외 처리
    if (!titleRef.current?.value) {
      setMissingValueError(true);
      return;
    }
    dispatch({ type: "UPLOADING_STARTS" });

    // 2. data 정의
    const data: ItemArg<PlanArg> = {
      id: null,
      title: titleRef.current?.value,
      writer: "kenny",
      regdate: null,
      plandate: selectedDate,
    };

    // 3. createItem 함수에 전달할 variables
    const variables: CreateItemArg = {
      type: "plans",
      data,
      docPath: user?.combinedId,
      setModal,
    };

    // 4. mutate 함수 호출
    mutate(variables);
  };

  const onClickCancel = () => {
    setModal(false);
  };

  const toggleNavbar = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };

  return (
    <ModalLayout
      modal={modal}
      onClickSubmit={onClickSubmit}
      onClickCancel={onClickCancel}
    >
      <button
        onClick={() => {
          console.log(selectedDate);
        }}
      >
        date?!
      </button>
      <span className="w-full h-6 text-textBlack text-md flex justify-center items-center">
        디데이 작성
      </span>
      <ul className="flex flex-col gap-4 text-sm">
        <li>
          <span className="px-1">제목</span>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="loginInput"
            onFocus={toggleNavbar}
            onBlur={toggleNavbar}
            ref={titleRef}
          />
        </li>
        <li>
          <span className="px-1">날짜</span>
          <DatePicker
            selected={new Date(selectedDate)}
            onChange={(date: Date) => {
              setSelectedDate(Number(date));
            }}
            // 한글이면 yyyy-MM-dd 영문이면 MM-dd-yyyy로 표시하기
            dateFormat="yyyy-MM-dd"
          />
        </li>
      </ul>
      <div id="dycalendar"></div>
      {missingValueError && <MissingValueErrorMessage />}
    </ModalLayout>
  );
};

export default ModalPlan;
