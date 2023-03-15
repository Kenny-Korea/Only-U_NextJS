import React, { useContext, useMemo, useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "@/context/authContext";

type EditButtonProps = {
  item: {
    id: string;
  };
  docName: string;
};

const EditButton = (props: EditButtonProps) => {
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

  // TODO. state가 변할 때마다 content 함수가 호출되므로 캐싱이 필요할 것으로 보임
  // 특히 post 페이지는 state의 변화가 매우 심함

  const content = () => {
    console.log("rendered");
    if (!clicked) return [settingsButton, updateButton, deleteButton];
    return [updateButton, deleteButton, settingsButton];
  };

  const displayButton = useMemo(() => {
    if (!clicked) return [settingsButton, updateButton, deleteButton];
    return [updateButton, deleteButton, settingsButton];
  }, []);

  // --------------------

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
          <div className="w-24 flex justify-between gap-1 items-center">
            {content().map((item) => item)}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditButton;
