import React from "react";
import { Outlet } from "react-router";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
