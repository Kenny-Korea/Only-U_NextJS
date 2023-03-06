import React, { useContext, useRef, useState } from "react";
import ProfileImageSmall from "../Profile/ProfileImageSmall";
import { AuthContext } from "../../Context/AuthContext";
import "../../App.css";
import ModifyButton from "../Buttons/ModifyButton";
import { PartnerContext } from "../../Context/PartnerContext";

const PostCard = ({ post, index }) => {
  const handleSettings = (e) => {
    // Update, Delete 기능 추가해야 함
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstTouchX, setFirstTouchX] = useState(0);
  const imageContainerRef = useRef();
  const { currentUser } = useContext(AuthContext);
  const { partnerInfo } = useContext(PartnerContext);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const titleRef = useRef();

  const toPrevImage = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? post.url.length - 1 : currentIndex - 1;
    if (isFirstSlide) {
      return;
    } else {
      imageContainerRef.current.style.transform = `translate(-${
        100 * (currentIndex - 1)
      }%)`;
    }
    setCurrentIndex(newIndex);
  };
  const toNextImage = () => {
    const isLastSlide = currentIndex === post.url.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    if (isLastSlide) {
      return;
    } else {
      imageContainerRef.current.style.transform = `translate(-${
        100 * (currentIndex + 1)
      }%)`;
    }
    setCurrentIndex(newIndex);
  };

  const onTouchStart = (e) => {
    // e.preventDefault();
    setFirstTouchX(e.changedTouches[0].clientX);
  };

  const onTouchEnd = (e) => {
    // e.preventDefault();
    const lastTouchX = e.changedTouches[0].clientX;
    const scrollX = firstTouchX - lastTouchX;
    if (scrollX < -30) {
      toPrevImage();
    } else if (scrollX > 30) {
      toNextImage();
    } else {
      return;
    }
  };

  const handleClick = () => {
    if (isDetailOpen === false || isDetailOpen === "closed") {
      setIsDetailOpen("opened");
    } else {
      setIsDetailOpen("closed");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full h-fit card my-2 flex flex-col gap-1">
          {post ? (
            <div
              className="min-w-full bg-transparent h-[26rem] overflow-hidden relative flex items-end"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="w-full absolute top-0 flex justify-between p-2 z-10">
                <div className="flex flex-col gap-2">
                  <img
                    src={
                      post.writer === currentUser.uid
                        ? currentUser?.photoURL
                        : partnerInfo?.photoURL
                    }
                    alt=""
                    className="w-8 h-8 object-cover rounded-full border border-gray-300"
                  />
                  {post?.url[1] ? (
                    <div className="w-9 h-5 rounded-full bg-black opacity-50 text-[9px] text-center align-middle leading-5 text-white">
                      {currentIndex + 1} / {post.url.length}
                    </div>
                  ) : null}
                </div>
                <ModifyButton item={post} docName="posts" />
              </div>

              {/* 위로 올라가는 이펙트 시작 */}
              <div
                className={`absolute w-full h-full text-white flex flex-col justify-center z-10`}
                id={
                  !isDetailOpen
                    ? "defaultPostDetail"
                    : isDetailOpen === "opened"
                    ? "showPostDetail"
                    : "hidePostDetail"
                }
                onClick={handleClick}
              >
                <div
                  className={`w-full bg-neutral-600 bg-opacity-60 flex flex-col gap-2 p-3 rounded-tl-xl rounded-tr-xl ${
                    isDetailOpen === "opened" ? "h-fit" : "h-[8rem]"
                  }`}
                >
                  <span
                    className={`font-bold text-2xl leading-7 ${
                      isDetailOpen === "opened"
                        ? null
                        : "block whitespace-nowrap overflow-hidden text-ellipsis duration-500"
                    }`}
                    ref={titleRef}
                  >
                    {post?.title}
                  </span>
                  <div className="flex gap-x-2 text-sm overflow-hidden">
                    {post?.hashTag.map((item, index) => {
                      return (
                        <div
                          className="h-5 w-fit px-2 text-white text-xs text-center rounded-full leading-5 border border-main hashTag"
                          key={item + index}
                        >
                          #{item}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-end text-xs text-gray-200">
                    posted at{" "}
                    {new Intl.DateTimeFormat("ko-KR").format(
                      post.date.seconds * 1000
                    )}
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-y-4 text-xs w-full h-full bg-neutral-600 bg-opacity-60">
                  <hr />
                  {post?.content}
                </div>
              </div>
              {/* 위로 올라가는 이펙트 끝 */}
              <div
                className={`w-full h-full flex duration-500`}
                ref={imageContainerRef}
              >
                {post?.url?.map((image) => {
                  return (
                    <div
                      style={{ backgroundImage: `url(${image})` }}
                      className="min-w-full h-full bg-cover bg-no-repeat bg-center"
                    ></div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PostCard;
