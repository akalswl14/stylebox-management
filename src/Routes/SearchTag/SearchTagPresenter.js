import React from 'react';
import styled from 'styled-components';
import WrapPage from '../../Styles/WrapPageStyles';
import PageTitle from '../../Components/PageTitle';
import SectionTitle from '../../Components/SectionTitle';
import Loader from '../../Components/Loader';
import Button from '../../Components/Button';
import SearchTagTable from './SearchTagTable';

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
    width: 13%;
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
  .tableTitle {
    background-color: #f2f2f2;
  }
  .linkCell {
    display: flex;
    justify-content: space-around;
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

export default ({ loading, data }) => {
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    return (
      <>
        <WrapPage>
          <PageTitle text={'Recommendation Tag Management'} />
          <TitleBox>
            <SectionTitle text={'Recommendation Tag Management'} />
            <ButtonBox>
              <Button text='Back To Main'></Button>
              <Button text='Confirm'></Button>
            </ButtonBox>
          </TitleBox>
          <Table>
            <th>Order</th>
            <th>Category</th>
            <th>Class</th>
            <th>Tag</th>
            <th>x</th>
            {data.getSettingPopularTags.map((searchTag) => (
              <SearchTagTable
                key={searchTag.id}
                order={searchTag.order}
                id={searchTag.id}
                tagName={searchTag.tagName}
                Category={searchTag.Category}
                className={searchTag.className}
                classId={searchTag.classId}
                categories={data.getManageCategoryOptions}
                searchTag={searchTag}
              />
            ))}
          </Table>
        </WrapPage>
      </>
    );
  }
};
