import React, { useContext } from "react";
import styled from "styled-components";
import { TagListContext } from "./TagListContainer";
import SortButton from "../../Components/SortButton";
import PageChangeButton from "../../Components/PageChangeButton";
import queryString from "query-string";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 6px 2px;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    font-size: 13px;
    vertical-align: middle;
  }
  th:first-child,
  th:last-child {
    width: 5%;
  }
  td {
    font-size: 13px;
    vertical-align: middle;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const SortText = styled.span`
  line-height: 30px;
`;

const TagListTable = ({ data }) => {
  const { tagState, tagDispatch } = useContext(TagListContext);

  const queryInput = queryString.parse(window.location.search);

  const CheckAllCheckBox = (e) => {
    let saveList = tagState.selectedTagIdList.slice();
    if (e.target.checked) {
      for (const eachtag of data.getTagList.tags) {
        if (
          !saveList.includes(eachtag.tagId) &&
          eachtag.category !== "ShopName"
        ) {
          saveList.push(eachtag.tagId);
        }
      }
    } else {
      for (const eachtag of data.getTagList.tags) {
        const idx = saveList.indexOf(eachtag.tagId);
        if (idx > -1) {
          saveList.splice(idx, 1);
        }
      }
    }
    tagDispatch({
      type: "UPDATE_BATCH_SELECTTAG",
      data: { saveList },
    });
  };

  const onCheckBoxChange = (tagId) => {
    tagDispatch({
      type: "UPDATE_SELECTTAG",
      data: { tagId },
    });
  };

  const AllCheckBoxStatus = () => {
    for (const eachTag of data.getTagList.tags) {
      if (
        !tagState.selectedTagIdList.includes(eachTag.tagId) &&
        eachTag.category !== "ShopName"
      ) {
        return false;
      }
    }
    return true;
  };

  const SortClick = (e, name) => {
    e.preventDefault();

    const changedQuery = {
      page: 1,
      id: queryInput.id ?? undefined,
      tagname: queryInput.tagname ?? undefined,
      category: queryInput.category ?? undefined,
      classname: queryInput.classname ?? undefined,
    };

    if (name === "tagId") {
      const sorttagidasc = queryInput.sorttagidasc;
      if (sorttagidasc) {
        if (Number(sorttagidasc) === 0) changedQuery.sorttagidasc = 1;
      } else {
        changedQuery.sorttagidasc = 0;
      }
    } else if (name === "tagName") {
      const sorttagnameasc = queryInput.sorttagnameasc;
      if (sorttagnameasc) {
        if (Number(sorttagnameasc) === 0) changedQuery.sorttagnameasc = 1;
      } else {
        changedQuery.sorttagnameasc = 0;
      }
    } else if (name === "category") {
      const sortcategoryasc = queryInput.sortcategoryasc;
      if (sortcategoryasc) {
        if (Number(sortcategoryasc) === 0) changedQuery.sortcategoryasc = 1;
      } else {
        changedQuery.sortcategoryasc = 0;
      }
    }

    window.location.href = `/taglist?${queryString.stringify(changedQuery)}`;
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={CheckAllCheckBox}
              checked={AllCheckBoxStatus()}
            />
          </th>
          <th>
            <SortText>Tag Id</SortText>
            <SortButton
              type={
                !queryInput.sorttagidasc
                  ? 0
                  : Number(queryInput.sorttagidasc) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "tagId")}
            />
          </th>
          <th>
            <SortText>Tag Name</SortText>
            <SortButton
              type={
                !queryInput.sorttagnameasc
                  ? 0
                  : Number(queryInput.sorttagnameasc) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "tagName")}
            />
          </th>
          <th>
            <SortText>Tag Type</SortText>
            <SortButton
              type={
                !queryInput.sortcategoryasc
                  ? 0
                  : Number(queryInput.sortcategoryasc) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "category")}
            />
          </th>
          <th>Class</th>
          <th>Shops</th>
          <th>Posts</th>
          <th>Product</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.getTagList.tags.map((tag) => (
          <tr key={tag.tagId}>
            <td>
              {tag.category !== "ShopName" ? (
                tag.isClass &&
                (tag.category === "Location" ||
                  tag.category === "ProductClass") ? (
                  <></>
                ) : (
                  <input
                    type="checkbox"
                    name="tagId"
                    onChange={() => onCheckBoxChange(tag.tagId)}
                    checked={
                      tagState.selectedTagIdList.includes(tag.tagId)
                        ? true
                        : false
                    }
                  />
                )
              ) : (
                <></>
              )}
            </td>
            <td>{tag.tagId}</td>
            <td>{tag.tagName}</td>
            <td>{tag.category}</td>
            <td>{tag.className}</td>
            <td>{tag.postNum}</td>
            <td>{tag.shopNum}</td>
            <td>{tag.productNum}</td>
            <td>
              <PageChangeButton
                width={50}
                text="edit"
                href={"/taginfo/" + tag.tagId}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TagListTable;
