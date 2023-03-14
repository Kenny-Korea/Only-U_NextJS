// import { useQuery } from "react-query";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  addDoc,
  getDoc,
  doc,
  Timestamp,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  collection,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { uuidv4 } from "@firebase/util";
// import { PartnerContext } from "../Context/PartnerContext";

const partnerInfo = { combinedId: "test" };

type TypeArg = "posts" | "plans" | "places";
type DataArg = {
  id: string | null;
  readonly title: string;
  readonly hashtag?: (string | null)[];
  readonly content: string;
  url: string[] | string | null;
  readonly writer: string;
  date: number | null;
};
type DataToSave = {
  id: string;
  title: string;
  hashtag?: (string | null)[];
  content?: string;
  url?: string[] | string | null;
  writer: string;
  date: number;
};
type ImageArg = File[];

export const createItem = async (
  type: TypeArg,
  data: DataArg,
  image: ImageArg
) => {
  // TODO 1. 기존에 데이터가 있는지 확인하는 공통 res
  const res = await getDoc(doc(db, type, partnerInfo.combinedId));
  const docRef = doc(db, type, partnerInfo.combinedId);
  const uploadDate = Timestamp.now().seconds;

  // TODO 2. switch - case
  switch (type) {
    case "posts":
      // 이미지 업로드 및 url 다운로드
      const urlArray: string[] = [];
      if (image.length !== 0 || Array.isArray(image)) {
        for (let i = 0; i < image.length; i++) {
          const storageRef = ref(
            storage,
            partnerInfo.combinedId + uploadDate + i
          );
          const uploadTask = await uploadBytesResumable(storageRef, image[i], {
            contentType: "image/jpeg",
          });
          await getDownloadURL(uploadTask.ref).then((url) => {
            urlArray.push(url);
          });
        }
        data.id = uuidv4();
        data.url = urlArray;
        data.date = uploadDate;
        console.log("for문 다 돌았음");
      }
      break;
    case "places":
      break;

    case "plans":
      break;

    default:
      break;
  }

  // TODO 3. 데이터 저장
  const handleUpdate = async (funcDoc: any) => {
    try {
      await funcDoc(docRef, {
        [type]: arrayUnion(data),
      });
    } catch {
      console.log("err");
    }
  };
  // 기존 데이터가 있으면 updateDoc, 없으면 setDoc
  if (!res.exists()) {
    handleUpdate(setDoc);
  } else {
    handleUpdate(updateDoc);
  }
};
export const readItems = async (type: TypeArg) => {
  const modifiedType = type.substring(0, type.length - 1); // db 내 이름 수정하지 않기 위해 사용
  const docRef = doc(
    db,
    type,
    "yWlfq9J67FMV6NTQfbooyvbc1AE2npGmAubtu7ReiqdN8PtgxRw8w6s2"
  );
  const docSnap = await getDoc(docRef); // Promise 객체 리턴
  if (docSnap.exists()) {
    const array = docSnap.data()[modifiedType];
    console.log(array);
    return array;
  } else {
    return [];
  }
};
export const updateItem = () => {};
export const deleteItem = () => {};
