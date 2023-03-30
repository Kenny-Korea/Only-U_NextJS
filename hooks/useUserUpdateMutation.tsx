import { updateUser, UpdateUserArg } from "@/api/apiService";
import { useMutation, useQueryClient } from "react-query";

export const useUserUpdateMutation = () => {
  // const queryClient = useQueryClient();
  // return useMutation(
  //   (variables: UpdateUserArg) => {
  //     return updateUser(variables);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["user"]);
  //     },
  //     onError: () => {
  //       alert("Failed to proceed. Please try again");
  //     },
  //   }
  // );
};
