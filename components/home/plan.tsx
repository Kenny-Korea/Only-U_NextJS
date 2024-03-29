import { useState } from "react";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlanItem from "../card/planItem";
import { dehydrate, QueryClient } from "react-query";
import { readItems, readUser } from "@/api/apiService";
import ModalPlan from "../modal/modalPlan";
import { useItemData } from "@/hooks/useItemData";
import { auth } from "@/firebase";
import { getAuth, getIdToken } from "firebase/auth";

const Plan = () => {
  console.log(auth.currentUser);
  const [modal, setModal] = useState(false);
  const { data, isLoading, error } = useItemData("plans");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  const openModal = () => {
    setModal(true);
  };

  const getToken = () => {
    // const token = await getIdToken();
  };

  return (
    <>
      <div className="w-full max-h-[60vh] flex flex-col gap-2 pt-2">
        <div className="apartItem bg-mainColor pl-3 pr-1 h-8 text-lg text-white bg-main rounded-full">
          <div className="flex items-center gap-2 font-bold" onClick={getToken}>
            <CalendarTodayRoundedIcon style={{ fontSize: "1.2rem" }} />
            Plan
          </div>
          <div className="w-6 h-6 bg-white text-mainColor rounded-full centerItem">
            <AddRoundedIcon onClick={openModal} />
          </div>
        </div>
        <div className="w-full h-4/5 overflow-y-scroll">
          <div className="w-full h-fit flex flex-col gap-2">
            <hr />
            {modal && <ModalPlan modal={modal} setModal={setModal} />}
            {data && data.map((item) => <PlanItem item={item} key={item.id} />)}
            {!data || (data.length === 0 && "Add new plan!")}
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;

export const test = "yWlfq9J67FMV6NTQfbooyvbc1AE2npGmAubtu7ReiqdN8PtgxRw8w6s2";

export async function getServerSideProps() {
  // https://jasonkang14.github.io/nextjs/check-the-performance-of-getserversideprops

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["user"], () => {
    return readUser(test);
  });
  await queryClient.prefetchQuery(["plans"], () => {
    return readItems("plans", test);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
