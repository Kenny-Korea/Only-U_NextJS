import { createItem, CreateItemArg } from "@/api/apiService";
import { ItemArg, PlaceArg, PlanArg, PostArg } from "@/types";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useUserInfo } from "./useUserInfo";

type QueryName = "plans" | "posts" | "places";
type SetModal = React.Dispatch<React.SetStateAction<boolean>>;

export const usePostMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(
    (variables: CreateItemArg) => {
      console.log(variables);
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
// queryClient.setQueryData("posts", (oldQueryData: any) => {
//   return {
//     ...oldQueryData,
//     data: [...oldQueryData, data],
//   };
// });

// queryName: QueryName,
// data: ItemArg<PlaceArg | PlanArg | PostArg>,
// setModal: SetModal,
// imageFileContainer?: File[]

// () => {
//   return createItem("posts", data, user?.combinedId, imageFileContainer);
// },

// queryName: QueryName,
// data: ItemArg<PlaceArg | PlanArg | PostArg>,
// setModal: SetModal,
// queryClient: any,
// user: any,
// imageFileContainer?: File[]
