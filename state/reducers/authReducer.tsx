import { readItems } from "@/api/apiService";

export const AUTH_LOGIN = "AUTH_LOGIN" as const;
export const AUTH_LOGOUT = "AUTH_LOGOUT" as const;
// const ACTION_TYPE = {
//   AUTH_LOGIN: "AUTH_LOGIN",
//   AUTH_LOGOUT: "AUTH_LOGOUT",
// } as const;
// type ACTION_TYPE = typeof ACTION_TYPE[keyof typeof ACTION_TYPE];

export type AuthReducerSelector = {
  authReducer: {
    loginStatus: boolean;
    userUid: null | string;
    combinedId: null | string;
  };
};

type State = {
  loginStatus: boolean;
  userUid: null | string;
  combinedId: null | string;
};

type Action = {
  type: typeof AUTH_LOGIN | typeof AUTH_LOGOUT;
  payload: string;
};

const initialState = { loginStatus: false, userUid: null, combinedId: null };

export const authReducer = async (
  state: State = initialState,
  action: Action
) => {
  if (action.type === "AUTH_LOGIN") {
    const res = await readItems("user");
    console.log(res);
    return {
      ...state,
      loginStatus: true,
      userUid: action.payload,
    };
  }
  return state;
};
