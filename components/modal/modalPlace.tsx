import { createItem } from "@/api/apiService";
import { ItemArg, ModalProps, PlaceArg } from "@/types";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import GoogleMapContainer from "../card/post/googlemaps";
import ModalLayout from "./layout";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { MissingValueErrorMessage } from "@/utils/missingValueError";

type placeInfo = {
  title: string;
  rating: any;
  address: string;
};
const initialValue = {
  name: null,
  address: null,
  image: null,
  rating: null,
  placeId: null,
};
const ModalPlace = (props: ModalProps) => {
  const { modal, setModal } = props;
  const [missingValueError, setMissingValueError] = useState<boolean>(false);
  const [imageFileContainer, setImageFileContainer] = useState<File[]>([]);
  const [placeType, setPlaceType] = useState<"food" | "place">("food");
  const [rating, setRating] = useState<number>(3);
  const [placeInfo, setPlaceInfo] = useState(initialValue);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  //* useMutation
  const mutation = useMutation(
    (data: ItemArg<PlaceArg>) => {
      return createItem("posts", data, imageFileContainer);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getPosts");
        dispatch({ type: "UPLOADING_DONE" });
        setModal(false);
      },
      onError: () => {
        alert("Failed to upload posts. Please try again");
        dispatch({ type: "UPLOADING_DONE" });
        setModal(false);
      },
    }
  );

  const onClickSubmit = async () => {
    dispatch({ type: "UPLOADING_STARTS" });
    // 예외 처리
    if (
      !titleRef.current?.value ||
      !contentRef.current?.value ||
      imageFileContainer.length === 0 ||
      !Array.isArray(imageFileContainer)
    ) {
      setMissingValueError(true);
      return;
    }

    const data: ItemArg<PlaceArg> = {
      id: null,
      title: titleRef.current?.value,
      content: contentRef.current?.value,
      placetype: "food",
      rating: 3,
      imageurl: null,
      writer: "kenny",
      regdate: null,
    };
    // mutation 객체에 데이터 전달
    mutation.mutate(data);
  };

  const onClickCancel = () => {
    setModal(false);
  };

  const togglePlaceType = () => {};

  const toggleNavbar = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };

  return (
    <ModalLayout
      modal={modal}
      onClickSubmit={onClickSubmit}
      onClickCancel={onClickCancel}
    >
      <div className="rounded-xl overflow-hidden shadow-md m-2 p-2 bg-white flex flex-col relative">
        <GoogleMapContainer placeInfo={placeInfo} setPlaceInfo={setPlaceInfo} />

        <table className="w-full mt-3 border-separate">
          <tbody>
            <tr>
              <td>장소명</td>
              <td>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Place Name"
                    className="w-full border-spacing-0 text-xs outline-none"
                    ref={titleRef}
                    // value={placeNameValue}
                    // onChange={handlePlaceName}
                    onFocus={toggleNavbar}
                    onBlur={toggleNavbar}
                  />
                  <div
                    className="w-28 flex justify-center text-xs bg-pink-200 shadow-md rounded-lg"
                    // onClick={copyNameFromMap}
                  >
                    <ContentCopyIcon />
                    <div>From Map</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>평점</td>
              <td className="text-sm">
                <ul className="flex gap-2">
                  {/* <li className="text-main" id={1} onClick={handleRate}>
                    ★
                  </li>
                  <li className="text-main" id={2} onClick={handleRate}>
                    ★
                  </li>
                  <li className="text-main" id={3} onClick={handleRate}>
                    ★
                  </li>
                  <li className="text-main" id={4} onClick={handleRate}>
                    ☆
                  </li>
                  <li className="text-main" id={5} onClick={handleRate}>
                    ☆
                  </li> */}
                </ul>
              </td>
            </tr>
            <tr>
              <td>타입</td>
              <td>
                <div className="flex gap-4 text-xs">
                  <div
                    className={`flex items-center ${
                      placeType === "food"
                        ? "text-main font-bold"
                        : "text-gray-500"
                    } `}
                    onClick={() => {
                      setPlaceType("food");
                    }}
                  >
                    Food
                  </div>
                  <div
                    className={`flex items-center ${
                      placeType === "place"
                        ? "text-main font-bold"
                        : "text-gray-500"
                    } `}
                    onClick={() => {
                      setPlaceType("place");
                    }}
                  >
                    Place
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>이미지</td>
              <td>
                <div className="flex items-center text-xs text-textBlack">
                  <input
                    type="file"
                    id="file"
                    className="h-4 hidden"
                    accept="image/*"
                    ref={imageFileRef}
                    // onChange={handleFileName}
                    // onFocus={handleFooter}
                    // onBlur={handleFooter}
                  />
                  <label htmlFor="file" className="mr-1 text-main">
                    <AddPhotoAlternateRoundedIcon
                      style={{ fontSize: "1.2rem" }}
                    />
                  </label>
                  {/* {fileName ? fileName : "No Image (use Google Image)"} */}
                </div>
              </td>
            </tr>
            <tr>
              <td>설명</td>
              <td>
                <textarea
                  cols={30}
                  rows={2}
                  placeholder="Description"
                  className="pt-1 resize-none outline-none text-xs w-full leading-tight"
                  ref={contentRef}
                  onFocus={toggleNavbar}
                  onBlur={toggleNavbar}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {missingValueError && <MissingValueErrorMessage />}
    </ModalLayout>
  );
};

export default ModalPlace;
