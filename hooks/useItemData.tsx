import { getUserInfo, readItems } from "@/api/apiService";
import { AuthState } from "@/state/reducers/authReducer";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

type ColName = "plans" | "posts" | "places";

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
