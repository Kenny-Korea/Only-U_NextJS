import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useRouter } from "next/router";

type Props = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type Title = "Partner" | "Settings" | "Logout";

const property = { fontSize: "2rem", color: "rgb(255, 118, 107" };

const settingsButton: { title: Title; icon: any }[] = [
  { title: "Partner", icon: <GroupRoundedIcon style={{ ...property }} /> },
  { title: "Settings", icon: <SettingsRoundedIcon style={{ ...property }} /> },
  { title: "Logout", icon: <LogoutRoundedIcon style={{ ...property }} /> },
];

const ModalSettings = (props: Props) => {
  const { modal, setModal } = props;
  const router = useRouter();
  const onClickMenu = (title: Title) => {
    // setModal(false);
    switch (title) {
      case "Partner":
        router.push("partner");
        break;
      case "Settings":
        router.push("settings");
        break;
      case "Logout":
        signOut(auth).then(() => {
          router.replace("/login");
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className="w-14 h-[calc(100vh-8rem)] absolute top-[4rem] pt-3 flex flex-col items-center gap-3 z-30 shadow-md bg-white rounded-xl duration-300"
        id={modal ? "settingSlideIn" : "settingSlideOut"}
      >
        {settingsButton.map((button) => {
          return (
            <div
              className="flex flex-col items-center text-[10px] font-semibold gap-0"
              onClick={() => {
                onClickMenu(button.title);
              }}
            >
              {button.icon}
              {button.title}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ModalSettings;
