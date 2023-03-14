import { readItems } from "@/api/apiService";
import PostItem from "@/components/card/post/postItem";
import CreateNewItemButton from "@/components/features/openModal";
import ModalLayout from "@/components/modal/layout";
import ModalPost from "@/components/modal/modalPost";
import { usePath } from "@/hooks/usePath";
import React, { useEffect, useState } from "react";

// export type ModalPropsType = {
//   children?: React.ReactNode;
//   modal: boolean;
//   onClickSubmit?: () => {};
//   onClickCancel?: () => {};
//   // setModal: React.Dispatch<React.SetStateAction<boolean>>;
// };

const Post = () => {
  usePath("Post");
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const array: any = [];
    readItems("posts")
      .then((item) => {
        array.push(...item);
      })
      .then(() => {
        setItems(array);
      });
  }, []);

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      {items?.map((item) => (
        <PostItem item={item} />
      ))}
      {modal && <ModalPost modal={modal} setModal={setModal} />}
      {!modal && (
        <div onClick={openModal}>
          <CreateNewItemButton path="Post" />
        </div>
      )}
    </>
  );
};

export default Post;
