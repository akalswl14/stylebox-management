import React, { useContext } from "react";
import styled from "styled-components";
import { PostListContext } from "./PostListContainer";
import SortButton from "../../Components/SortButton";
import PageChangeButton from "../../Components/PageChangeButton";
import ParsePrice from "../../Styles/ParsePrice";
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

const PostListTable = ({ data }) => {
  const { postState, postDispatch } = useContext(PostListContext);

  const queryInput = queryString.parse(window.location.search);

  const CheckAllCheckBox = (e) => {
    let saveList = postState.selectedPostIdList.slice();
    if (e.target.checked) {
      for (const eachPost of data.getPostList.posts) {
        if (!saveList.includes(eachPost.postId)) {
          saveList.push(eachPost.postId);
        }
      }
    } else {
      for (const eachPost of data.getPostList.posts) {
        const idx = saveList.indexOf(eachPost.postId);
        if (idx > -1) {
          saveList.splice(idx, 1);
        }
      }
    }
    postDispatch({
      type: "UPDATE_BATCH_SELECTPOST",
      data: { saveList },
    });
  };

  const onCheckBoxChange = (postId) => {
    postDispatch({
      type: "UPDATE_SELECTPOST",
      data: { postId },
    });
  };

  const AllCheckBoxStatus = () => {
    for (const eachPost of data.getPostList.posts) {
      if (!postState.selectedPostIdList.includes(eachPost.postId)) {
        return false;
      }
    }
    return true;
  };

  const PriorityChange = (e, postId) => {
    const { value } = e.target;
    if (!postState.selectedPostIdList.includes(postId)) {
      postState.selectedPostIdList.push(postId);
    }
    postDispatch({
      type: "UPDATE_POST_PRIORITY",
      data: {
        value,
        postId,
      },
    });
  };

  const SortClick = (e, name) => {
    e.preventDefault();

    const changedQuery = {
      page: 1,
      key_postid: queryInput.key_postid ?? undefined,
      key_productname: queryInput.key_productname ?? undefined,
      key_shopname: queryInput.key_shopname ?? undefined,
    };

    if (name === "postId") {
      const sort_postid = queryInput.sort_postid;
      if (sort_postid) {
        if (Number(sort_postid) === 0) {
          changedQuery.sort_postid = 1;
        }
      } else {
        changedQuery.sort_postid = 0;
      }
    } else if (name === "mainProductName") {
      const sort_productname = queryInput.sort_productname;
      if (sort_productname) {
        if (Number(sort_productname) === 0) {
          changedQuery.sort_productname = 1;
        }
      } else {
        changedQuery.sort_productname = 0;
      }
    } else if (name === "price") {
      const sort_price = queryInput.sort_price;
      if (sort_price) {
        if (Number(sort_price) === 0) {
          changedQuery.sort_price = 1;
        }
      } else {
        changedQuery.sort_price = 0;
      }
    } else if (name === "shopName") {
      const sort_shopname = queryInput.sort_shopname;
      if (sort_shopname) {
        if (Number(sort_shopname) === 0) {
          changedQuery.sort_shopname = 1;
        }
      } else {
        changedQuery.sort_shopname = 0;
      }
    } else if (name === "priority") {
      const sort_priority = queryInput.sort_priority;
      if (sort_priority) {
        if (Number(sort_priority) === 0) {
          changedQuery.sort_priority = 1;
        }
      } else {
        changedQuery.sort_priority = 0;
      }
    }

    window.location.href = `/postlist?${queryString.stringify(changedQuery)}`;
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
            <SortText>Post Id</SortText>
            <SortButton
              type={
                !queryInput.sort_postid
                  ? 0
                  : Number(queryInput.sort_postid) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "postId")}
            />
          </th>
          <th>
            <SortText>Main Product</SortText>
            <SortButton
              type={
                !queryInput.sort_productname
                  ? 0
                  : Number(queryInput.sort_productname) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "mainProductName")}
            />
          </th>
          <th>
            <SortText>Price</SortText>
            <SortButton
              type={
                !queryInput.sort_price
                  ? 0
                  : Number(queryInput.sort_price) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "price")}
            />
          </th>
          <th>
            <SortText>Shop</SortText>
            <SortButton
              type={
                !queryInput.sort_shopname
                  ? 0
                  : Number(queryInput.sort_shopname) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "shopName")}
            />
          </th>
          <th>
            <SortText>Priority</SortText>
            <SortButton
              type={
                !queryInput.sort_priority
                  ? 0
                  : Number(queryInput.sort_priority) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "priority")}
            />
          </th>
          <th>Links</th>
          <th>Sub Products</th>
          <th>Rank</th>
          <th>Likes</th>
          <th>Views</th>
          <th>Link Click</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {postState.postInfo.map((post) => (
          <tr key={post.postId}>
            <td>
              <input
                type="checkbox"
                name="postId"
                onChange={() => onCheckBoxChange(post.postId)}
                checked={
                  postState.selectedPostIdList.includes(post.postId)
                    ? true
                    : false
                }
              />
            </td>
            <td>{post.postId}</td>
            <td>{post.mainProductName}</td>
            <td>{ParsePrice(post.price)}</td>
            <td>{post.shopName}</td>
            <td>
              <select
                name="priority"
                onChange={(e) => PriorityChange(e, post.postId)}
                value={post.priority}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </td>
            <td>{post.linksNum}</td>
            <td>{post.subProductsNum}</td>
            <td>{post.rank}</td>
            <td>{post.likesNum}</td>
            <td>{post.viewsNum}</td>
            <td>{post.linksClickNum}</td>
            <td>
              <PageChangeButton
                text="edit"
                href={"/postinfo/" + post.postId}
                width="50"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostListTable;
