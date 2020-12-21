import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import ParsePrice from "../../Styles/ParsePrice";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  font-size: 15px;
  tr {
    height: 40px;
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-bottom: 0.5px solid black;
  }
  td:first-child,
  th:first-child {
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
  }
  .tagNameCell {
    justify-content: space-evenly;
    border: 0;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
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

const TagSpan = styled.span`
  font-weight: 500;
  .commanSpan {
    font-weight: 100;
    color: red;
  }
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
        <thead>
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
        </thead>
        <tbody>
          {data &&
            data.map((eachPost, index) => (
              <tr key={index}>
                <td>{eachPost.No}</td>
                <td>{eachPost.postId}</td>
                <td>{eachPost.mainProductName}</td>
                <td>{ParsePrice(eachPost.price)}</td>
                <td>{eachPost.shopId}</td>
                <td>{eachPost.priority}</td>
                <td className="tagNameCell">
                  {eachPost.tagNames.map((eachTagName, index) => {
                    if (index === eachPost.tagNames.length - 1) {
                      return <TagSpan key={index}>{eachTagName}</TagSpan>;
                    } else {
                      return (
                        <TagSpan key={index}>
                          {eachTagName}
                          <TagSpan className="commanSpan"> / </TagSpan>
                        </TagSpan>
                      );
                    }
                  })}
                </td>
                <td>{eachPost.subProductNum}</td>
                <td>{eachPost.rankNum}</td>
                <td>{eachPost.likeNum}</td>
                <td>{eachPost.viewNum}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};
