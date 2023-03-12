import React from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import Profile from "@/components/home/profile";
import Plan from "@/components/home/plan";

const Home = () => {
  const profileName = "Hello";
  const startDate = 123;
  return (
    <>
      <Profile />
      <Plan />
    </>
  );
};

export default Home;
