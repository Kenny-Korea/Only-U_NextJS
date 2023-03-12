import React from "react";
import ModalLayout from "../modal/layout";
import Content from "./content";
import Header from "./header";
import Navbar from "./navbar";

type ComponentProps = {
  children: React.ReactNode;
};

const Layout = (props: ComponentProps) => {
  return (
    <>
      <div className="w-screen h-screen bg-pink-200">
        <Header />
        <Content>{props.children}</Content>
        <Navbar />
      </div>
    </>
  );
};

export default Layout;
