import { updateUserRegNum, updateUserRequestStatus } from "@/api/apiService";
import { useUserInfo } from "@/hooks/useUserInfo";
import Image from "next/image";
import { useRouter } from "next/router";
import ModalLayout from "./layout";

const ModalPartner = (props: any) => {
  const { modal, setModal, partnerInfo } = props;
  const user = useUserInfo();
  const router = useRouter();

  const onClickSubmit = () => {
    if (!user) return;
    const variables = {
      userUid: user.uid,
      requestTo: partnerInfo.uid,
    };
    updateUserRequestStatus(variables);
    setModal(false);
    router.replace("/");
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
      User Information
      <div className="w-full h-full p-2 gap-2 centerItemCol">
        <div className="flex gap-2">
          <div className="w-28 h-full centerItem">
            <div className="w-28 h-28 relative">
              <Image
                src={partnerInfo.photoURL}
                alt=""
                fill
                sizes="32"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p>{partnerInfo.username}</p>
            <p>{partnerInfo.email}</p>
          </div>
        </div>
        <p className="text-sm">
          Are you sure to send partner request to this user?
        </p>
      </div>
    </ModalLayout>
  );
};

export default ModalPartner;
