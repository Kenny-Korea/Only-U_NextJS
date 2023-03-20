import React from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import Image from "next/image";
import test from "/public/OnlyU-512.png";
import unnamed from "/public/unnamed.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const profileName = "Gwangja Couple";
  const startDate = 1234;
  const userImage = useSelector((state: any) => state.authReducer);
  return (
    <>
      <div className="w-[35vh] h-[35vh] min-h-[35vh] min-w-[35vh] relative">
        <div className="w-full h-full rounded-full bg-white overflow-hidden flex relative border-8 border-bgColor">
          <div
            className="w-1/2 h-full bg-cover bg-center border-none"
            onClick={() => {
              console.log(userImage);
            }}
          >
            <Image
              src={userImage}
              alt=""
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="w-1/2 h-full bg-cover bg-center border-none">
            {/* <Image
              src={unnamed}
              alt=""
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            /> */}
          </div>
          <div className="absolute w-full h-20 bottom-0 bg-gradient-to-b from-transparent to-neutral-600 flex flex-col justify-center items-center gap-1">
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
    </>
  );
};

export default Profile;
