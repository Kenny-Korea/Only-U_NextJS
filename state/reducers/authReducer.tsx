export const AUTH_LOGIN = "AUTH_LOGIN" as const;
export const AUTH_LOGOUT = "AUTH_LOGOUT" as const;

export type AuthReducerSelector = {
  authReducer: {
    loginStatus: boolean;
    userUid: null | string;
    combinedId: null | string;
  };
};

export type AuthState = {
  authReducer: {
    userUid: string;
    loginStatus: boolean;
  };
};

type State = {
  loginStatus: boolean;
  userUid: null | string;
};

type Action = {
  type: typeof AUTH_LOGIN | typeof AUTH_LOGOUT;
  payload: any;
};

const initialState = {
  loginStatus: false,
  userUid: null,
};

export const authReducer = (state: State = initialState, action: Action) => {
  if (action.type === AUTH_LOGIN) {
    return {
      ...state,
      loginStatus: true,
      userUid: action.payload,
    };
  }
  if (action.type === AUTH_LOGOUT) {
    return {
      ...state,
      loginStatus: false,
      userUid: null,
    };
  }
  return state;
};
