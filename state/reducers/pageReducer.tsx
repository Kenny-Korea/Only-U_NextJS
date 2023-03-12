// 유저 정보 가져오고 나중에 유저 정보 수정까지 하는 authReducer

// enum ActionType {
//   GET_USER_INFO = "GET_USER_INFO"
// }

const initialValue = { currentPage: "Home" };
type Action = {
  type: string;
  payload?: string;
};

export const pageReducer = (state = initialValue, action: Action) => {
  if (action.type === "CHANGE_PATH") {
    return {
      currentPage: action.payload,
    };
  }
  return state;
};
// 정말 중요한 내용
// state를 그대로 리턴하면 안됨
// state는 참조값이기 때문에 항상 새로운 객체에 담아서 반환해야 한다
