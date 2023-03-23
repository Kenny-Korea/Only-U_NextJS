import { getUserInfo, readItems } from "@/api/apiService";
import { AuthState } from "@/state/reducers/authReducer";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

type ColName = "plans" | "posts" | "places" | "chats";

// TODO. Depending Query를 이용하여 각 페이지의 데이터를 fetching 하는 custom hooks
// 1. userUid를 인자로 받아 user의 combinedId를 fetching
// 2. combinedId를 인자로 받아 각 페이지 Item들을 fetching
export const useItemData = (colName: ColName) => {
  const userUid = useSelector((state: AuthState) => state.authReducer.userUid);
  const { data: user } = useQuery(
    ["getUser", userUid],
    () => getUserInfo(userUid),
    { enabled: !!userUid }
  );
  const combinedId = user?.combinedId;
  const {
    data: data,
    isLoading,
    error,
  } = useQuery<any[]>(
    [colName, combinedId],
    () => readItems(colName, combinedId),
    { enabled: !!combinedId }
  );
  return { data, isLoading, error };
};