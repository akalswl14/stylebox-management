import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { ClassInfoContext } from "./ClassInfoContainer";
import PageChangeButton from "../../Components/PageChangeButton";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import { useQuery } from "react-apollo-hooks";
import { CHECK_CLASSNAME } from "./ClassInfoQueries";
import { PossibleIcon, ImpossibleIcon } from "../../Components/Icons";

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

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

const CheckStatusIcon = styled.span`
  height: 35px;
  padding: 0px 10px;
  line-height: 35px;
  width: 35px;
  justify-content: center;
  vertical-align: middle;
  display: inline-block;
`;

const Input = styled.input`
  width: ${(props) => {
    if (props.InputWidth) {
      return props.InputWidth.toString() + "px";
    } else {
      return null;
    }
  }};
  height: 35px;
  font-size: 15px;
`;

export default ({ loading, data, error, onSubmit }) => {
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    const { classDispatch, classState } = useContext(ClassInfoContext);
    const {
      classId,
      className,
      category,
      postNum,
      shopNum,
      productNum,
      createdAt,
      updatedAt,
    } = classState.classInfo;

    const { data: checkData } = useQuery(CHECK_CLASSNAME, {
      variables: { className: className ? className : "" },
    });

    useEffect(() => {
      const classData = data.getClassInfo;
      let classInfo = {
        classId: classData.classId,
        className: classData.className,
        category: classData.category,
        postNum: classData.postNum,
        shopNum: classData.shopNum,
        productNum: classData.productNum,
        createdAt: classData.createdAt,
        updatedAt: classData.updatedAt,
      };
      classDispatch({
        type: "SET_DATA",
        data: {
          classInfo,
          isData: true,
          isCheck: true,
          originalClassName: classData.className,
        },
      });
    }, []);

    const onChange = (e) => {
      const { name, value } = e.target;
      let isCheck = false;
      if (classState.originalClassName === value) {
        isCheck = true;
      }
      classDispatch({
        type: "CLASSINFO_CHANGE",
        data: {
          name,
          value,
          isCheck,
        },
      });
    };

    const onClick = (e) => {
      e.preventDefault();
      if (!category) {
        alert("Please select a category first.");
        return;
      }
      let isCheck = checkData.getClassDuplication;
      if (!className || className === "") {
        alert("Please write a class name.");
      } else {
        if (classState.originalClassName === className) isCheck = true;
        classDispatch({
          type: "CLASSNAME_CHECK",
          data: {
            isCheck,
          },
        });
        if (!isCheck) {
          alert("Duplicate class name.");
        }
      }
    };

    let RegistrationDate = String(createdAt).split("T");
    let UpdatedDate = String(updatedAt).split("T");
    let UpdatedTime = String(UpdatedDate[1]).split(".");

    if (!classState.isData) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      );
    } else {
      return (
        <>
          <WrapPage>
            <form onSubmit={onSubmit}>
              <PageTitle text={"Tag Class Management"} />
              <TitleBox>
                <SectionTitle text={"Tag Class Information"} />
                <ButtonBox>
                  <PageChangeButton text="Back to Main" href="/" />
                  <Button type="submit" text="Confirm"></Button>
                </ButtonBox>
              </TitleBox>
              <Table>
                <tbody>
                  <tr>
                    <td>TagClass ID</td>
                    <td>{classId}</td>
                    <td>Shops</td>
                    <td>{shopNum} shops</td>
                  </tr>
                  <tr>
                    <td>Class Name</td>
                    <td>
                      <Input
                        InputWidth={100}
                        name="className"
                        type="text"
                        value={className}
                        onChange={onChange}
                        required
                      />
                      <CheckStatusIcon>
                        {classState.isCheck ? (
                          <PossibleIcon />
                        ) : (
                          <ImpossibleIcon />
                        )}
                      </CheckStatusIcon>
                      <Button
                        text={"Check"}
                        isButtonType={true}
                        ClickEvent={onClick}
                      ></Button>
                    </td>
                    <td>Posts</td>
                    <td>{postNum} posts</td>
                  </tr>
                  <tr>
                    <td>Tag Category</td>
                    <td>
                      <select
                        name="category"
                        value={category}
                        onChange={onChange}
                      >
                        <option value="Style">Style</option>
                        <option value="Location">Location</option>
                        <option value="ProductClass">ProductClass</option>
                        <option value="Price">Price</option>
                        <option value="Feature">Feature</option>
                      </select>
                    </td>
                    <td>Products</td>
                    <td>{productNum} products</td>
                  </tr>
                  <tr>
                    <td>Registration Date</td>
                    <td>{RegistrationDate[0]}</td>
                    <td>Last Updated</td>
                    <td>
                      {UpdatedDate[0]} {UpdatedTime[0]}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </form>
          </WrapPage>
        </>
      );
    }
  }
};
