import React from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import SectionTitle from "../../Components/SectionTitle";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
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
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  th:first-child {
    width: 20%;
    padding: 12px;
    border-right: 1px solid #858585;
    background-color: #f2f2f2;
  }
  th {
    padding: 12px;
    border: 1px solid #858585;
  }
  tr {
    border: 1px solid #858585;
  }
  td:first-child {
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
  alreadyGetData,
  setalreadyGetData,
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
    if (!alreadyGetData) {
      if (data.getSettingAdminEmail && data.getSettingQuestionOption) {
        const defaultAdmin = {
          email: data.getSettingAdminEmail.email,
          pw: data.getSettingAdminEmail.pw,
        };
        setAdminState(defaultAdmin);
        if (data.getSettingQuestionOption.length > 0) {
          const question = [];
          data.getSettingQuestionOption.map((option) =>
            question.push({
              order: Number(option.order),
              questionType: option.questionType,
            })
          );
          setQuestionState(question);
        } else {
          setQuestionState([
            {
              order: 1,
              questionType: "",
            },
          ]);
        }
        setalreadyGetData(true);
        setIsDataState(true);
      } else {
        setIsDataState(false);
      }
    }
    return (
      <>
        <WrapPage>
          <form onSubmit={onSubmit}>
            <PageTitle text={"Question Management"} />
            <TitleBox>
              <SectionTitle text={"Email Information"} />
              <ButtonBox>
                <Link to="/">
                  <Button text="Back To Main"></Button>
                </Link>
                <Button type="submit" text="Confirm"></Button>
              </ButtonBox>
            </TitleBox>
            <Table>
              <tr>
                <td>Admin Email</td>
                <td>
                  <input
                    name="email"
                    type="email"
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
                    onChange={onChange}
                    value={pw}
                    required
                  />
                </td>
              </tr>
            </Table>
            <TitleBox>
              <SectionTitle text={"Question Type Management"} />
            </TitleBox>
            <Table>
              <th>Order</th>
              <th>Question Type</th>
              <th>
                <RowButton onClick={(e) => addRow(e)}>
                  <PlusIcon size={19} />
                </RowButton>
              </th>
              {questionState.length > 0 &&
                questionState.map((question) => (
                  <tr>
                    <td>
                      <input
                        name="order"
                        type="text"
                        value={question.order}
                        onChange={(e) =>
                          onOrderChange(question.questionType, e)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        name="questionType"
                        type="text"
                        value={question.questionType}
                        onChange={(e) => onTypeChange(question.order, e)}
                        required
                      />
                    </td>
                    <td>
                      <RowButton onClick={(e) => deleteRow(e, question.order)}>
                        <DeleteIcon size={19} />
                      </RowButton>
                    </td>
                  </tr>
                ))}
            </Table>
          </form>
        </WrapPage>
      </>
    );
  }
};
