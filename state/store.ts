import { createStore } from "redux";
import { pageReducer } from "./reducers/pageReducer";

// createStore는 reducerFunction을 포인터로 가지고 있어야 함
// 함수 자체를 넣어주면 됨
export const store = createStore(pageReducer);
