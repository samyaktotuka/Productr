import React from "react";
import LeftImage from "./LeftImage";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="flex h-screen">
      <LeftImage />

      <div className="w-2/3 flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
