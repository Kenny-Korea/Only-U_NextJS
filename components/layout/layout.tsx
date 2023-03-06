import React from "react";
import Header from "./header";
import Navbar from "./navbar";
type ComponentProps = {
  children: React.ReactNode;
};

const Layout = (props: ComponentProps) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Navbar />
    </>
  );
};

export default Layout;
