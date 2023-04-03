import Profile from "@/components/home/profile";
import Plan from "@/components/home/plan";
import { usePath } from "@/hooks/usePath";
import dynamic from "next/dynamic";

const Home = () => {
  usePath("Home");

  return (
    <>
      <ProfileWithoutSSR />
      <Plan />
    </>
  );
};

export default Home;

// localStorage에서 값을 가져와야 하므로 ssr 미적용 (ssr은 window 객체를 읽지 못하므로)
const ProfileWithoutSSR = dynamic(() => import("../components/home/profile"), {
  ssr: false,
});
