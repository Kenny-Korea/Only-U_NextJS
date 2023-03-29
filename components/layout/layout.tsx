import { FetchStatusReducerSelector } from "@/state/reducers/fetchStatusReducer";
import React from "react";
import { useSelector } from "react-redux";
import ModalStatus from "../modal/uploading";
import ModalUploading from "../modal/uploading";
import Content from "./content";
import Header from "./header";
import Navbar from "./navbar";

type ComponentProps = {
  children: React.ReactNode;
};

const Layout = (props: ComponentProps) => {
  const isUploading = useSelector(
    (state: FetchStatusReducerSelector) => state.fetchStatusReducer.uploading
  );
  const isDeleting = useSelector(
    (state: FetchStatusReducerSelector) => state.fetchStatusReducer.deleting
  );

  return (
    <>
      {isUploading && <ModalStatus status="Uploading" />}
      {isDeleting && <ModalStatus status="Deleting" />}
      <div className="w-screen h-screen">
        <Header />
        <Content>{props.children}</Content>
        <Navbar />
      </div>
    </>
  );
};

export default Layout;
