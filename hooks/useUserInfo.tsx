import { getUserInfo } from "@/api/apiService";
import { AuthState } from "@/state/reducers/authReducer";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// TODO. Depending Query를 이용하여 각 페이지의 데이터를 fetching 하는 custom hooks
export const useUserInfo = () => {
  const userUid = useSelector((state: AuthState) => state.authReducer.userUid);
  const { data: user } = useQuery(
    ["getUser", userUid],
    () => getUserInfo(userUid),
    { enabled: !!userUid }
  );
  return user;
};
