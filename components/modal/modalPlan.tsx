import { ItemArg, ModalProps, PlanArg } from "@/types";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ModalLayout from "./layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "react-query";
import { createItem } from "@/api/apiService";
import { MissingValueErrorMessage } from "@/utils/missingValueError";

const ModalPlan = (props: ModalProps) => {
  const { modal, setModal } = props;
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [missingValueError, setMissingValueError] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  //* useMutation
  const mutation = useMutation(
    (data: ItemArg<PlanArg>) => {
      return createItem("plans", data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getPlans");
        dispatch({ type: "UPLOADING_DONE" });
        setModal(false);
      },
      onError: () => {
        alert("Failed to upload posts. Please try again");
        dispatch({ type: "UPLOADING_DONE" });
        setModal(false);
      },
    }
  );

  const onClickSubmit = () => {
    // 예외 처리
    if (!titleRef.current?.value) {
      setMissingValueError(true);
      return;
    }

    dispatch({ type: "UPLOADING_STARTS" });
    const data: ItemArg<PlanArg> = {
      id: null,
      title: titleRef.current?.value,
      writer: "kenny",
      regdate: null,
      plandate: selectedDate,
    };
    // mutation 객체에 데이터 전달
    mutation.mutate(data);
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
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
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
