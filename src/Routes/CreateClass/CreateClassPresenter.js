import React, { useContext } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import { ClassInfoContext } from "./CreateClassContainer";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  tr {
    border: 1px solid #858585;
  }
  td {
    width: 25%;
  }
  td:nth-child(odd) {
    border: 1px solid #858585;
    padding: 8px;
    background-color: #f2f2f2;
    width: 4%;
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

export default ({ onSubmit }) => {
  const { classDispatch, classState } = useContext(ClassInfoContext);

  const { className, category } = classState.classInfo;

  const onChange = (e) => {
    const { name, value } = e.target;
    classDispatch({
      type: "CLASSINFO_CHANGE",
      data: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <WrapPage>
        <form onSubmit={onSubmit}>
          <PageTitle text={"Create Tag Class Management"} />
          <TitleBox>
            <SectionTitle text={"Create Tag Class Information"} />
            <ButtonBox>
              <Link to="/">
                <Button text="Back To Main"></Button>
              </Link>
              <Button type="submit" text="Confirm"></Button>
            </ButtonBox>
          </TitleBox>
          <Table>
            <tr>
              <td>Tag Category</td>
              <td>
                <select
                  name="category"
                  value={category}
                  onChange={onChange}
                  required
                >
                  {category === "" ? (
                    <option value="==choose==">{"-- CHOOSE --"}</option>
                  ) : (
                    <></>
                  )}
                  <option value="Style">Style</option>
                  <option value="Location">Location</option>
                  <option value="ProductClass">ProductClass</option>
                  <option value="Price">Price</option>
                  <option value="Feature">Feature</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Class Name</td>
              <td>
                <input
                  name="className"
                  type="text"
                  value={className}
                  onChange={onChange}
                  required
                />
              </td>
            </tr>
          </Table>
        </form>
      </WrapPage>
    </>
  );
};
