import React from "react";
import Nav from "../Components/Nav";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div id="root-layout">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
