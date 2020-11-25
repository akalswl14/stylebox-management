import React, { useContext } from "react";
import styled from "styled-components";
import { TagListContext } from "./TagListContainer";
import SortButton from "../../Components/SortButton";
import PageChangeButton from "../../Components/PageChangeButton";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  th:first-child {
    width: 13%;
    padding: 12px;
    border-right: 1px solid #858585;
    background-color: #f2f2f2;
  }
  th {
    padding: 12px;
    border: 1px solid #858585;
    background-color: #f2f2f2;
  }
  tr {
    border: 1px solid #858585;
  }
  td {
    padding: 3px;
  }
  td:first-child {
    border: 1px solid #858585;
  }
`;

const SortText = styled.span`
  line-height: 30px;
`;

const TagListTable = ({ data }) => {
  const { tagState, tagDispatch } = useContext(TagListContext);

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
    let sortOption = {
      sortTagId: false,
      sortTagName: false,
      sortCategory: false,
      tagIdAsc: true,
      tagNameAsc: true,
      categoryAsc: true,
    };
    if (name === "tagId") {
      if (tagState.sortOption.sortTagId) {
        if (tagState.sortOption.tagIdAsc) {
          sortOption.sortTagId = true;
          sortOption.tagIdAsc = false;
        } else {
          sortOption.sortTagId = false;
          sortOption.tagIdAsc = true;
        }
      } else {
        sortOption.sortTagId = true;
        sortOption.tagIdAsc = true;
      }
    } else if (name === "tagName") {
      if (tagState.sortOption.sortTagName) {
        if (tagState.sortOption.tagNameAsc) {
          sortOption.sortTagName = true;
          sortOption.tagNameAsc = false;
        } else {
          sortOption.sortTagName = false;
          sortOption.tagNameAsc = true;
        }
      } else {
        sortOption.sortTagName = true;
        sortOption.tagNameAsc = true;
      }
    } else if (name === "category") {
      if (tagState.sortOption.sortCategory) {
        if (tagState.sortOption.categoryAsc) {
          sortOption.sortCategory = true;
          sortOption.categoryAsc = false;
        } else {
          sortOption.sortCategory = false;
          sortOption.categoryAsc = true;
        }
      } else {
        sortOption.sortCategory = true;
        sortOption.categoryAsc = true;
      }
    }
    tagDispatch({
      type: "UPDATE_SORTOPTION",
      data: {
        sortOption,
      },
    });
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
                !tagState.sortOption.sortTagId
                  ? 0
                  : tagState.sortOption.tagIdAsc
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
                !tagState.sortOption.sortTagName
                  ? 0
                  : tagState.sortOption.tagNameAsc
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
                !tagState.sortOption.sortCategory
                  ? 0
                  : tagState.sortOption.categoryAsc
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
              {tag.category !== "ShopName" && (
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
              <PageChangeButton text="edit" href={"/taginfo/" + tag.tagId} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TagListTable;
