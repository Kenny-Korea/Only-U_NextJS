import CreateNewItemButton from "@/components/features/openModal";
import ModalLayout from "@/components/modal/layout";
import ModalPost from "@/components/modal/modalPost";
import { usePath } from "@/hooks/usePath";
import React, { useState } from "react";

export type ModalPropsType = {
  children?: React.ReactNode;
  modal: boolean;
  setModal: (arg: boolean) => {};
};

const Post = () => {
  usePath("Post");
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>
      <div className="Post">hello</div>

      {modal ? (
        <ModalPost modal={modal} setModal={setModal} />
      ) : (
        <div
          onClick={() => {
            setModal(true);
          }}
        >
          <CreateNewItemButton path="Post" />
        </div>
      )}
    </>
  );
};

export default Post;
