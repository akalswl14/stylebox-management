import React, { useState } from "react";
import DashboardPresenter from "./DashboardPresenter";
import { useQuery } from "react-apollo-hooks";
import { DASHBOARD_QUERY, DASHBOARD_TOPPOST_QUERY } from "./DashboardQueries";

export default () => {
  const [action, setAction] = useState("Weekly");
  const periodFilter = action === "Weekly" ? 1 : action === "Monthly" ? 2 : 3;
  const { loading, error, data } = useQuery(DASHBOARD_QUERY);
  const {
    loading: loading_post,
    error: error_post,
    data: data_post,
  } = useQuery(DASHBOARD_TOPPOST_QUERY, {
    variables: {
      periodFilter,
    },
  });
  return (
    <DashboardPresenter
      loading={loading}
      error={error}
      data={data}
      loading_post={loading_post}
      error_post={error_post}
      data_post={data_post}
      action={action}
      setAction={setAction}
    />
  );
};
