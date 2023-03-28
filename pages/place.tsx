import { readItems } from "@/api/apiService";
import PlaceItem from "@/components/card/place/placeItem";
import CreateNewItemButton from "@/components/features/createNewItem";
import ModalPlace from "@/components/modal/modalPlace";
import { useItemData } from "@/hooks/useItemData";
import { usePath } from "@/hooks/usePath";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import TableRowsIcon from "@mui/icons-material/TableRows";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";

const Place = () => {
  usePath("Place");
  const [modal, setModal] = useState(false);
  const [placeView, setPlaceView] = useState<boolean>(false);
  const { data, isLoading, error } = useItemData("places");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  const openModal = () => {
    setModal(true);
  };

  const togglePlaceView = () => {
    setPlaceView(!placeView);
  };

  return (
    <>
      <div className="flex gap-2 justify-end">
        <TableRowsIcon onClick={togglePlaceView} />
        <GridViewSharpIcon onClick={togglePlaceView} />
      </div>
      <div className={`${placeView ? "grid grid-cols-2 gap-2" : null}`}>
        {data?.map((item) => (
          <PlaceItem item={item} placeView={placeView} />
        ))}
      </div>
      {modal && <ModalPlace modal={modal} setModal={setModal} />}
      {!modal && (
        <div onClick={openModal}>
          <CreateNewItemButton path="Place" />
        </div>
      )}
      {!data || (data.length === 0 && "Add new place!")}
    </>
  );
};

export default Place;

export const test = "yWlfq9J67FMV6NTQfbooyvbc1AE2npGmAubtu7ReiqdN8PtgxRw8w6s2";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["places"], () => {
    return readItems("places", test);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
