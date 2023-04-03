import { useRef, useState } from "react";
import ModalLayout from "./layout";
import DatePicker from "react-datepicker";
import { toFullDate } from "@/utils/dateFormat";
import { MissingValueErrorMessage } from "@/utils/missingValueError";

const ModalProfile = (props: any) => {
  const { modal, setModal } = props;
  const today = Number(new Date());
  const [selectedDate, setSelectedDate] = useState<number>(today);
  const [missingValueError, setMissingValueError] = useState<boolean>(false);

  const profileNameRef = useRef<HTMLInputElement>(null);
  const onClickSubmit = () => {
    if (!profileNameRef.current || profileNameRef.current.value === "") {
      setMissingValueError(true);
      return;
    }
    localStorage.setItem("profileName", profileNameRef.current.value);
    localStorage.setItem("startDate", toFullDate(selectedDate).toString());
    setModal(false);
  };

  const onClickCancel = () => {
    setModal(false);
  };

  return (
    <ModalLayout
      modal={modal}
      onClickSubmit={onClickSubmit}
      onClickCancel={onClickCancel}
    >
      프로필 수정
      <ul className="flex flex-col gap-4 text-sm mb-4">
        <li className="flex flex-col">
          <span>프로필</span>
          <input
            className="loginInput"
            type="text"
            placeholder=""
            ref={profileNameRef}
          />
        </li>
        <li className="flex flex-col">
          <span>시작일</span>
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
      {missingValueError && <MissingValueErrorMessage />}
    </ModalLayout>
  );
};

export default ModalProfile;
