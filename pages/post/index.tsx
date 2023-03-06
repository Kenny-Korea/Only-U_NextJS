import React, { useState, useEffect, useContext } from "react";
// import { useQuery } from "react-query";

// import AddButton from "../Components/Buttons/AddButton";
// import PostCard from "../Components/Cards/PostCard";
// import ModalPost from "../Components/Modal/ModalPost";
import { onSnapshot, doc } from "firebase/firestore";
// import { AuthContext } from "../Context/AuthContext";
import { db } from "../../firebase";
import { useFetch } from "@/useFetch";

// import { useRecoilState } from "recoil";
// import { hidingFooterState } from "../atoms";
// import { ReactQueryDevtools } from "react-query/devtools";

const Post = () =>
  // { size, setCurrentPage }
  {
    const size = "";
    // const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
    useEffect(() => {
      // setCurrentPage("Post");
      // setHideFooter(false);
      useFetch("post", "hello");
    }, []);
    const [addPost, setAddPost] = useState(false);
    const [posts, setPosts] = useState([]);
    // const { partnerInfo } = useContext(AuthContext);

    // const getPosts = () => {
    //   if (!partnerInfo) return;
    //   onSnapshot(doc(db, "posts", partnerInfo.combinedId), (snapshot) => {
    //     if (!snapshot.data()) return;
    //     setPosts(snapshot.data().post);
    //   });
    // };

    // const { isLoading, data, isError, error, isFetching } = useQuery(
    //   "post",
    //   getPosts,
    //   { enabled: Object.keys(partnerInfo).length !== 0 }
    // );

    // if (isLoading || isFetching) {
    //   return <h2>Loading...</h2>;
    // }

    // if (isError) {
    //   return <h2>{error.message}</h2>;
    // }

    return (
      <>
        <div
          className={`${size} pb-4 overflow-y-scroll flex justify-center z-10`}
        >
          <div className="w-10/12">
            {/* {posts?.map((post, index) => {
            return <PostCard key={addPost + index} post={post} index={index} />;
          })} */}
            {Array.isArray(posts) && posts.length === 0
              ? "새 글을 작성해보세요"
              : null}
            {/* <AddButton page="post" addPost={addPost} setAddPost={setAddPost} /> */}
            {/* <ModalPost addPost={addPost} setAddPost={setAddPost} /> */}
          </div>
          {/* <ReactQueryDevtools initialIsOpen={true} position="bottom-right" /> */}
        </div>
      </>
    );
  };

export default Post;
