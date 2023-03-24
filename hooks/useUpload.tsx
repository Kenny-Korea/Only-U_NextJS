import { createItem } from "@/api/apiService";
import { ItemArg, PlaceArg, PlanArg, PostArg } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useUserInfo } from "./useUserInfo";

type QueryName = "plans" | "posts" | "places";
type SetModal = React.Dispatch<React.SetStateAction<boolean>>;

export const useUpload = (
  queryName: QueryName,
  data: ItemArg<PlaceArg | PlanArg | PostArg>,
  setModal: SetModal,
  imageFileContainer?: File[]
) => {
  const queryClient = useQueryClient();
  const user = useUserInfo();
  const dispatch = useDispatch();
  useMutation(
    () => {
      return createItem(queryName, data, user?.combinedId, imageFileContainer);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryName]);
        dispatch({ type: "UPLOADING_DONE" });
        setModal(false);
      },
      onError: () => {
        alert("Failed to upload posts. Please try again");
        dispatch({ type: "UPLOADING_DONE" });
        setModal(false);
      },
    }
  );
};
