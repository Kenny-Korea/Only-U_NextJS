import React, { useRef, useState } from "react";
import ModalLayout from "./layout";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Image from "next/image";
import { ModalPropsType } from "@/pages/post";

const ModalPost = (props: ModalPropsType) => {
  const [imageFileContainer, setImageFileContainer] = useState<File[]>([]);
  const [previewUrlContainer, setPreviewUrlContainer] = useState<string[]>([]);
  const [hashtagContainer, setHashtagContainer] = useState<string[]>([]);
  const hashtagRef = useRef<HTMLInputElement>(null);

  const addHashtag = () => {
    if (hashtagRef.current?.hasAttribute) {
      if (hashtagRef.current.value === "") return;
      setHashtagContainer(hashtagContainer.concat(hashtagRef.current.value));
      hashtagRef.current.value = "";
      hashtagRef.current.focus();
    }
  };

  const removeHashtag = (item) => {
    setHashtag(
      hashtag.filter((tag) => {
        return tag !== item;
      })
    );
  };

  const addImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  return (
    <ModalLayout modal={props.modal} setModal={props.setModal}>
      <button
        onClick={() => {
          console.log(imageFileContainer);
          console.log(previewUrlContainer);
        }}
      >
        click
      </button>
      포스트 작성
      {/* <ul className="flex flex-col gap-4 text-sm"> */}
      <li>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder="제목을 입력하세요"
          className="loginInput"
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
          />
          <button
            className="w-7 h-7 bg-mainColor text-white rounded-md centerItem"
            onClick={addHashtag}
          >
            <AddRoundedIcon style={{ fontSize: "1.2rem", fontWeight: "900" }} />
          </button>
        </div>
      </li>
      {hashtagContainer.length > 1 && (
        <div className="flex gap-2 px-1 text-xs">
          {hashtagContainer.map((item) => (
            <div key={item}>#{item}</div>
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
          // ref={fileRef}
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
          // ref={contentRef}
          // onFocus={handleFooter}
          // onBlur={handleFooter}
        />
      </li>
      {/* </ul> */}
      {/* <SubmitCancelButton
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            /> */}
    </ModalLayout>
  );
};

export default ModalPost;
