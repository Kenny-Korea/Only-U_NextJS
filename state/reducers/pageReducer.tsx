// 유저 정보 가져오고 나중에 유저 정보 수정까지 하는 authReducer

// enum ActionType {
//   GET_USER_INFO = "GET_USER_INFO"
// }

const initialState: State = { currentPage: "Home", navbar: true };

export type State = {
  currentPage: string;
  navbar: boolean;
};

type Action = {
  type: string;
  payload?: string;
};

export const pageReducer = (state: State = initialState, action: Action) => {
  if (action.type === "CHANGE_PATH") {
    return {
      currentPage: action.payload,
      navbar: true,
    };
  }
  if (action.type === "SHOW_NAVBAR") {
    return {
      currentPage: state.currentPage,
      navbar: true,
    };
  }
  if (action.type === "TOGGLE_NAVBAR") {
    return {
      currentPage: state.currentPage,
      navbar: !state.navbar,
    };
  }
  return state;
};
// 정말 중요한 내용
// state를 그대로 리턴하면 안됨
// state는 참조값이기 때문에 항상 새로운 객체에 담아서 반환해야 한다
