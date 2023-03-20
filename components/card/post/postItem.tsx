//! state 변화가 많이 일어나는 컴포넌트이므로, 렌더링 최적화에 특별히 신경쓰기
// memoization 활용하기
// touchEvent를 state가 아닌 다른 값으로 사용할 수 있는 방법을 고민해보기

import { ItemProps, PostData } from "@/types";
import { dateFormat } from "@/utils/dateFormat";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import EditButton from "../../features/modifyItem";

const PostItem = (props: ItemProps<PostData>) => {
  const { item } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstTouchX, setFirstTouchX] = useState(0);
  // const { currentUser } = useContext(AuthContext);
  // const { partnerInfo } = useContext(PartnerContext);
  // const currentUser = {
  //   uid: "yWlfq9J67FMV6NTQfbooyvbc1AE2npGmAubtu7ReiqdN8PtgxRw8w6s2",
  //   imageurl: "abc",
  // };
  // const partnerInfo = {
  //   uid: "yWlfq9J67FMV6NTQfbooyvbc1AE2npGmAubtu7ReiqdN8PtgxRw8w6s2",
  //   imageurl: "abc",
  // };
  const [isDetailOpen, setIsDetailOpen] = useState<boolean | null>(null);

  const titleRef = useRef<HTMLSpanElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const toPrevImage = () => {
    // if (!item.imageurl) return; // imageurl을 optional로 지정했으므로
    const isFirstSlide = currentIndex === 0; // boolean
    if (isFirstSlide) return;
    const newIndex = currentIndex - 1;
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = `translate(-${
        100 * (currentIndex - 1)
      }%)`;
    }
    setCurrentIndex(newIndex);
  };

  const toNextImage = () => {
    // if (!item.imageurl) return; // imageurl을 optional로 지정했으므로
    const isLastSlide = currentIndex === item.imageurl.length - 1;
    if (isLastSlide) return;
    const newIndex = currentIndex + 1;
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = `translate(-${
        100 * (currentIndex + 1)
      }%)`;
    }
    setCurrentIndex(newIndex);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setFirstTouchX(e.changedTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const lastTouchX = e.changedTouches[0].clientX;
    const scrollX = firstTouchX - lastTouchX;
    if (scrollX < -30) toPrevImage();
    if (scrollX > 30) toNextImage();
  };

  const onTouchDetail = () => {
    if (isDetailOpen === null) {
      setIsDetailOpen(true);
      return;
    }
    setIsDetailOpen(!isDetailOpen);
  };

  const getRegisteredDate = useMemo(() => {
    return dateFormat(item.regdate);
  }, [item]);

  return (
    <>
      {/* 아... 너무 지저분하므로 꼭 여기는 정리하자 */}
      <div className="w-full flex justify-center">
        <div className="w-full h-fit card my-2 flex flex-col gap-1">
          {item ? (
            <div
              className="min-w-full bg-transparent h-[26rem] overflow-hidden relative flex items-end"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="w-full absolute top-0 flex justify-between p-2 z-10">
                <div className="flex flex-col gap-2">
                  <img
                    // src={
                    //   item.writer === currentUser.uid
                    //     ? currentUser?.imageurl
                    //     : partnerInfo?.imageurl
                    // }
                    alt=""
                    className="w-8 h-8 object-cover rounded-full border border-gray-300"
                  />
                  {Array.isArray(item.imageurl) && item.imageurl.length > 1 && (
                    <div className="w-9 h-5 rounded-full bg-black opacity-50 text-[9px] text-center align-middle leading-5 text-white">
                      {currentIndex + 1} / {item.imageurl.length}
                    </div>
                  )}
                </div>
                <EditButton item={item} docName="posts" />
              </div>

              {/* 위로 올라가는 이펙트 시작 */}
              <div
                className={`absolute w-full h-full text-white flex flex-col justify-center z-10`}
                id={
                  isDetailOpen === null
                    ? "defaultPostDetail"
                    : isDetailOpen
                    ? "showPostDetail"
                    : "hidePostDetail"
                }
                onClick={onTouchDetail}
              >
                <div className="w-full h-[8rem] bg-neutral-600 bg-opacity-60 flex flex-col justify-between px-3 py-2 rounded-tl-xl rounded-tr-xl">
                  <span
                    className={`font-bold text-[1.5rem] leading-7 ${
                      isDetailOpen
                        ? null
                        : "block whitespace-nowrap overflow-hidden text-ellipsis duration-500"
                    }`}
                    ref={titleRef}
                  >
                    {item?.title}
                  </span>
                  <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-hide">
                    <div className="max-h-6">
                      {item.hashtag?.map((data: any, index: number) => {
                        return (
                          <div className="hashtag" key={data + index}>
                            #{data}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-end text-xs text-gray-200">
                    posted at {getRegisteredDate}
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-y-4 text-xs w-full h-full bg-neutral-600 bg-opacity-60">
                  <hr />
                  {item?.content}
                </div>
              </div>
              {/* 위로 올라가는 이펙트 끝 */}
              <div
                className={`w-full h-full flex duration-500`}
                ref={imageContainerRef}
              >
                {item.imageurl.map((url: string) => {
                  return (
                    <div className="min-w-full h-full relative" key={url}>
                      <Image
                        src={url}
                        alt=""
                        // width={300}
                        // height={100}
                        fill
                        style={{ objectFit: "cover", overflow: "hidden" }}
                      />
                    </div>
                    // <div
                    //   key={url}
                    //   style={{ backgroundImage: `url(${url})` }}
                    //   className="min-w-full h-full bg-cover bg-no-repeat bg-center"
                    // />
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

export default PostItem;
