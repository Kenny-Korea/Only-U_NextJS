import { ItemArg, ModalProps, PlaceArg, Variables } from "@/types";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import GoogleMapContainer from "../card/place/googlemaps";
import ModalLayout from "./layout";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { MissingValueErrorMessage } from "@/utils/missingValueError";
import { useUserInfo } from "@/hooks/useUserInfo";
import { usePostMutation } from "@/hooks/usePostMutation";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

// const initialValue = {
//   name: null,
//   address: null,
//   image: null,
//   rating: null,
//   placeId: null,
// };

const ModalPlace = (props: ModalProps) => {
  const { modal, setModal } = props;
  const [missingValueError, setMissingValueError] = useState<boolean>(false);
  const [imageFileContainer, setImageFileContainer] = useState<File[]>([]);
  const [placeType, setPlaceType] = useState<"food" | "place">("food");
  const [rating, setRating] = useState<string>("3");
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult>();
  const [fileName, setFileName] = useState<string>();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLUListElement>(null);

  const dispatch = useDispatch();
  const user = useUserInfo();
  const { mutate } = usePostMutation();

  //* useMutation

  const onClickSubmit = async () => {
    // 1. 예외 처리
    if (
      !titleRef.current?.value ||
      !contentRef.current?.value
      // imageFileContainer.length === 0 ||
      // !Array.isArray(imageFileContainer)
    ) {
      setMissingValueError(true);
      return;
    }
    dispatch({ type: "UPLOADING_STARTS" });

    // 2. data 정의
    const data: ItemArg<PlaceArg> = {
      id: null,
      title: titleRef.current?.value,
      content: contentRef.current?.value,
      placetype: "food",
      rating: parseInt(rating),
      imageurl: null,
      writer: "kenny",
      regdate: null,
    };
    if (selectedPlace && selectedPlace.photos) {
      // 이미지 파일의 url을 업로드
      data.imageurl = [selectedPlace.photos[0]];
    }

    // 3. createItem 함수에 전달할 variables

    const variables: Variables = {
      type: "places",
      data,
      docPath: user?.combinedId,
      setModal,
    };
    if (imageFileRef.current !== null && imageFileRef.current.files !== null) {
      // 이미지 파일을 업로드
      variables.image = [imageFileRef.current.files[0]];
    }
    // else if (selectedPlace && selectedPlace.photos) {
    //   // 이미지 파일의 url을 업로드
    //   variables.data.imageurl = [selectedPlace.photos[0] as string];
    // }

    // 4. mutate 함수 호출
    mutate(variables);
  };

  const onClickCancel = () => {
    setModal(false);
  };

  const handleRating = (e: any) => {
    if (!ratingRef.current) return;
    setRating(e.target.id);
    const parsedRate = parseInt(e.target.id);
    for (let i = 0; i < 5; i++) {
      if (i < parsedRate) {
        ratingRef.current.children[i].innerHTML = "★";
      } else {
        ratingRef.current.children[i].innerHTML = "☆";
      }
    }
  };

  const copyNameFromMap = () => {
    if (!titleRef.current || !selectedPlace) return;
    titleRef.current.value = selectedPlace;
  };

  const handleFileName = (e: any) => {
    setFileName(e.currentTarget.files[0].name);
  };

  const toggleNavbar = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };

  return (
    <ModalLayout
      modal={modal}
      onClickSubmit={onClickSubmit}
      onClickCancel={onClickCancel}
    >
      <button
        onClick={() => {
          console.log(selectedPlace);
        }}
      >
        click
      </button>
      <GoogleMapContainer
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
      />
      <table className="w-full mt-2 border-separate">
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
                  className="w-14 h-5 centerItem text-[10px] bg-pink-200 shadow-md rounded-lg"
                  onClick={copyNameFromMap}
                >
                  <ContentCopyIcon style={{ width: 10 }} />
                  <div>Map</div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>평점</td>
            <td className="text-sm">
              <ul className="flex gap-2 text-mainColor" ref={ratingRef}>
                <li className="text-main" id="1" onClick={handleRating}>
                  ★
                </li>
                <li className="text-main" id="2" onClick={handleRating}>
                  ★
                </li>
                <li className="text-main" id="3" onClick={handleRating}>
                  ★
                </li>
                <li className="text-main" id="4" onClick={handleRating}>
                  ☆
                </li>
                <li className="text-main" id="5" onClick={handleRating}>
                  ☆
                </li>
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
                      ? "text-mainColor font-bold"
                      : "text-gray-500"
                  } `}
                  onClick={() => {
                    setPlaceType("food");
                  }}
                >
                  {placeType === "food" ? (
                    <CheckBoxIcon style={{ fontSize: 12 }} />
                  ) : (
                    <CheckBoxOutlineBlankIcon style={{ fontSize: 12 }} />
                  )}
                  Food
                </div>
                <div
                  className={`flex items-center ${
                    placeType === "place"
                      ? "text-mainColor font-bold"
                      : "text-gray-500"
                  } `}
                  onClick={() => {
                    setPlaceType("place");
                  }}
                >
                  {placeType === "place" ? (
                    <CheckBoxIcon style={{ fontSize: 12 }} />
                  ) : (
                    <CheckBoxOutlineBlankIcon style={{ fontSize: 12 }} />
                  )}
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
                  onChange={handleFileName}
                  // onFocus={handleFooter}
                  // onBlur={handleFooter}
                />
                <label htmlFor="file" className="text-mainColor px-0">
                  <AddPhotoAlternateRoundedIcon
                    style={{ fontSize: "1.2rem" }}
                  />
                </label>
                {fileName || "No Image (use Google Image)"}
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
      {missingValueError && <MissingValueErrorMessage />}
    </ModalLayout>
  );
};

export default ModalPlace;
