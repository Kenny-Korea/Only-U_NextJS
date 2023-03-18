import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { usePath } from "@/hooks/usePath";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Login = () => {
  usePath("Login");
  const [err, setErr] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // e.currentTarget에 value가 들어올 수도 있고, 안들어올 수도 있기 때문에 Typescript 에러 발생
    // --> e.currentTarget이 value 속성을 가진 HTMLInputElement라고 알려줌으로써 에러 해결
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const userUid = res.user.uid;
      dispatch({ type: "AUTH_LOGIN" });
      router.replace("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <div
        className={`card min-h-[15rem] h-80 ${
          err && "h-72"
        } flex flex-col w-full`}
      >
        <form onSubmit={handleSubmit}>
          <ul className="m-4 flex flex-col gap-4 text-sm">
            <li className="flex flex-col">
              <span>Email</span>
              <input className="loginInput" type="email" placeholder="email" />
            </li>
            <li className="flex flex-col">
              <span>Password</span>
              <input
                className="loginInput"
                type="password"
                placeholder="password"
              />
            </li>
          </ul>

          <div className="w-auto h-8 m-4 flex flex-col items-center gap-2">
            {err && (
              <span className="text-sm">Something went wrong. Try again</span>
            )}
            <div></div>
            <button className="w-full h-full py-1 text-white text-lg font-bold bg-mainColor hover:bg-mainColor rounded-full">
              Login
            </button>
            <p className="text-sm">
              You don't have an account?{" "}
              <Link
                href="/register"
                className="text-mainColor font-bold underline underline-offset-4"
              >
                Register
              </Link>
            </p>
            <div>
              <p>테스트계정</p>
              <p>tosstest@gmail.com</p>
              <p>rhkdals2</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
