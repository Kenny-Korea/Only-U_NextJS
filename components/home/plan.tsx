import { useState } from "react";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlanItem from "../card/planItem";
import { QueryClient, useQuery } from "react-query";
import { PlanData } from "@/types";
import { readItems } from "@/api/apiService";
import ModalPlan from "../modal/modalPlan";
import { useSelector } from "react-redux";

// export async function getServerSideProps() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery("getPlans", () => {
//     return readItems("plans", "yWlfq9J67FMV6NTQfbooyvbc1AE2" + userUid);
//   });
// }

const Plan = () => {
  const [modal, setModal] = useState(false);
  const userUid = useSelector((state: any) => state.authReducer.userUid);
  const currentUser = useSelector((state: any) => state.authReducer);
  const { isLoading, error, data, isFetching } = useQuery<PlanData[]>(
    "getPlans",
    () => {
      console.log("yWlfq9J67FMV6NTQfbooyvbc1AE2" + userUid);
      return readItems("plans", "yWlfq9J67FMV6NTQfbooyvbc1AE2" + userUid);
    },
    { enabled: !!userUid }
    // { staleTime: 30000, keepPreviousData: true }
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;
  console.log({ isLoading, isFetching });
  const openModal = () => {
    setModal(true);
  };
  return (
    <>
      <div className="min-w-full min-h-[40vh] h-[60vh] flex flex-col gap-2 pt-2">
        <div className="apartItem bg-mainColor pl-3 pr-1 h-8 text-lg text-white bg-main rounded-full">
          <div
            className="flex items-center gap-2 font-bold"
            onClick={() => {
              console.log(currentUser);
            }}
          >
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
            {data && data.length === 0 && "Add new plan!"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
