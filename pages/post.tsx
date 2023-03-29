import PostItem from "@/components/card/post/postItem";
import CreateNewItemButton from "@/components/features/createNewItem";
import FilterBar, { FilterBarProps } from "@/components/features/filterBar";
import ModalImage from "@/components/modal/modalImage";
import ModalPost from "@/components/modal/modalPost";
import { useItemData } from "@/hooks/useItemData";
import { usePath } from "@/hooks/usePath";
import { PostData } from "@/types";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const Post = () => {
  useEffect(() => {
    const mode = localStorage.getItem("postView");
    if (!mode || mode === "flex") {
      if (postView === "flex") return; // 이미 flex mode면 state를 다시 변경할 필요 없음
      setPostView("flex");
    } else {
      setPostView("grid");
    }
  }, []);

  usePath("Post");
  const [modal, setModal] = useState(false);
  const [postView, setPostView] = useState<"flex" | "grid">("flex");
  const [imageModal, setImageModal] = useState<boolean | number>(false);
  const { data, isLoading, error } = useItemData("posts");

  const displayGridImages = useMemo(() => {
    if (!data) return;
    const array: string[] = [];
    // 이중 for문을 통해 각각의 data마다 갖고 있는 n개의 imageurl을 array에 순차적으로 담아줌
    for (let x of data) {
      for (let i = 0; i < x.imageurl.length; i++) {
        array.push(x.imageurl[i]);
      }
    }
    return array;
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  const openModal = () => {
    setModal(true);
  };

  const onClickGridImage = (index: number) => {
    setImageModal(index);
  };

  const filterBarProps: FilterBarProps = {
    type: "post" as const,
    state: postView,
    setState: setPostView,
  };

  const modalImageProps = {
    images: displayGridImages as string[],
    page: imageModal as number,
    setModal: setImageModal,
  };

  return (
    <>
      <FilterBar {...filterBarProps} />
      <div
        className={`w-full ${
          postView === "grid" ? "grid grid-cols-3  gap-2" : null
        }`}
      >
        {postView === "flex" &&
          Array.isArray(data) &&
          data.map((item: PostData, index) => (
            <PostItem
              item={data[data.length - index - 1]}
              postView={postView}
              key={item.id}
            />
          ))}
        {postView === "grid" &&
          Array.isArray(data) &&
          displayGridImages?.map((image, index) => (
            <div className="w-full h-28 relative">
              <Image
                src={image}
                alt=""
                fill
                sizes="20"
                style={{ objectFit: "cover" }}
                onClick={() => {
                  onClickGridImage(index);
                }}
              />
            </div>
          ))}
      </div>
      {typeof imageModal === "number" && <ModalImage {...modalImageProps} />}

      {modal && <ModalPost modal={modal} setModal={setModal} />}
      {!modal && (
        <div onClick={openModal}>
          <CreateNewItemButton path="Post" />
        </div>
      )}
      {!data || (data.length === 0 && "Add new post!")}
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
