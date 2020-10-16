import React, { useState } from "react";
import TagIconPresenter from "./TagIconPresenter";
import { useQuery } from "react-apollo-hooks";
import { TAGICON_SETTING, STYLE_CLASS_OPTION } from "./TagIconQueries";

export default () => {
  const [action, setAction] = useState("New");
  // const { loading, error, data } = useQuery(TAGICON_SETTING);
  const loading = false,
    error = false;
  const data = {
    getSettingMainBubbles: [
      {
        tagId: 4,
        tagName: "style2",
        classId: 7,
        className: "Style2",
        category: "Style",
        order: 0,
      },
    ],
    getSettingBestBubbles: [
      {
        tagId: 15,
        tagName: "skirt",
        classId: 13,
        className: "skirt",
        category: "ProductClass",
        order: 0,
      },
      {
        tagId: 14,
        tagName: "pants",
        classId: 12,
        className: "pants",
        category: "ProductClass",
        order: 1,
      },
    ],
    getSettingShopBubbles: [
      {
        tagId: 13,
        tagName: "top",
        classId: 11,
        className: "top",
        category: "ProductClass",
        order: 0,
      },
    ],
  };
  const {
    loading: loading_StyleClass,
    error: error_StyleClass,
    data: data_StyleClass,
  } = useQuery(STYLE_CLASS_OPTION);

  console.log(loading_StyleClass);
  console.log(error_StyleClass);
  console.log(data_StyleClass);

  return (
    <TagIconPresenter
      action={action}
      setAction={setAction}
      loading={loading}
      error={error}
      data={data}
      loading_StyleClass={loading_StyleClass}
      error_StyleClass={error_StyleClass}
      data_StyleClass={data_StyleClass}
    />
  );
};
