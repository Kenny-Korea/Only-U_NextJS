import { useEffect } from "react";
import { useDispatch } from "react-redux";

type UsePathElement =
  | "Home"
  | "Post"
  | "Chat"
  | "Place"
  | "Gift"
  | "Login"
  | "Register"
  | "Partner";

export const usePath = (path: UsePathElement) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "CHANGE_PATH", payload: path });
  }, []);
};
