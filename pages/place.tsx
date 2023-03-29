import { getUserInfo, readItems } from "@/api/apiService";
import PlaceItem from "@/components/card/place/placeItem";
import CreateNewItemButton from "@/components/features/createNewItem";
import ModalPlace from "@/components/modal/modalPlace";
import { useItemData } from "@/hooks/useItemData";
import { usePath } from "@/hooks/usePath";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import TableRowsIcon from "@mui/icons-material/TableRows";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getDocPath } from "@/api/serverSideApi";
import { auth } from "@/firebase";

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
  const [placeView, setPlaceView] = useState<"flex" | "grid">("flex");
  const { data, isLoading, error } = useItemData("places");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  const openModal = () => {
    setModal(true);
  };

  const onClickFlexView = () => {
    // 불필요한 state 변화에 의한 렌더링을 막기 위한 early return
    if (placeView === "flex") return;
    const mode = localStorage.getItem("placeView");
    if (mode === "flex") return;
    localStorage.setItem("placeView", "flex");
    setPlaceView("flex");
  };

  console.log();

  const onClickGridView = () => {
    // 불필요한 state 변화에 의한 렌더링을 막기 위한 early return
    if (placeView === "grid") return;
    const mode = localStorage.getItem("placeView");
    if (mode === "grid") return;
    localStorage.setItem("placeView", "grid");
    setPlaceView("grid");
  };

  return (
    <>
      <div className="flex gap-2 justify-end">
        <TableRowsIcon onClick={onClickFlexView} />
        <GridViewSharpIcon onClick={onClickGridView} />
      </div>
      <div
        className={`${placeView === "grid" ? "grid grid-cols-2 gap-2" : null}`}
      >
        {data?.map((item) => (
          <PlaceItem item={item} placeView={placeView} key={item.id} />
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
