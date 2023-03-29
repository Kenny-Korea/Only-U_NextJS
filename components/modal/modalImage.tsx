import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

type Props = {
  images: string[];
  page: number | boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean | number>>;
};

const ModalImage = (props: Props) => {
  const { images, page, setModal } = props;

  const onClickExit = () => {
    setModal(false);
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-80 z-40">
      <CloseIcon
        className="fixed top-5 left-5 text-white text-4xl z-40"
        onClick={onClickExit}
      />
      <div className="w-full h-full relative">
        <Image
          src={typeof page === "number" ? images[page] : ""}
          alt=""
          fill
          sizes="20"
          style={{ objectFit: "contain" }}
        />
        <div className="w-20 h-8 rounded-full bg-black opacity-50 text-lg centerItem text-white absolute bottom-8 left-[calc(50%-2.5rem)]">
          {page} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ModalImage;
