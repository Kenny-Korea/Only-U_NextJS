import { ItemProps, PlaceData } from "@/types";
import { toDate } from "@/utils/dateFormat";
import Image from "next/image";
import React, { useMemo } from "react";
import EditButton from "../../features/modifyItem";

const PlaceItem = (props: ItemProps<PlaceData>) => {
  const { item, placeView } = props;

  // 함수가 재호출되는 것을 방지하기 위해 useMemo
  const displayRatings = useMemo(() => {
    let result = "";
    for (let i = 0; i < item.rating; i++) {
      result += "★";
    }
    return result;
  }, [item.rating]);

  return (
    <>
      <div
        className={`w-full h-auto rounded-md bg-white shadow-md relative ${
          placeView ? "p-1 min-h-[8rem]" : "mb-3 p-2 flex gap-2 min-h-[5rem]"
        } `}
      >
        {item.imageurl && (
          <div
            className={`relative shadow-md ${
              placeView
                ? "min-w-[8rem] w-full h-16"
                : "min-w-[4rem] h-full min-h-[5rem]"
            } `}
          >
            <Image
              src={item.imageurl[0]}
              alt=""
              fill
              sizes="20"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div className="w-full flex flex-col">
          <div className="flex justify-between">
            <span className="text-sm ellipsis w-48">{item?.title}</span>
            {/* <LocationOnRoundedIcon /> */}
            <EditButton item={item} type="places" />
          </div>
          <span className="text-sm text-starColor">{displayRatings}</span>
          <span className="text-xs">{item.content}</span>
          <div className="text-xs h-4"></div>
          <span className="text-xs text-gray-500 absolute bottom-1 right-1">
            visited at {toDate(item.regdate)}
          </span>
        </div>
      </div>

      {/* {placeView && (
        <div className="w-full h-auto rounded-md bg-white shadow-md p-1 min-h-[8rem]">
          {item.imageurl && (
            <div className="min-w-[8rem] w-full h-16 relative shadow-md">
              <Image
                src={item.imageurl[0]}
                alt=""
                fill
                sizes="20"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div className="w-full flex flex-col relative">
            <div className="flex justify-between">
              <span className="text-sm ellipsis w-48">{item?.title}</span>
              <EditButton item={item} docName="places" />
            </div>
            <span className="text-sm text-starColor">{displayRatings}</span>
            <span className="text-xs">{item.content}</span>
            <div className="text-xs h-4"></div>
            <span className="text-xs text-gray-500 absolute block bottom-0 right-0">
              visited at {toDate(item.regdate)}
            </span>
          </div>
        </div>
      )} */}
    </>
  );
};

export default PlaceItem;
