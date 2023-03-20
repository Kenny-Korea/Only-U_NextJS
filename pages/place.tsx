import { readItems } from "@/api/apiService";
import PlaceItem from "@/components/card/place/placeItem";
import CreateNewItemButton from "@/components/features/openModal";
import ModalPlace from "@/components/modal/modalPlace";
import { usePath } from "@/hooks/usePath";
import { PlaceData } from "@/types";
import { useState } from "react";
import { useQuery } from "react-query";

const Place = () => {
  usePath("Place");

  const [modal, setModal] = useState(false);
  const { isLoading, error, data, isFetching } = useQuery<PlaceData[]>(
    "getPlaces",
    () => {
      // const userUid = localStorage.getItem("userUid");
      return readItems("places", userUid);
    },
    { staleTime: 30000, keepPreviousData: true }
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error;
  console.log(isFetching);
  const openModal = () => {
    setModal(true);
  };
  console.log(data);

  return (
    <>
      {data?.map((item) => (
        <PlaceItem item={item} />
      ))}
      {modal && <ModalPlace modal={modal} setModal={setModal} />}
      {!modal && (
        <div onClick={openModal}>
          <CreateNewItemButton path="Place" />
        </div>
      )}
      {!data && "Add new place!"}
    </>
  );
};

export default Place;
