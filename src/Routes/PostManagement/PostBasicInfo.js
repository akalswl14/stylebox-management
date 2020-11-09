import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { PostInfoContext } from "./PostInfoContainer";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  input {
    text-align: center;
    width: 180px;
  }
  tr {
    border: 1px solid #858585;
  }
  td {
    width: 25%;
    padding: 0px 25px;
  }
  td:nth-child(odd) {
    text-align: center;
    width: 13%;
    border: 1px solid #858585;
    padding: 8px;
    background-color: #f2f2f2;
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

const PostBasicInfo = () => {
  const { postDispatch, postState } = useContext(PostInfoContext);
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Basic Information"} />
        <ButtonBox>
          <Link to="/">
            <Button text="Back To Main"></Button>
          </Link>
          <Button type="submit" text="Confirm"></Button>
        </ButtonBox>
      </TitleBox>
      <Table>
        <tr>
          <td>PostId</td>
          <td colSpan="3">아이디 자리</td>
        </tr>
        <tr>
          <td>Main Product</td>
          <td colSpan="3">
            <input type="text" value="productId" />{" "}
            <input type="text" value="ProductName" />
          </td>
        </tr>
        <tr>
          <td>Selling Shop</td>
          <td>
            <input type="text" value="shopId" />{" "}
            <input type="text" value="shopName" />
          </td>
          <td>Price</td>
          <td>가격 자리 VND</td>
        </tr>
      </Table>
    </>
  );
};

export default PostBasicInfo;
