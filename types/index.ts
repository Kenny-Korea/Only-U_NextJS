import { Timestamp } from "firebase/firestore";

// TODO. Modal창 on/off를 위해 전달받는 Props Type
export type ModalProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO. 모달 레이아웃이 전달받는 Props Type
export type ModalLayoutProps = {
  children: React.ReactNode;
  modal: boolean;
  onClickSubmit: () => void;
  onClickCancel: () => void;
};

// TODO. 서버로부터 받는 데이터의 타입
interface Data {
  readonly id: string;
  readonly regdate: number;
  readonly writer: string;
}

export interface ProfileData extends Data {
  readonly photoURL: string;
}

export interface PlanData extends Data {
  readonly title: string;
  readonly plandate: number; // Datepicker 라이브러리가 Date 형식을 사용해야 하므로
}

export interface PostData extends Data {
  readonly title: string;
  readonly hashtag: (string | null)[];
  readonly content: string;
  readonly imageurl: string[];
}

export interface ChatData extends Data {
  readonly content: string;
}

export interface PlaceData extends Data {
  readonly placeid: string;
  readonly title: string;
  readonly content: string;
  readonly rating: number;
  readonly placetype: "food" | "place";
  readonly imageurl: string[]; // 다른 data와의 통일성 및 추후 확장성을 위해 string[] 형식으로 지정
}

export type UserData = {
  readonly username: string;
  readonly uid: string;
  readonly email: string;
  readonly imageurl: string[];
  readonly partnerinfo: {
    username: string | null;
    uid: string | null;
    email: string | null;
    imageurl: string[] | null;
  };
  readonly combinedid: string | null;
  readonly regdate: number | null;
  readonly regnum?: null | number;
};

// TODO. 개별 아이템 카드에서 전달받을 Props Type (Generics)
export type ItemProps<T> = {
  readonly item: T;
  readonly placeView?: "flex" | "grid";
  readonly postView?: "flex" | "grid";
};

// TODO. createItem 함수에 전달 할 4가지 Argument Type
export type ItemArg<T> = T;
export type TypeArg = "plans" | "posts" | "chats" | "places" | "user";
export type ImageArg = File[];

// TODO. createItem 함수에 전달해 줄 Data Argument Type
// id, regdate, imageurl 은 createItem 함수에서 생성할 것이므로 null 및 빈 배열로 전달
// 이미지 파일은 createItem의 3번째 인자로 별도 전달
// createItem 함수에서 data 변수를 새로 생성하지 않고, 기존 value만 교체할 예정이므로, 해당 단계에서 모든 key를 설정해줘야 함
interface DataArg {
  id: null | string;
  regdate: null | number;
  writer: string;
}
export interface PlanArg extends DataArg {
  readonly title: string;
  readonly plandate: number; // Datepicker 라이브러리가 Date 형식을 사용해야 하므로
}
export interface PostArg extends DataArg {
  readonly title: string;
  readonly hashtag: (string | null)[];
  readonly content: string;
  imageurl: null | (string | null)[];
}

export interface ChatArg extends DataArg {
  readonly content: string;
}

export interface PlaceArg extends DataArg {
  readonly title: string;
  readonly rating: number;
  readonly placetype: "food" | "place";
  readonly content: string;
  imageurl: null | (string | google.maps.places.PlacePhoto | null)[];
}

// export type CreateVariables = {
//   type: "plans" | "posts" | "places";
//   data: PlanArg | PostArg | PlaceArg;
//   docPath: string;
//   setModal: React.Dispatch<React.SetStateAction<boolean>>;
//   image?: File[];
// };

// export type DeleteVariables = {

// }

export type ChatVariables = {
  type: "chats";
  data: ChatArg;
  docPath: string;
};
