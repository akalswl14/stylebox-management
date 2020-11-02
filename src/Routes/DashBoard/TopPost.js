import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  tr,
  td,
  th {
    border: ${(props) => props.theme.tableBorder};
  }
  td,
  th {
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
  }
  .tagNameCell {
    display: flex;
    justify-content: space-around;
    border: 0;
  }
  .NumCell {
    padding: 7px 0px;
  }
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

export const DashboardTopPost = ({ data, setAction }) => {
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Top 5 Post"} />
        <ButtonBox>
          <Button
            text="Weekly"
            ClickEvent={() => {
              setAction("Weekly");
            }}
          ></Button>
          <Button
            text="Monthly"
            ClickEvent={() => {
              setAction("Monthly");
            }}
          ></Button>
          <Button
            text="Total"
            ClickEvent={() => {
              setAction("Total");
            }}
          ></Button>
        </ButtonBox>
      </TitleBox>
      <Table>
        <tr>
          <th>No</th>
          <th>Post ID</th>
          <th>mainProductName</th>
          <th>price</th>
          <th>shopId</th>
          <th>priority</th>
          <th>tagNames</th>
          <th>subProductNum</th>
          <th>rankNum</th>
          <th>likeNum</th>
          <th>viewNum</th>
        </tr>
        {data &&
          data.map((eachPost) => (
            <tr>
              <td>{eachPost.No}</td>
              <td>{eachPost.postId}</td>
              <td>{eachPost.mainProductName}</td>
              <td>{eachPost.price}</td>
              <td>{eachPost.shopId}</td>
              <td>{eachPost.priority}</td>
              <td className="tagNameCell">
                {eachPost.tagNames.map((eachTagName) => (
                  <div>{eachTagName}</div>
                ))}
              </td>
              <td>{eachPost.subProductNum}</td>
              <td>{eachPost.rankNum}</td>
              <td>{eachPost.likeNum}</td>
              <td>{eachPost.viewNum}</td>
            </tr>
          ))}
      </Table>
    </>
  );
};
