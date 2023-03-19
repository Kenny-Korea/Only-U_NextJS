import { readItems } from "@/api/apiService";
import { PostData } from "@/types";
import { useQuery } from "react-query";
import { useAuth } from "./useAuth";

// const fetchingData = async (docPath) => {
//   return await readItems("posts", docPath);
// };

export const useFetch = (docPath: string) => {
  return useQuery<PostData[]>(
    "getPosts",
    // fetchingData(docPath),
    () => {
      return readItems("posts", docPath);
    },
    { staleTime: Infinity, keepPreviousData: true }
  );
};
