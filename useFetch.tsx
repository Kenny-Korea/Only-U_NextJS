import { onSnapshot, doc } from "firebase/firestore";
import { db } from "./firebase";

interface UseFetchType {
  feature: "post" | "chat" | "place";
  id: string;
  // setState: React.SetStateAction<string>;
}

export const useFetch = async (feature: string, id: string) => {
  try {
    onSnapshot(doc(db, feature, id), (snapshot) => {
      if (!snapshot.data()) return;
      return snapshot.data();
      // setState(snapshot.data().feature);
    });
  } catch {}
};

// interface UseFetchType {
//   url: string;
//   method: "GET" | "POST" | "PUT" | "DELETE";
// }
// export const useFetch = async ({ url, method }: UseFetchType) => {
//   fetch(url, {
//     method: method,
//   });
// };
