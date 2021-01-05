import React, { useContext } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import { ClassInfoContext } from "./CreateClassContainer";
import PageChangeButton from "../../Components/PageChangeButton";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import { useQuery } from "react-apollo-hooks";
import { CHECK_CLASSNAME } from "./CreateClassQueries";
import { PossibleIcon, ImpossibleIcon } from "../../Components/Icons";
import { toast } from "react-toastify";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 8px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-bottom: 0.5px solid black;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:first-child,
  th:first-child {
    width: 10%;
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
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

const ClickBox = styled.div`
  padding: 15px 10px 15px 10px;
  display: flex;
  width: 25%;
  align-items: center;
  justify-content: middle;
`;

export default ({ onSubmit }) => {
  const { classDispatch, classState } = useContext(ClassInfoContext);
  const { className, category } = classState.classInfo;
  const { data } = useQuery(CHECK_CLASSNAME, {
    variables: { className },
  });

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

  const onClick = (e) => {
    e.preventDefault();
    if (!category) {
      toast.error("Please select a category first.");
      return;
    }
    const isCheck = data.getClassDuplication;
    if (!className || className === "") {
      toast.error("Please write a class name.");
    } else {
      classDispatch({
        type: "CLASSNAME_CHECK",
        data: {
          isCheck,
        },
      });
      if (!isCheck) {
        toast.info("🚫  The Class already exists. Please check it again.");
      } else {
        toast.info("✅  Valid Class.");
      }
    }
  };

  const style = {
    textAlign: "right",
  };

  return (
    <>
      <WrapPage>
        <form onSubmit={onSubmit}>
          <PageTitle text={"Create Tag Class Management"} />
          <TitleBox>
            <SectionTitle text={"Create Tag Class Information"} />
            <ButtonBox>
              <PageChangeButton text="Back to Map" href="/tagmap" />
              <PageChangeButton text="Back To Main" href="/" />
              <Button type="submit" text="Confirm"></Button>
            </ButtonBox>
          </TitleBox>
          <Table>
            <tbody>
              <tr>
                <td>Tag Type</td>
                <td colSpan="2">
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
                    <option value="Feature">Feature</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Class Name</td>
                <td style={style}>
                  <input
                    name="className"
                    type="text"
                    value={className}
                    onChange={onChange}
                    required
                  />
                </td>
                <td>
                  <ClickBox onClick={onClick}>
                    {classState.isCheck ? <PossibleIcon /> : <ImpossibleIcon />}
                    <Button text="Check"></Button>
                  </ClickBox>
                </td>
              </tr>
            </tbody>
          </Table>
        </form>
      </WrapPage>
    </>
  );
};
