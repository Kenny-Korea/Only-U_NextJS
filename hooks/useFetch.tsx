import { readItems } from "@/api/apiService";
import { PostData } from "@/types";
import { useQuery } from "react-query";
// import { useAuth } from "./useAuth";

const fetchingData = (docPath) => {
  return readItems("posts", docPath);
};

export const useFetch = (docPath: string) => {
  return useQuery<PostData[]>(
    "getPosts",
    readItems,
    // () => {
    //   return readItems("posts", docPath);
    // },
    { staleTime: Infinity, keepPreviousData: true }
  );
};
