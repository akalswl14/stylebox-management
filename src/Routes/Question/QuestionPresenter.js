import React, { useEffect } from 'react';
import styled from 'styled-components';
import WrapPage from '../../Styles/WrapPageStyles';
import PageTitle from '../../Components/PageTitle';
import SectionTitle from '../../Components/SectionTitle';
import Loader from '../../Components/Loader';
import Button from '../../Components/Button';

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

export default ({
  loading,
  data,
  onChange,
  email,
  pw,
  setAdminState,
  adminState,
  order,
  questionType,
  setQuestionState,
  questionState,
}) => {
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    useEffect(() => {
      setAdminState(data.getSettingAdminEmail);
      setQuestionState(data.getSettingQuestionOption);
      return () => {
        console.log('컴포넌트가 화면에서 사라짐');
      };
    }, []);
    return (
      <>
        <WrapPage>
          <PageTitle text={'Question Management'} />
          <TitleBox>
            <SectionTitle text={'Email Information'} />
            <ButtonBox>
              <Button text='Back To Main'></Button>
              <Button text='Confirm'></Button>
            </ButtonBox>
          </TitleBox>
          <Table>
            <tr>
              <td>Admin Email</td>
              <td>
                <input
                  name='email'
                  type='email'
                  onChange={onChange}
                  value={email}
                />
              </td>
            </tr>
            <tr>
              <td>Admin Password</td>
              <td>
                <input
                  name='pw'
                  type='password'
                  onChange={onChange}
                  value={pw}
                />
              </td>
            </tr>
          </Table>
          <TitleBox>
            <SectionTitle text={'Question Type Management'} />
          </TitleBox>
          <Table>
            <th>Order</th>
            <th>Question Type</th>
            <th>+</th>
            {questionState.map((question) => (
              <tr>
                <td>
                  <input name='order' type='text' value={question.order} />
                </td>
                <td>
                  <input
                    name='questionType'
                    type='text'
                    value={question.questionType}
                  />
                </td>
                <td>+</td>
              </tr>
            ))}
          </Table>
        </WrapPage>
      </>
    );
  }
};
