import { deleteUserRequestStatus, readUser } from "@/api/apiService";
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

  const onClickSubmit = () => {
    // 수락하면 서로 파트너로 등록되고, 각자의 정보 업데이트 + invalidate Query
  };

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
