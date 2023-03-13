import CreateNewItemButton from "@/components/features/openModal";
import { usePath } from "@/hooks/usePath";
import React from "react";

const Place = () => {
  usePath("Place");

  return (
    <>
      <div className="Place"></div>
      <CreateNewItemButton path="Place" />
    </>
  );
};

export default Place;
