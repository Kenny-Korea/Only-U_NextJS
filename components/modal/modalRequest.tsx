import {
  deleteUserRequestStatus,
  readUser,
  updateUserRequestStatus,
} from "@/api/apiService";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect, useState } from "react";
import ModalLayout from "./layout";

const ModalRequest = (props: any) => {
  const { modal, setModal, requestFrom } = props;
  const user = useUserInfo();
  const [requestInfo, setRequestInfo] = useState<string[]>([]);

  useEffect(() => {
    readUser(requestFrom)
      .then((doc) => {
        setRequestInfo([doc?.username, doc?.email]);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  const onClickSubmit = () => {};

  const onClickCancel = () => {
    if (user && user.uid) {
      deleteUserRequestStatus(user.uid);
      setModal(false);
    }
  };

  return (
    <ModalLayout
      modal={modal}
      onClickSubmit={onClickSubmit}
      onClickCancel={onClickCancel}
    >
      Partner Request
      <div className="w-full h-full p-2 gap-2 centerItemCol">
        <span className="font-bold text-mainColor">
          {requestInfo[0]} ( {requestInfo[1]} )
        </span>
        <span className="text-sm">
          requested you to be a partner. Will you accept this request?
        </span>
      </div>
    </ModalLayout>
  );
};

export default ModalRequest;
