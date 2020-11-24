import React, { useContext } from "react";
import styled from "styled-components";
import { PostListContext } from "./PostListContainer";
import SortButton from "../../Components/SortButton";
import PageChangeButton from "../../Components/PageChangeButton";
import ParsePrice from "../../Styles/ParsePrice";

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

const PostListTable = ({ data }) => {
  const { postState, postDispatch } = useContext(PostListContext);

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
    let sortOption = {
      sortPostId: false,
      sortMainProductName: false,
      sortShopName: false,
      sortPrice: false,
      sortPriority: false,
      postIdAsc: true,
      mainProductNameAsc: true,
      shopNameAsc: true,
      priceAsc: true,
      priorityAsc: true,
    };
    if (name === "postId") {
      if (postState.sortOption.sortPostId) {
        if (postState.sortOption.postIdAsc) {
          sortOption.sortPostId = true;
          sortOption.postIdAsc = false;
        } else {
          sortOption.sortPostId = false;
          sortOption.postIdAsc = true;
        }
      } else {
        sortOption.sortPostId = true;
        sortOption.postIdAsc = true;
      }
    } else if (name === "mainProductName") {
      if (postState.sortOption.sortMainProductName) {
        if (postState.sortOption.mainProductNameAsc) {
          sortOption.sortMainProductName = true;
          sortOption.mainProductNameAsc = false;
        } else {
          sortOption.sortMainProductName = false;
          sortOption.mainProductNameAsc = true;
        }
      } else {
        sortOption.sortMainProductName = true;
        sortOption.mainProductNameAsc = true;
      }
    } else if (name === "price") {
      if (postState.sortOption.sortPrice) {
        if (postState.sortOption.priceAsc) {
          sortOption.sortPrice = true;
          sortOption.priceAsc = false;
        } else {
          sortOption.sortPrice = false;
          sortOption.priceAsc = true;
        }
      } else {
        sortOption.sortPrice = true;
        sortOption.priceAsc = true;
      }
    } else if (name === "shopName") {
      if (postState.sortOption.sortShopName) {
        if (postState.sortOption.shopNameAsc) {
          sortOption.sortShopName = true;
          sortOption.shopNameAsc = false;
        } else {
          sortOption.sortShopName = false;
          sortOption.shopNameAsc = true;
        }
      } else {
        sortOption.sortShopName = true;
        sortOption.shopNameAsc = true;
      }
    } else if (name === "priority") {
      if (postState.sortOption.sortPriority) {
        if (postState.sortOption.priorityAsc) {
          sortOption.sortPriority = true;
          sortOption.priorityAsc = false;
        } else {
          sortOption.sortPriority = false;
          sortOption.priorityAsc = true;
        }
      } else {
        sortOption.sortPriority = true;
        sortOption.priorityAsc = true;
      }
    }
    postDispatch({
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
            <SortText>Post Id</SortText>
            <SortButton
              type={
                !postState.sortOption.sortPostId
                  ? 0
                  : postState.sortOption.postIdAsc
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
                !postState.sortOption.sortMainProductName
                  ? 0
                  : postState.sortOption.mainProductNameAsc
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
                !postState.sortOption.sortPrice
                  ? 0
                  : postState.sortOption.priceAsc
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
                !postState.sortOption.sortShopName
                  ? 0
                  : postState.sortOption.shopNameAsc
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
                !postState.sortOption.sortPriority
                  ? 0
                  : postState.sortOption.priorityAsc
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
              <PageChangeButton text="edit" href={"/postinfo/" + post.postId} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostListTable;
