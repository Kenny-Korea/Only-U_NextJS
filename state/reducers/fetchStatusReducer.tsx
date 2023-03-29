export type FetchStatusReducerSelector = {
  fetchStatusReducer: {
    uploading: boolean;
    deleting: boolean;
  };
};

type State = {
  uploading: boolean;
  deleting: boolean;
};

type Action = {
  type:
    | "UPLOADING_STARTS"
    | "UPLOADING_DONE"
    | "DELETING_STARTS"
    | "DELETING_DONE";
};

const initialState: State = { uploading: false, deleting: false };

export const fetchStatusReducer = (
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
  if (action.type === "DELETING_STARTS") {
    return {
      deleting: true,
    };
  }
  if (action.type === "DELETING_DONE") {
    return {
      deleting: false,
    };
  }
  return state;
};
