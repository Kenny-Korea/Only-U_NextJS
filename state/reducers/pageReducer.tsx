export type PageReducerSelector = {
  pageReducer: {
    currentPage: string;
    navbar: boolean;
  };
};

type State = {
  currentPage: string;
  navbar: boolean;
};

type Action = {
  type: string;
  payload?: string;
};

const initialState: State = { currentPage: "Home", navbar: true };

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
  if (action.type === "HIDE_NAVBAR") {
    return {
      currentPage: state.currentPage,
      navbar: false,
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
