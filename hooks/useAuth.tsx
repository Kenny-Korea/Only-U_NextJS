import { getUserInfo } from "@/api/apiService";
import { useQuery } from "react-query";

export const useAuth = () => {
  const { error, data } = useQuery<any>(
    "getUser",
    () => {
      return getUserInfo("yWlfq9J67FMV6NTQfbooyvbc1AE2");
    },
    {
      staleTime: 600000,
      keepPreviousData: true,
    }
  );
  if (error) return <p>Could not load user info. Try login again</p>;
  return { ...data };
};
