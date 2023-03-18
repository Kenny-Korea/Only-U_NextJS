import { readItems } from "@/api/apiService";
import PostItem from "@/components/card/post/postItem";
import CreateNewItemButton from "@/components/features/openModal";
import ModalPost from "@/components/modal/modalPost";
import { usePath } from "@/hooks/usePath";
import { PostData } from "@/types";
import { useState } from "react";
import { useQuery } from "react-query";

const Post = () => {
  usePath("Post");
  // const { jsonData } = props;
  // let data;
  // if (jsonData) {
  //   console.log("maja");
  //   data = JSON.parse(jsonData);
  // }

  const [modal, setModal] = useState(false);
  const { isLoading, error, data, isFetching } = useQuery<PostData[]>(
    "getPosts",
    () => {
      return readItems("posts");
    },
    { staleTime: 600000, keepPreviousData: true }
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error;
  console.log(isFetching);
  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      {data &&
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
//   const data = await readItems("posts");
//   return {
//     props: {
//       jsonData: JSON.stringify(data),
//     },
//   };
// }

// useEffect(() => {
//   const array: any = [];
//   readItems("posts")
//     .then((item) => {
//       array.push(...item);
//     })
//     .then(() => {
//       setItems(array);
//     });
// }, []);

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//      allow read, write: if request.auth != null;
//     }
//   }
// }

// FF766B
