import { useRef, useState } from "react";
import ModalLayout from "./layout";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Image from "next/image";
import { ItemArg, ModalProps, PostArg } from "@/types";
import { createItem } from "@/api/apiService";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { MissingValueErrorMessage } from "@/utils/missingValueError";

const ModalPost = (props: ModalProps) => {
  const { modal, setModal } = props; // 각 개별 모달의 상태를 전역적으로 관리할 필요는 없기 때문에 local state로 관리
  const [missingValueError, setMissingValueError] = useState<boolean>(false);
  const [imageFileContainer, setImageFileContainer] = useState<File[]>([]);
  const [previewUrlContainer, setPreviewUrlContainer] = useState<string[]>([]);
  const [hashtagContainer, setHashtagContainer] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const hashtagRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  //* useMutation
  const mutation = useMutation(
    (data: ItemArg<PostArg>) => {
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

    const data: ItemArg<PostArg> = {
      id: null,
      title: titleRef.current?.value,
      hashtag: hashtagContainer,
      content: contentRef.current?.value,
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

  const addHashtag = () => {
    if (hashtagRef.current?.hasAttribute) {
      if (hashtagRef.current.value === "") return;
      const hashtagValue = hashtagRef.current.value;
      setHashtagContainer([...hashtagContainer.concat(hashtagValue)]);
      hashtagRef.current.value = "";
      hashtagRef.current.focus();
    }
  };

  const removeHashtag = (item: string) => {
    setHashtagContainer([
      ...hashtagContainer.filter((hashtag) => {
        return hashtag !== item;
      }),
    ]);
  };

  const addImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 지금 좀 문제 있음
    if (e.currentTarget.files) {
      const previewFilesArray = [...e.currentTarget.files];
      const previewsToUrl = previewFilesArray.map((item) =>
        URL.createObjectURL(item)
      );
      const imageFile = [...e.currentTarget.files];
      setPreviewUrlContainer([...previewUrlContainer.concat(previewsToUrl)]);
      setImageFileContainer([...imageFileContainer.concat(imageFile)]);
    }
  };

  const removeImageFile = (imageURL: string, index: number) => {
    // Preview를 제거할 뿐만 아니라 실제 파일도 함께 제거해줘야 함
    setPreviewUrlContainer([
      ...previewUrlContainer.filter((item) => item !== imageURL),
    ]);
    setImageFileContainer([...imageFileContainer.splice(index, 1)]);
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
      포스트 작성
      <li>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder="제목을 입력하세요"
          className="loginInput"
          ref={titleRef}
          onFocus={toggleNavbar}
          onBlur={toggleNavbar}
        />
      </li>
      <li>
        <label htmlFor="hashTag">해시태그</label>
        <div className="flex gap-2 items-center">
          <input
            id="hashTag"
            type="text"
            placeholder="태그할 내용을 입력하세요"
            className="loginInput"
            ref={hashtagRef}
            onFocus={toggleNavbar}
            onBlur={toggleNavbar}
          />
          <button
            className="w-7 h-7 bg-mainColor text-white rounded-md centerItem"
            onClick={addHashtag}
          >
            <AddRoundedIcon style={{ fontSize: "1.2rem", fontWeight: "900" }} />
          </button>
        </div>
      </li>
      {hashtagContainer.length > 0 && (
        <div className="flex gap-2 px-1 text-xs">
          {hashtagContainer.map((item) => (
            <div
              key={item}
              onClick={() => {
                removeHashtag(item);
              }}
            >
              #{item}
            </div>
          ))}
        </div>
      )}
      <li>
        <span className="px-1 text-sm">이미지</span>
        <input
          type="file"
          id="image"
          accept="image/*"
          multiple
          className="hidden"
          onChange={addImageFile}
        />
        <div className="flex items-center gap-2">
          <div className="w-full h-12 bg-white flex items-center gap-1 overflow-x-scroll rounded-md border border-gray-200">
            {previewUrlContainer?.map((imageURL, index) => {
              return (
                <div
                  className="min-w-[2.5rem] w-10 h-10 relative"
                  key={imageURL}
                  onClick={() => {
                    removeImageFile(imageURL, index);
                  }}
                >
                  <Image src={imageURL} alt="pp" quality={50} fill />
                </div>
              );
            })}
          </div>
          <label
            htmlFor="image"
            className="w-7 h-7 bg-mainColor rounded-lg flex justify-center items-center text-white"
          >
            <AddRoundedIcon style={{ fontSize: "1.2rem", fontWeight: "900" }} />
          </label>
        </div>
      </li>
      <li className="flex flex-col">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          cols={30}
          rows={4}
          placeholder="내용을 입력하세요"
          className="textArea"
          ref={contentRef}
          onFocus={toggleNavbar}
          onBlur={toggleNavbar}
        />
      </li>
      {missingValueError && <MissingValueErrorMessage />}
    </ModalLayout>
  );
};

export default ModalPost;
