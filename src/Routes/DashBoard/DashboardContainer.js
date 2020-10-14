import React, { useState } from "react";
import DashboardPresenter from "./DashboardPresenter";
import { useQuery } from "react-apollo-hooks";
import { DASHBOARD_QUERY } from "./DashboardQueries";

export default () => {
  const [action, setAction] = useState("Weekly");
  const periodFilter = action === "Weekly" ? 1 : action === "Monthly" ? 2 : 3;
  const { loading, error, data } = useQuery(DASHBOARD_QUERY, {
    variables: {
      periodFilter,
    },
  });
  return (
    <DashboardPresenter
      loading={loading}
      error={error}
      data={data}
      action={action}
      setAction={setAction}
    />
  );
};
