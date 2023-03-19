const AUTH_LOGIN = "AUTH_LOGIN";

export const userLogin = (payload: string) => {
  return {
    type: AUTH_LOGIN,
    payload,
  };
};
