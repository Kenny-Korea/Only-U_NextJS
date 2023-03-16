import { readItems } from "@/api/apiService";
import PostItem from "@/components/card/post/postItem";
import CreateNewItemButton from "@/components/features/openModal";
import ModalLayout from "@/components/modal/layout";
import ModalPost from "@/components/modal/modalPost";
import { usePath } from "@/hooks/usePath";
import { ItemPropsType } from "@/types";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

type FetchedData = {
  readonly id: string;
  readonly title: string;
  readonly hashtag?: (string | null)[];
  readonly content: string;
  readonly url: string[];
  readonly writer: string;
  readonly date: number;
  readonly rate: string;
};

const Post = (props: any) => {
  usePath("Post");
  // const { jsonData } = props;
  // let data;
  // if (jsonData) {
  //   console.log("maja");
  //   data = JSON.parse(jsonData);
  // }

  const [modal, setModal] = useState(false);
  const { isLoading, error, data, isFetching } = useQuery<FetchedData[]>(
    "getPosts",
    () => {
      return readItems("posts");
    },
    { staleTime: 30000, keepPreviousData: true }
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error;
  console.log(isFetching);
  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      {data &&
        data.map((item: FetchedData) => (
          <PostItem item={item} key={item.date} />
        ))}
      {modal && <ModalPost modal={modal} setModal={setModal} />}
      {!modal && (
        <div onClick={openModal}>
          <CreateNewItemButton path="Post" />
        </div>
      )}
      {data && data.length === 0 && "Add new post!"}
    </>
  );
};

export default Post;

// export async function getServerSideProps() {
//   const data = await readItems("posts");
//   return {
//     props: {
//       jsonData: JSON.stringify(data),
//     },
//   };
// }

// useEffect(() => {
//   const array: any = [];
//   readItems("posts")
//     .then((item) => {
//       array.push(...item);
//     })
//     .then(() => {
//       setItems(array);
//     });
// }, []);

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//      allow read, write: if request.auth != null;
//     }
//   }
// }

// FF766B
