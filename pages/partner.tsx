import { readPartner, updateUserRegNum } from "@/api/apiService";
import ModalPartner from "@/components/modal/modalPartner";
import { usePath } from "@/hooks/usePath";
import { useUserInfo } from "@/hooks/useUserInfo";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useEffect, useRef, useState } from "react";

const partner = () => {
  usePath("Partner");
  const [modal, setModal] = useState(false);
  const [regNum, setRegNum] = useState(0);
  const [copiedAlarm, setCopiedAlarm] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState({});

  const regNumRef = useRef<HTMLDivElement>(null);
  const partnerRegNumRef = useRef<HTMLInputElement>(null);
  const user = useUserInfo();

  useEffect(() => {
    if (!user) return;
    const newRegNum = Math.floor(Math.random() * 899999) + 100000;
    setRegNum(newRegNum);
    console.log(user);
    const variables = {
      userUid: user.uid,
      regNum: newRegNum,
    };
    updateUserRegNum(variables);
  }, [user]);

  const onClickCopy = () => {
    if (copiedAlarm) return;
    if (regNumRef.current?.textContent) {
      window.navigator.clipboard
        .writeText(regNumRef.current.textContent)
        .then(() => {
          setCopiedAlarm(true);
        });
    }
  };

  const onClickSubmit = async () => {
    if (!partnerRegNumRef.current?.value) return;
    const partnerRegNum = parseInt(partnerRegNumRef.current.value);
    if (!partnerRegNum) return;
    const result = await readPartner(partnerRegNum);
    if (result) {
      setPartnerInfo(() => {
        return result;
      });
      setModal(true);
    }
  };

  if (copiedAlarm) {
    setTimeout(() => {
      setCopiedAlarm(false);
    }, 500);
  }

  const modalPartnerProps = {
    modal: modal,
    setModal: setModal,
    partnerInfo: partnerInfo,
  };

  return (
    <>
      <div className="w-full mt-3 centerItemCol gap-3 p-2 rounded-xl shadow-md bg-white">
        <div
          className="w-full h-14 centerItem rounded-md border-4 border-mainColor text-mainColor font-bold text-2xl tracking-widest relative"
          ref={regNumRef}
        >
          {regNum}
          <ContentCopyRoundedIcon
            className="w-6 h-6 absolute top-3 right-2 text-gray-400 text-sm"
            onClick={onClickCopy}
          />
        </div>
        <div className="text-xs text-center text-textBlack font-bold">
          <p>Share this reg number to your partner</p>
          <p className="hr-sect">or</p>
          <p>Enter your partner's reg number down below</p>
        </div>
        <input
          type="text"
          placeholder="Enter your partner's reg number"
          className="loginInput text-center"
          ref={partnerRegNumRef}
        />
        <div className="submitButton" onClick={onClickSubmit}>
          Submit
        </div>
        {copiedAlarm && <div className="copiedAlarm">Copied!</div>}
      </div>
      {modal && <ModalPartner {...modalPartnerProps} />}
    </>
  );
};

export default partner;
