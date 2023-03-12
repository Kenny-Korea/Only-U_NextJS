import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";

const Login = () => {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <div className={` pb-4 flex justify-center z-10`}>
        <div className="w-10/12">
          <div
            className={`card min-h-[15rem] h-80 ${err && "h-72"} flex flex-col`}
          >
            <form onSubmit={handleSubmit}>
              <ul className="m-4 flex flex-col gap-4 text-sm">
                <li className="flex flex-col">
                  <span>Email</span>
                  <input
                    className="loginInput"
                    type="email"
                    // placeholder={savedEmail ? savedEmail : "email"}
                    // ref={emailRef}
                  />
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
                  <span className="text-sm">
                    Something went wrong. Try again
                  </span>
                )}
                <div>
                  {/* save email
                  <input type="checkbox" onChange={handleSaveEmail} /> */}
                </div>
                <button className="w-full h-full py-1 text-white text-lg font-bold bg-main hover:bg-mainColor rounded-full">
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
        </div>
      </div>
    </>
  );
};

export default Login;
