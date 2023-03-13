import React, { useContext, useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "@/context/authContext";

type ItemModificationButtonProps = {
  item: {
    id: number;
  };
  docName: string;
};

const ItemModificationButton = (props: ItemModificationButtonProps) => {
  const { item, docName } = props;
  const [clicked, setClicked] = useState(false);
  const { partnerInfo } = useContext(AuthContext);

  const onClickSettings = () => {
    setClicked(!clicked);
  };

  const onClickUpdate = () => {};

  const onClickDelete = async () => {
    // if (window.confirm("정말 삭제하시겠습니까?")) {
    //   const docRef = doc(db, docName, partnerInfo.combinedId);
    //   const fieldName = docName.substring(0, docName.length - 1);
    //   await updateDoc(docRef, {
    //     [fieldName]: arrayRemove(item),
    //   });
    // }
  };

  const frame = (event: () => void, icon: React.ReactNode) => (
    <div
      className="bg-white w-5 h-5 shadow-inner shadow-gray-200 text-black rounded-full centerItem"
      onClick={event}
    >
      {icon}
    </div>
  );

  const settingsButton = frame(
    onClickSettings,
    <MoreHorizRoundedIcon style={{ fontSize: "1.1rem" }} key={item.id} />
  );
  const updateButton = frame(
    onClickUpdate,
    <EditRoundedIcon style={{ fontSize: "1.1rem" }} key={item.id} />
  );
  const deleteButton = frame(
    onClickDelete,
    <DeleteRoundedIcon style={{ fontSize: "1.1rem" }} key={item.id} />
  );

  const content = () => {
    if (!clicked) return [settingsButton, updateButton, deleteButton];
    return [updateButton, deleteButton, settingsButton];
  };

  return (
    <>
      <div className="relative w-6 h-6 bg-transparent">
        <div
          className={`${
            clicked
              ? "w-24 shadow-test bg-white"
              : "w-[1.59rem] shadow-sm bg-bgColor"
          } absolute top-0 right-0 h-[1.59rem] px-[0.17rem] flex rounded-full duration-300 overflow-hidden`}
        >
          <div
            className="w-24 flex justify-between gap-1 items-center"
            key={item.id}
          >
            {content().map((item) => item)}
            {/* {content()} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemModificationButton;
