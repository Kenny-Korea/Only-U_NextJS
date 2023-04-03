import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { usePath } from "@/hooks/usePath";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userLogin } from "@/state/actions";

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
      // localStorage.setItem("userUid", userUid);
      // dispatch(userLogin(userUid));

      router.replace("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <div className="card w-full h-auto flex flex-col p-4">
        <form onSubmit={handleSubmit}>
          <ul className="flex flex-col gap-4 text-sm">
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
            {err && <p className="text-sm">Something went wrong. Try again</p>}
            <div></div>
            <button className="w-full h-full py-1 text-white text-lg font-bold bg-mainColor hover:bg-mainColor rounded-full">
              Login
            </button>
          </div>
        </form>
        <div className="w-full centerItemCol">
          <p className="text-sm">
            You don't have an account?{" "}
            <Link
              href="/register"
              className="text-mainColor font-bold underline underline-offset-4"
            >
              Register
            </Link>
          </p>
          <div className="w-full text-xs flex flex-col mt-2">
            <p>테스트계정</p>
            <ul>
              <li>
                <p>tosstest@gmail.com</p>
                <p>rhkdals2</p>
              </li>
              <li>
                <p>kakaotest@gmail.com</p>
                <p>rhkdals2</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
