import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

type NavbarItems = {
  name: string;
  path: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}[];

export const navbarItems: NavbarItems = [
  {
    name: "Home",
    path: "/",
    icon: HomeRoundedIcon,
  },
  {
    name: "Post",
    path: "/post",
    icon: PhotoRoundedIcon,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: ChatBubbleOutlineRoundedIcon,
  },
  {
    name: "Place",
    path: "/place",
    icon: PlaceRoundedIcon,
  },
  {
    name: "Gift",
    path: "/gift",
    icon: CardGiftcardRoundedIcon,
  },
];
