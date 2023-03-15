export type UploadingReducerSelector = {
  uploadingReducer: {
    uploading: boolean;
  };
};

type State = {
  uploading: boolean;
};

type Action = {
  type: "UPLOADING_STARTS" | "UPLOADING_DONE";
};

const initialState: State = { uploading: false };

export const uploadingReducer = (
  state: State = initialState,
  action: Action
) => {
  if (action.type === "UPLOADING_STARTS") {
    return {
      uploading: true,
    };
  }
  if (action.type === "UPLOADING_DONE") {
    return {
      uploading: false,
    };
  }
  return state;
};
