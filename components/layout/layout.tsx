import { UploadingReducerSelector } from "@/state/reducers/uploadingReducer";
import React from "react";
import { useSelector } from "react-redux";
import ModalUploading from "../modal/uploading";
import Content from "./content";
import Header from "./header";
import Navbar from "./navbar";

type ComponentProps = {
  children: React.ReactNode;
};

const Layout = (props: ComponentProps) => {
  const isUploading = useSelector(
    (state: UploadingReducerSelector) => state.uploadingReducer.uploading
  );
  // console.log(isUploading);

  return (
    <>
      {isUploading && <ModalUploading />}
      <div className="w-screen h-screen">
        <Header />
        <Content>{props.children}</Content>
        <Navbar />
      </div>
    </>
  );
};

export default Layout;
