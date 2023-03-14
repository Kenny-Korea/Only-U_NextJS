import CreateNewItemButton from "@/components/features/openModal";
import { usePath } from "@/hooks/usePath";
import React, { useState } from "react";

const Place = () => {
  usePath("Place");
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="Place"></div>
      <CreateNewItemButton path="Place" />
    </>
  );
};

export default Place;
