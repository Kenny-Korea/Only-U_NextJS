import { useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"; //이거 그 web dev simplified에서 구현한걸로 변경하기
import { useSelector } from "react-redux";
import { PageReducerSelector } from "@/state/reducers/pageReducer";
// import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import {
  AuthReducerSelector,
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from "@/state/reducers/authReducer";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ModalSettings from "../modal/modalSettings";
import ModalRequest from "../modal/modalRequest";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const user = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userUid = user?.uid;
      if (userUid) {
        dispatch({ type: AUTH_LOGIN, payload: userUid });
        console.log("User logged in");
      } else {
        dispatch({ type: AUTH_LOGOUT });
        console.log("User logged out");
      }
    });
  }, []);

  const [settingsModal, setSettingsModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestFrom, setRequestFrom] = useState();

  const headerTitle = useSelector(
    (state: PageReducerSelector) => state.pageReducer.currentPage
  );
  const authState = useSelector(
    (state: AuthReducerSelector) => state.authReducer
  );

  // 다른 페이지로 이동하면 모달 닫기
  useEffect(() => {
    if (!settingsModal) return;
    setSettingsModal(false);
  }, [headerTitle]);

  // Partner Request가 있으면 알림 모달 열기
  useEffect(() => {
    if (!user || !user.request) return;
    setRequestFrom(user.request);
    setRequestModal(true);
  }, [user]);

  const onClickSettingsButton = () => {
    setSettingsModal(!settingsModal);
  };

  const onClickHeaderTitle = () => {
    // dispatch({ type: "TOGGLE_NAVBAR" });
    router.replace("/login");
  };

  const modalRequestProps = {
    modal: requestModal,
    setModal: setRequestModal,
    requestFrom: requestFrom,
  };

  return (
    <>
      <div className="w-screen h-16 text-brightRed flex justify-between items-end px-5 py-2 relative overflow-x-clip">
        <div className="roundDecoration fixed" />
        <div
          className="px-3 text-white font-bold text-xl rounded-full border-2 border-white z-10"
          onClick={onClickHeaderTitle}
        >
          {headerTitle}
        </div>
        <div className="h-full flex flex-col justify-end z-10 border-2 border-transparent">
          <MenuRoundedIcon
            className="text-white text-3xl"
            onClick={onClickSettingsButton}
          />
        </div>
        <ModalSettings modal={settingsModal} setModal={setSettingsModal} />
      </div>
      {requestModal && <ModalRequest {...modalRequestProps} />}
    </>
  );
};

export default Header;
