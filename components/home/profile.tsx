import React, { useMemo, useState } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import Image from "next/image";
import { useSelector } from "react-redux";
import { AuthState } from "@/state/reducers/authReducer";
import { useQuery } from "react-query";
import { readUser } from "@/api/apiService";
import ModalProfile from "../modal/modalProfile";
import { getDday } from "@/utils/dateFormat";
import unnamed from "../../public/unnamed.png";

const Profile = () => {
  const [modal, setModal] = useState(false);
  const userUid = useSelector((state: AuthState) => state.authReducer.userUid);

  // dependency를 localStroage.getItem으로 설정하게 되면
  // 매번 localStorage.getItem이 실행되므로 더 비효율적이지 않을까??
  const profileName = useMemo(() => {
    const savedName = localStorage.getItem("profileName");
    return savedName ? savedName : "프로필을 설정하세요";
  }, [localStorage.getItem("profileName")]);

  const startDate = useMemo(() => {
    const savedDate = localStorage.getItem("startDate");
    if (!savedDate) return;
    return getDday(new Date(savedDate).getTime()) + 1;
  }, [localStorage.getItem("startDate")]);

  const onClickProfile = () => {
    setModal(!modal);
  };

  const { data: user, error } = useQuery(
    ["user", userUid],
    () => readUser(userUid),
    {
      enabled: !!userUid,
    }
  );
  if (error) return <div>An error has occurred</div>;

  return (
    <>
      <div className="w-[35vh] h-[35vh] min-h-[35vh] min-w-[35vh] relative">
        <div className="w-full h-full rounded-full bg-white overflow-hidden flex relative border-8 border-bgColor">
          <div className="w-1/2 h-full bg-cover bg-center border-none relative">
            {user && (
              <Image
                src={user?.photoURL}
                alt=""
                fill
                sizes="20"
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div className="w-1/2 h-full bg-cover bg-center border-none relative">
            {user && (
              <Image
                src={user?.partnerInfo?.photoURL || unnamed}
                alt=""
                fill
                sizes="20"
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div
            className="absolute w-full h-20 bottom-0 bg-gradient-to-b from-transparent to-neutral-600 flex flex-col justify-center items-center gap-1"
            onClick={onClickProfile}
          >
            <span className="text-white text-lg font-bold ellipsis w-full text-center h-6 leading-6">
              {profileName}
            </span>
            <div className="centerItem text-white text-sm gap-2">
              <FavoriteRoundedIcon
                style={{ fontSize: ".8rem", color: "rgb(239, 68, 68)" }}
              />
              {startDate}
            </div>
          </div>
        </div>
      </div>
      {modal && <ModalProfile modal={modal} setModal={setModal} />}
    </>
  );
};

export default Profile;
