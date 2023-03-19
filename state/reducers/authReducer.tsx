import { getUserInfo, readItems } from "@/api/apiService";
import { userLogin } from "../actions";

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
  payload: any;
};

const initialState = {
  loginStatus: false,
  userUid: null,
  combinedId: null,
  userInfo: {
    username: null,
  },
};

// thunk 함수
// export const fetchUserInfo =  () => async dispatch => {
//   dispatch(userLogin(payload))
//   try{
//     const res = await getUserInfo(action.payload);

//   }
// };

export const authReducer = async (
  state: State = initialState,
  action: Action
) => {
  if (action.type === AUTH_LOGIN) {
    return {
      ...state,
      loginStatus: true,
      userUid: action.payload,
      userInfo: action.payload,
    };
  }
  return state;
};
