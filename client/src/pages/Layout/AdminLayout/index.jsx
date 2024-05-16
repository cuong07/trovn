import React from "react";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <div>Main layout </div>
      <Outlet />
    </div>
  );
};

export default Index;
