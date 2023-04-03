import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { usePath } from "@/hooks/usePath";
import { useRouter } from "next/router";
import { UserData } from "@/types";
import { MissingValueErrorMessage } from "@/utils/missingValueError";
import Link from "next/link";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";

const Register = () => {
  usePath("Register");
  const [err, setErr] = useState(false);
  const [pwErr, setPwErr] = useState(false);
  const router = useRouter();
  const [missingValueError, setMissingValueError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.currentTarget[4] as HTMLInputElement).files) return;
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const email = (e.currentTarget[1] as HTMLInputElement).value;
    const password = (e.currentTarget[2] as HTMLInputElement).value;
    const file = (
      (e.currentTarget[4] as HTMLInputElement).files as FileList
    )[0];
    try {
      // 유저 계정 생성
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, email); // 두 번째 인자를 이름으로 이미지가 저장됨
      const uploadTask = await uploadBytesResumable(storageRef, file, {
        contentType: "image/jpeg",
      });
      const imageURL = [await getDownloadURL(uploadTask.ref)];
      await setDoc(doc(db, "user", res.user.uid), {
        username: username,
        uid: res.user.uid,
        email: email,
        imageurl: imageURL,
        partnerinfo: {
          username: null,
          email: null,
          uid: null,
          imageurl: null,
        },
        combinedid: null,
        regdate: new Date().getTime(),
        regnum: null,
      } as UserData);
      router.replace("/");
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <>
      <div className="card w-full h-fit flex flex-col p-4">
        <form onSubmit={handleSubmit}>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex flex-col">
              <span>Username</span>
              <input
                type="text"
                placeholder="username"
                className="loginInput"
                required
              />
            </li>
            <li className="flex flex-col">
              <span>Email</span>
              <input
                type="email"
                placeholder="Email"
                className="loginInput"
                required
              />
            </li>
            <li className="flex flex-col">
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
                required
              />
            </li>
            <li className="flex flex-col">
              <span>Password Check</span>
              <input
                type="password"
                placeholder="Password Check"
                className="loginInput"
                required
              />
            </li>
          </ul>
          <div className="w-auto m-4 flex flex-col items-center gap-2">
            <input
              type="file"
              id="file"
              accept="image/*"
              className="w-full hidden"
              required
            />
            <label
              htmlFor="file"
              className="w-full flex justify-center items-center gap-2 text-white bg-orange-300 rounded-full text-lg font-semibold"
            >
              <AccountBoxRoundedIcon style={{ fontSize: "1.3rem" }} />
              Add my picture
            </label>
            <button className="w-full h-8 text-white text-lg font-bold bg-mainColor hover:bg-mainColor rounded-full">
              Register
            </button>
            {err && (
              <span className="text-sm">Something went wrong. Try again</span>
            )}
          </div>
        </form>
        <div className="w-full flex justify-center text-sm">
          {missingValueError && <MissingValueErrorMessage />}
          Do you have an account?{" "}
          <Link
            href="/login"
            className="text-mainColor font-bold underline underline-offset-4"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
