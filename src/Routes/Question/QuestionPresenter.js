import React, { useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import SectionTitle from "../../Components/SectionTitle";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import PageChangeButton from "../../Components/PageChangeButton";
import { PlusIcon, DeleteIcon } from "../../Components/Icons";

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
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
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
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:first-child,
  th:first-child {
    width: 20%;
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

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
`;

export default ({
  loading,
  data,
  onChange,
  email,
  pw,
  setAdminState,
  setQuestionState,
  questionState,
  onTypeChange,
  onOrderChange,
  onSubmit,
  addRow,
  deleteRow,
  setIsDataState,
}) => {
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    useEffect(() => {
      if (data.getSettingAdminEmail && data.getSettingQuestionOption) {
        const defaultAdmin = {
          email: data.getSettingAdminEmail.email,
          pw: data.getSettingAdminEmail.pw,
        };
        setAdminState(defaultAdmin);
        if (data.getSettingQuestionOption.length > 0) {
          const question = [];
          let id = 1;
          data.getSettingQuestionOption.map((option) =>
            question.push({
              id: id++,
              order: Number(option.order),
              questionType: option.questionType,
            })
          );
          setQuestionState(question);
        } else {
          setQuestionState([
            {
              id: 1,
              order: 1,
              questionType: "",
            },
          ]);
        }
        setIsDataState(true);
      } else {
        setIsDataState(false);
      }
    }, []);
    return (
      <>
        <WrapPage>
          <form onSubmit={onSubmit}>
            <PageTitle text={"Question Management"} />
            <TitleBox>
              <SectionTitle text={"Email Information"} />
              <ButtonBox>
                <PageChangeButton text="Back To Main" href="/" />
                <Button type="submit" text="Confirm"></Button>
              </ButtonBox>
            </TitleBox>
            <Table>
              <tbody>
                <tr>
                  <td>Admin Email</td>
                  <td>
                    <input
                      name="email"
                      type="email"
                      autoComplete="username"
                      onChange={onChange}
                      value={email}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Admin Password</td>
                  <td>
                    <input
                      name="pw"
                      type="password"
                      autoComplete="current-password"
                      onChange={onChange}
                      value={pw}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            <TitleBox>
              <SectionTitle text={"Question Type Management"} />
            </TitleBox>
            <Table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Question Type</th>
                  <th>
                    <RowButton onClick={(e) => addRow(e)}>
                      <PlusIcon size={19} />
                    </RowButton>
                  </th>
                </tr>
              </thead>
              <tbody>
                {questionState.length > 0 &&
                  questionState.map((question) => (
                    <tr key={question.id}>
                      <td>
                        <input
                          name="order"
                          type="text"
                          value={question.order}
                          onChange={(e) => onOrderChange(question.id, e)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          name="questionType"
                          type="text"
                          value={question.questionType}
                          onChange={(e) => onTypeChange(question.id, e)}
                          required
                        />
                      </td>
                      <td>
                        <RowButton onClick={(e) => deleteRow(e, question.id)}>
                          <DeleteIcon size={19} />
                        </RowButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </form>
        </WrapPage>
      </>
    );
  }
};
