import { useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"; //이거 그 web dev simplified에서 구현한걸로 변경하기
import { useSelector } from "react-redux";
import { PageReducerSelector } from "@/state/reducers/pageReducer";
import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import { AuthReducerSelector, AUTH_LOGIN } from "@/state/reducers/authReducer";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { PlanData, UserData } from "@/types";
import { getUserInfo } from "@/api/apiService";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [settings, setSettings] = useState(false);
  const headerTitle = useSelector(
    (state: PageReducerSelector) => state.pageReducer.currentPage
  );
  const authState = useSelector(
    (state: AuthReducerSelector) => state.authReducer
  );
  const dispatch = useDispatch();

  const router = useRouter();

  const onClickSettings = () => {
    setSettings(!settings);
  };

  const userInfo = useAuth();

  const queryClient = useQueryClient();

  const onClickHeaderTitle = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
    console.log(authState);
    console.log(userInfo);
    console.log(queryClient);
  };

  return (
    <>
      <div className="w-screen h-16 text-brightRed flex justify-between items-end px-5 py-2 relative">
        <div className="roundDecoration" />
        <div
          className="px-3 text-white font-bold text-xl rounded-full border-2 border-white z-10"
          onClick={onClickHeaderTitle}
        >
          {headerTitle}
          {/* <button
            onClick={() => {
              signOut(auth).then(() => {
                console.log("logged-out");
                router.replace("/login");
              });
            }}
          >
            logout
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Header;
