import React from "react";
import Header from "./header";
import Navbar from "./navbar";
type ComponentProps = {
  children: React.ReactNode;
};

const Layout = (props: ComponentProps) => {
  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-pink-200 relative">
        <Header />
        <main>{props.children}</main>
        <Navbar />
      </div>
    </>
  );
};

export default Layout;
