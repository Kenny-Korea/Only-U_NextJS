import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  images: string[];
  currentPage: number;
  setModal: React.Dispatch<React.SetStateAction<boolean | number>>;
};

const ModalImage = (props: Props) => {
  const { images, currentPage, setModal } = props;

  const toPrevImage = () => {
    if (currentPage === images.length - 1 || typeof currentPage === "boolean")
      return;
    setModal((prev) => {
      return (prev as number) + 1;
    });
  };

  const toNextImage = () => {
    if (currentPage === 0 || typeof currentPage === "boolean") return;
    setModal((prev) => {
      return (prev as number) - 1;
    });
  };

  const onClickExit = () => {
    setModal(false);
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-80 z-40">
      <CloseIcon
        className="fixed top-5 left-5 text-white text-4xl z-50"
        onClick={onClickExit}
      />
      <div className="w-full h-full relative z-40">
        <Image
          src={typeof currentPage === "number" ? images[currentPage] : ""}
          alt=""
          fill
          sizes="20"
          style={{ objectFit: "contain" }}
        />
        <div className="w-20 h-8 rounded-full bg-black bg-opacity-50 text-lg centerItem text-white absolute bottom-8 left-[calc(50%-2.5rem)]">
          {images.length - currentPage} / {images.length}
        </div>
        <div className="modalArrow left-0" onClick={toPrevImage}>
          <ArrowBackIosNewIcon />
        </div>
        <div className="modalArrow right-0" onClick={toNextImage}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default ModalImage;
