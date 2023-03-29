import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getDoc,
  doc,
  Timestamp,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  collection,
  where,
  arrayRemove,
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
import { useDispatch } from "react-redux";
import { storageDir } from "@/utils/globalVariables";

// export const docPath =
// "yWlfq9J67FMV6NTQfbooyvbc1AE2npGmAubtu7ReiqdN8PtgxRw8w6s2";
// export const docPath = "yWlfq9J67FMV6NTQfbooyvbc1AE2";

// const dispatch = useDispatch();

const imageCompressionOptions = {
  maxSizeMB: 0.5,
  maxWidth: 300,
};

export type CreateItemArg = {
  type: TypeArg;
  data: ItemArg<PlanArg | PostArg | ChatArg | PlaceArg>;
  docPath: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  image?: ImageArg;
};

//! TODO. Delete도 useMutation을 통하 진행할 수 있도록 수정 필요
export type DeleteItemArg = {
  type: TypeArg;
  data: ItemArg<PlanArg | PostArg | ChatArg | PlaceArg>;
  docPath: string;
};

export type CreateChatArg = {
  type: ChatArg;
  data: ItemArg<ChatArg>;
  docPath: string;
};

// TODO. CREATE
export const createItem = async (variables: CreateItemArg) => {
  const type = variables.type;
  const data = variables.data;
  const docPath = variables.docPath;
  const image = variables.image;

  //* 1-1. 기존 데이터가 있는지 확인
  const res = await getDoc(doc(db, type, docPath));
  const docRef = doc(db, type, docPath);
  const uploadDate = Timestamp.now().seconds * 1000;

  //* 1-2. 필요한 변수 및 함수 선언
  const compressedImages: File[] = [];
  const urlArray: string[] = [];
  const compressImage = async () => {
    for (let x of image!) {
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
  };
  const distributeUrl = async () => {
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
  };

  //* 2. switch - case
  switch (type) {
    case "plans":
      data.id = uuidv4();
      data.regdate = uploadDate;
      break;

    case "posts":
      if (!image) return; // Post는 무조건 이미지가 1개 이상 있어야 함
      // 이미지 압축 시작
      await compressImage();

      // 이미지 업로드 및 url 다운로드
      if (compressedImages.length !== 0 || Array.isArray(compressedImages)) {
        await distributeUrl();
      }
      //! data의 타입이 확실하지 않기 때문에 예외 처리 별도 해줘야 함
      if ("imageurl" in data) {
        data.id = uuidv4();
        data.imageurl = urlArray;
        data.regdate = uploadDate;
        console.log("for문 다 돌았음");
      }

      break;

    case "chats":
      data.id = uuidv4();
      data.regdate = uploadDate;
      break;

    case "places":
      if (image) {
        // Place는 첨부한 이미지가 있을 수도, 없을 수도 있음
        await compressImage();
      }
      // 이미지 업로드 및 url 다운로드
      if (compressedImages.length !== 0 || Array.isArray(compressedImages)) {
        await distributeUrl();
      }
      // 1. upload 파일이 있는 경우
      if ("imageurl" in data && image) {
        data.id = uuidv4();
        data.imageurl = urlArray;
        data.regdate = uploadDate;
      }
      // 2. 구글 이미지 사용하거나, 이미지가 없는 경우
      else {
        data.id = uuidv4();
        data.regdate = uploadDate;
      }

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
  return;
};

// TODO. READ - POSTS
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

// TODO. READ - CHATS
// export const readChats = async() => {
//   const q = query(collection(db, "chats"), where("chat", "==",  ))
// }

// TODO. READ - USER INFO
export const getUserInfo = async (userUid: string) => {
  const docRef = doc(db, "user", userUid);
  const docSnap = await getDoc(docRef); // Promise 객체 리턴
  if (docSnap.exists()) {
    // console.log(docSnap.data());
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
export const deleteItem = async (variables: DeleteItemArg) => {
  const type = variables.type;
  const docPath = variables.docPath;
  const data = variables.data;

  // 1. 데이터 지우기 (database)
  const docRef = doc(db, type, docPath);
  const fieldName = type.substring(0, type.length - 1); // "s" 제거
  await updateDoc(docRef, {
    [fieldName]: arrayRemove(data), // data 객체를 보내주면 이에 해당하는 data 제거
  });
  // 2. 이미지 파일 지우기 (storage)
  if (!("imageurl" in data) || !data.imageurl || data.imageurl.length === 0)
    return; // 이미지 url이 없으면 리턴
  if (!data.imageurl.includes(storageDir)) return; // storage에 저장되어 있지 않으면 리턴
  for (let url of data.imageurl) {
    const desertRef = ref(storage, url as string);
    try {
      console.log(desertRef);
      await deleteObject(desertRef);
    } catch {
      console.log("Error deleting files");
    }
  }
};
