import { createItem, CreateItemArg } from "@/api/apiService";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

type QueryName = "plans" | "posts" | "places";
type SetModal = React.Dispatch<React.SetStateAction<boolean>>;

export const usePostMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(
    (variables: CreateItemArg) => {
      return createItem(variables);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([variables.type]);
        variables.setModal(false);
        dispatch({ type: "UPLOADING_DONE" });
      },
      onError: (data, variables) => {
        alert("Failed to upload posts. Please try again");
        variables.setModal(false);
        dispatch({ type: "UPLOADING_DONE" });
      },
    }
  );
};
