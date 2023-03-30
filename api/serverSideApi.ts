import { auth } from "@/firebase";
import { useQuery } from "react-query";

export const getDocPath = async () => {
  // const userUid = auth.currentUser?.uid;
  // if (!userUid) return { docPath: null };
  // const { data: user } = useQuery(
  //   ["getUser", userUid],
  //   () => getUserInfo(userUid),
  //   { enabled: !!userUid }
  // );
  // return { docPath: user?.combinedId };
};
