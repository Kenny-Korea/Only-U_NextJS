import { deleteItem, DeleteItemArg } from "@/api/apiService";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(
    (variables: DeleteItemArg) => {
      return deleteItem(variables);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([variables.type]);
        console.log("삭제 완료");
        dispatch({ type: "DELETING_DONE" });
      },
      onError: () => {
        alert("Failed to delete posts. Please try again");
        dispatch({ type: "DELETING_DONE" });
      },
    }
  );
};
