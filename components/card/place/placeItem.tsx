import { ItemProps, PlaceData } from "@/types";
import { dateFormat } from "@/utils/dateFormat";
import React from "react";
import EditButton from "../../features/modifyItem";

const PlaceItem = (props: ItemProps<PlaceData>) => {
  const { item } = props;

  const displayRatings = () => {
    let result = "";
    for (let i = 0; i < item.rating; i++) {
      result += "★";
    }
    return result;
  };

  return (
    <>
      <div className="w-full h-fit min-h-[5rem] rounded-md bg-white shadow-md mb-3 p-2 flex gap-2">
        <img
          src={item.imageurl.length > 0 ? item.imageurl[0] : ""} // 아직 그림은 1개만
          alt="pp"
          className="w-24 h-full min-h-[4.5rem] object-cover rounded-lg"
        />
        <div className="w-full flex flex-col relative">
          <div className="flex justify-between">
            <span className="text-sm">{item?.title}</span>
            {/* <LocationOnRoundedIcon /> */}
            <EditButton item={item} docName="places" />
          </div>
          <span className="text-sm text-starColor">{displayRatings()}</span>
          <span className="text-xs">{item.content}</span>
          <div className="text-xs h-4"></div>
          <span className="text-xs text-gray-500 absolute block bottom-0 right-0">
            visited at {dateFormat(item.regdate)}
          </span>
        </div>
      </div>
    </>
  );
};

export default PlaceItem;
