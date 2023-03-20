import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getDoc,
  doc,
  Timestamp,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { uuidv4 } from "@firebase/util";
import imageCompression from "browser-image-compression";
import {
  ChatArg,
  ImageArg,
  ItemArg,
  PlaceArg,
  PlanArg,
  PostArg,
  TypeArg,
} from "@/types";

// export const docPath =
// "yWlfq9J67FMV6NTQfbooyvbc1AE2npGmAubtu7ReiqdN8PtgxRw8w6s2";
// export const docPath = "yWlfq9J67FMV6NTQfbooyvbc1AE2";

const imageCompressionOptions = {
  maxSizeMB: 0.5,
  maxWidth: 300,
};

// type CreateItemArg = {
//   type: TypeArg,
//   data: ItemArg<PlanArg | PostArg | ChatArg | PlaceArg>,
//   docPath: string,
//   image?: ImageArg
// }

// TODO. CREATE
export const createItem = async (
  type: TypeArg,
  data: ItemArg<PlanArg | PostArg | ChatArg | PlaceArg>,
  docPath: string,
  image?: ImageArg
) => {
  //* 1. 기존에 데이터가 있는지 확인
  const res = await getDoc(doc(db, type, docPath));
  const docRef = doc(db, type, docPath);
  const uploadDate = Timestamp.now().seconds;

  //* 2. switch - case
  switch (type) {
    case "user":
      break;
    case "plans":
      data.id = uuidv4();
      data.regdate = uploadDate;
      break;
    case "posts":
      if (!image) return; // TS
      // 이미지 압축 시작
      const compressedImages: File[] = [];
      for (let x of image) {
        try {
          const compressedImage = await imageCompression(
            x,
            imageCompressionOptions
          );
          console.log(compressedImage);
          compressedImages.push(compressedImage);
        } catch {
          console.log("error");
        }
      }
      // 이미지 업로드 및 url 다운로드
      const urlArray: string[] = [];
      if (compressedImages.length !== 0 || Array.isArray(compressedImages)) {
        for (let i = 0; i < compressedImages.length; i++) {
          const storageRef = ref(storage, docPath + uploadDate + i);
          const uploadTask = await uploadBytesResumable(
            storageRef,
            compressedImages[i],
            {
              contentType: "image/jpeg",
            }
          );
          await getDownloadURL(uploadTask.ref).then((url) => {
            urlArray.push(url);
          });
        }
        //! data의 타입이 확실하지 않기 때문에 예외 처리 별도 해줘야 함
        if ("imageurl" in data) {
          data.id = uuidv4();
          data.imageurl = urlArray;
          data.regdate = uploadDate;
          console.log("for문 다 돌았음");
        }
      }
      break;
    case "places":
      break;

    default:
      break;
  }

  //* 3. 데이터 저장
  const handleUpdate = async (funcDoc: any) => {
    const modifiedType = type.substring(0, type.length - 1);
    try {
      await funcDoc(docRef, {
        [modifiedType]: arrayUnion(data),
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

// TODO. READ
export const readItems = async (type: TypeArg, docPath: string) => {
  const modifiedType = type.substring(0, type.length - 1); // db 내 이름 수정하지 않기 위해 사용
  const docRef = doc(db, type, docPath);
  const docSnap = await getDoc(docRef); // Promise 객체 리턴
  if (docSnap.exists()) {
    const array = docSnap.data()[modifiedType];
    return array;
  } else {
    return [];
  }
};

// TODO. GET_USER_INFO
export const getUserInfo = async (userUid: string) => {
  const docRef = doc(db, "user", userUid);
  const docSnap = await getDoc(docRef); // Promise 객체 리턴
  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data();
  } else {
    return null;
  }
};

// export const readItems = async (type: TypeArg) => {
//   const modifiedType = type.substring(0, type.length - 1); // db 내 이름 수정하지 않기 위해 사용
//   const docRef = doc(db, type, docPath);
//   const docSnap = await getDoc(docRef); // Promise 객체 리턴
//   if (docSnap.exists()) {
//     const array = docSnap.data()[modifiedType];
//     console.log(array);
//     return array;
//   } else {
//     return [];
//   }
// };

// TODO. UPDATE
export const updateItem = () => {};
// TODO. DELETE
export const deleteItem = () => {};
