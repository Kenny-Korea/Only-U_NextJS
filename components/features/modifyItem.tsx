import { useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { ChatArg, ItemArg, PlaceArg, PlanArg, PostArg, TypeArg } from "@/types";
import { DeleteItemArg } from "@/api/apiService";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useDeleteMutation } from "@/hooks/useDeleteMutation";
import { useDispatch } from "react-redux";

type EditButtonProps = {
  item: ItemArg<PlanArg | PostArg | ChatArg | PlaceArg>;
  type: TypeArg;
};

const EditButton = (props: EditButtonProps) => {
  const user = useUserInfo();
  const { item, type } = props;
  const [clicked, setClicked] = useState(false);
  const { mutate } = useDeleteMutation();
  const dispatch = useDispatch();

  const onClickSettings = () => {
    setClicked(!clicked);
  };

  const onClickUpdate = () => {};

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch({ type: "DELETING_STARTS" });
      const variables: DeleteItemArg = {
        type: type,
        data: item,
        docPath: user?.combinedId,
      };
      mutate(variables);
    }
  };

  return (
    <>
      <div className="relative w-6 h-6">
        <div
          className={`editButtonContainer border-[1px] px-[2px] overflow-hidden ${
            clicked ? "w-24" : "w-6"
          }`}
        >
          <div className="editButtonItem" onClick={onClickUpdate}>
            <EditRoundedIcon style={{ fontSize: "20px" }} />
          </div>
          <div className="editButtonItem" onClick={onClickDelete}>
            <DeleteRoundedIcon style={{ fontSize: "20px" }} />
          </div>
          <div
            className="editButtonItem absolute top-[1px] right-[1px]"
            onClick={onClickSettings}
          >
            <MoreHorizRoundedIcon style={{ fontSize: "20px" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditButton;
