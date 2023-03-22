import PostItem from "@/components/card/post/postItem";
import CreateNewItemButton from "@/components/features/openModal";
import ModalPost from "@/components/modal/modalPost";
import { useItemData } from "@/hooks/useItemData";
import { usePath } from "@/hooks/usePath";
import { PostData } from "@/types";
import { useState } from "react";

const Post = () => {
  usePath("Post");
  const [modal, setModal] = useState(false);
  const { data, isLoading, error } = useItemData("posts");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      {Array.isArray(data) &&
        data.map((item: PostData) => <PostItem item={item} key={item.id} />)}
      {modal && <ModalPost modal={modal} setModal={setModal} />}
      {!modal && (
        <div onClick={openModal}>
          <CreateNewItemButton path="Post" />
        </div>
      )}
      {!data && "Add new post!"}
    </>
  );
};

export default Post;

// export async function getServerSideProps() {
//   let combinedId = "yWlfq9J67FMV6NTQfbooyvbc1AE2npGmAubtu7ReiqdN8PtgxRw8w6s2";

//   const userUid = useSelector((state: AuthState) => state.authReducer.userUid);

//   const queryClient = new QueryClient();
//   const test = await queryClient.prefetchQuery(["getUser", userUid], () =>
//     getUserInfo(userUid)
//   );
//   console.log(test);

//   await queryClient.prefetchQuery(["getPosts", combinedId], () =>
//     readItems("posts", combinedId)
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
