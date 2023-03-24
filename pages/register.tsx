import React, { useState } from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { usePath } from "@/hooks/usePath";
import Link from "next/link";
import { useRouter } from "next/router";

const Register = () => {
  usePath("Register");
  const [err, setErr] = useState(false);
  const [pwErr, setPwErr] = useState(false);
  const router = useRouter();
  const [missingValueError, setMissingValueError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((e.currentTarget[4] as HTMLInputElement).files === null) return;
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const email = (e.currentTarget[1] as HTMLInputElement).value;
    const password = (e.currentTarget[2] as HTMLInputElement).value;
    const file = (e.currentTarget[4] as HTMLInputElement).files;
    try {
      // 유저 계정 생성
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, username); // 두 번째 인자를 이름으로 이미지가 저장됨
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await updateProfile(res.user, {
                displayName: username,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: username,
                email: email,
                photoURL: downloadURL,
              });
              router.replace("/");
            })
            .catch(() => <div>Failed to upload Image</div>);
        }
      );
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <div className={`card min-h-[26rem] ${err && "h-[28rem]"} flex flex-col`}>
        <form onSubmit={handleSubmit}>
          <ul className="m-4 flex flex-col gap-4 text-sm">
            <li className="flex flex-col">
              <span>Username</span>
              <input
                type="text"
                placeholder="username"
                className="loginInput"
              />
            </li>
            <li className="flex flex-col">
              <span>Email</span>
              <input type="email" placeholder="Email" className="loginInput" />
            </li>
            <li className="flex flex-col">
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
              />
            </li>
            <li className="flex flex-col">
              <span>Password Check</span>
              <input
                type="password"
                placeholder="Password Check"
                className="loginInput"
              />
            </li>
          </ul>
          <div className="w-auto h-8 m-4 flex flex-col items-center gap-2">
            {err && (
              <span className="text-sm">Something went wrong. Try again</span>
            )}
            <div className="w-full h-full py-1 flex justify-center items-center text-white text-lg font-bold bg-orange-300 rounded-full">
              <input
                type="file"
                id="file"
                accept="image/*"
                className="w-full hidden"
              />
              <label
                htmlFor="file"
                className="w-full flex justify-center items-center gap-2"
              >
                <AccountBoxRoundedIcon style={{ fontSize: "1.3rem" }} />
                Add my picture
              </label>
            </div>
            <button className="w-full h-full py-1 text-white text-lg font-bold bg-main hover:bg-mainColor rounded-full">
              Register
            </button>

            <p className="text-sm">
              Do you have an account?{" "}
              <Link
                href="/Login"
                className="text-mainColor font-bold underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
