import PlaceItem from "@/components/card/place/placeItem";
import CreateNewItemButton from "@/components/features/createNewItem";
import ModalPlace from "@/components/modal/modalPlace";
import { useItemData } from "@/hooks/useItemData";
import { usePath } from "@/hooks/usePath";
import { useEffect, useState } from "react";
import FilterBar, { FilterBarProps } from "@/components/features/filterBar";

const Place = () => {
  useEffect(() => {
    const mode = localStorage.getItem("placeView");
    if (!mode || mode === "flex") {
      if (placeView === "flex") return; // 이미 flex mode면 state를 다시 변경할 필요 없음
      setPlaceView("flex");
    } else {
      setPlaceView("grid");
    }
  }, []);

  usePath("Place");
  const [modal, setModal] = useState(false);
  const [modalPlaceInfo, setModalPlaceInfo] = useState(false);
  const [placeView, setPlaceView] = useState<"flex" | "grid">("flex");
  const { data, isLoading, error } = useItemData("places");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  const openModal = () => {
    setModal(true);
  };

  const filterBarProps: FilterBarProps = {
    type: "place" as const,
    state: placeView,
    setState: setPlaceView,
  };

  return (
    <>
      <FilterBar {...filterBarProps} />
      <div
        className={`${placeView === "grid" ? "grid grid-cols-2 gap-2" : null}`}
      >
        {data?.map((item, index) => (
          <PlaceItem
            item={data[data.length - index - 1]}
            placeView={placeView}
            key={item.id}
          />
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

// export async function getServerSideProps() {
//   const { docPath } = await getDocPath();
//   console.log(docPath);
//   if (docPath) {
//     const queryClient = new QueryClient();
//     await queryClient.prefetchQuery(["places"], () => {
//       return readItems("places", docPath);
//     });

//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   }
// }
