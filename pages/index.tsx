import Profile from "@/components/home/profile";
import Plan from "@/components/home/plan";
import { usePath } from "@/hooks/usePath";

const Home = () => {
  usePath("Home");
  console.log("home");

  return (
    <>
      <Profile />
      <Plan />
    </>
  );
};

export default Home;
