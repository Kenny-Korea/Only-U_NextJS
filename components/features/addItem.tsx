import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const AddItemButton = (
  props
  // { page, addPost, setAddPost, addPlace, setAddPlace }
) => {
  const handleClick = () => {
    switch (currentPage) {
      case "home":
        break;
      case "post":
        setAddPost(!addPost);
        break;
      case "place":
        setAddPlace(!addPlace);
        break;
      default:
        return;
    }
  };
  return (
    <>
      <div
        className={
          "w-12 h-12 fixed bottom-24 right-6 bg-white shadow-addButton text-black text-4xl flex justify-center items-center rounded-full z-50 hover:font-bold hover:text-5xl"
        }
        onClick={handleClick}
      >
        <AddRoundedIcon style={{ fontSize: "2rem" }} />
      </div>
    </>
  );
};

export default AddButton;
