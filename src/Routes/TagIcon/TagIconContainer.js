import React, { useState } from "react";
import TagIconPresenter from "./TagIconPresenter";
// import { useQuery } from "react-apollo-hooks";
// import { DASHBOARD_QUERY, DASHBOARD_TOPPOST_QUERY } from "./TagIconQueries";

export default () => {
  const [action, setAction] = useState("New");

  return <TagIconPresenter action={action} setAction={setAction} />;
};
