import React, { useState } from "react";
import DashboardPresenter from "./DashboardPresenter";

export default () => {
  const [action, setAction] = useState("monthlyShop");
  return <DashboardPresenter action={action} setAction={setAction} />;
};
