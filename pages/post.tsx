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

const Post = () => {
  usePath("Post");
  // const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const { isLoading, error, data } = useQuery<FetchedData[]>("getPosts", () => {
    return readItems("posts");
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error;

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

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      {data && data.map((item: FetchedData) => <PostItem item={item} />)}
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
