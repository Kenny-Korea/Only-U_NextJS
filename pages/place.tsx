import { readItems } from "@/api/apiService";
import PlaceItem from "@/components/card/place/placeItem";
import CreateNewItemButton from "@/components/features/openModal";
import ModalPlace from "@/components/modal/modalPlace";
import { useItemData } from "@/hooks/useItemData";
import { usePath } from "@/hooks/usePath";
import { useState } from "react";
import { dehydrate, QueryClient } from "react-query";

const Place = () => {
  usePath("Place");
  const [modal, setModal] = useState(false);
  const { data, isLoading, error } = useItemData("places");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  const openModal = () => {
    setModal(true);
  };

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

export const test = "yWlfq9J67FMV6NTQfbooyvbc1AE2npGmAubtu7ReiqdN8PtgxRw8w6s2";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getPlaces", () => {
    return readItems("places", test);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
