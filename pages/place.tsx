import PlaceItem from "@/components/card/placeItem";
import CreateNewItemButton from "@/components/features/openModal";
import ModalPlace from "@/components/modal/modalPlace";
import { usePath } from "@/hooks/usePath";
import React, { useState } from "react";

const Place = () => {
  usePath("Place");
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      {items?.map((item) => (
        <PlaceItem item={item} />
      ))}
      {modal && <ModalPlace modal={modal} setModal={setModal} />}
      {!modal && (
        <div onClick={openModal}>
          <CreateNewItemButton path="Post" />
        </div>
      )}
      {items.length === 0 && "Add new place!"}
    </>
  );
};

export default Place;
