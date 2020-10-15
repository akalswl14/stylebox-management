import React, { useState } from 'react';
import styled from 'styled-components';
import WrapPage from '../../Styles/WrapPageStyles';
import PageTitle from '../../Components/PageTitle';
import SectionTitle from '../../Components/SectionTitle';
import Loader from '../../Components/Loader';
import { useQuery } from 'react-apollo-hooks';
import { GET_CLASS } from './SearchTagQueries';

const Header = styled.header`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

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

const SearchTagTable = ({
  order,
  id,
  tagName,
  Category,
  className,
  classId,
  categories,
  searchTag,
}) => {
  const [selects, setSelects] = useState({
    category: '',
    classInfo: 0,
    tagInfo: 0,
  });

  const { category, classInfo, tagInfo } = selects;

  // console.log(category);
  // console.log(classInfo);
  // console.log(tagInfo);

  if (category) {
    const { data } = useQuery(GET_CLASS, {
      variables: { category },
    });
    console.log(data);
  }

  const onChange = (e) => {
    const { value, name } = e.target;
    // console.log(value);
    // console.log(name);
    setSelects({
      ...selects,
      [name]: value,
    });
  };

  const TagCategories = categories.filter(
    (category) => category !== 'ShopName'
  );
  return (
    <tr>
      <td>
        <input name='order' type='text' value={order} />
      </td>
      <td>
        <select name='category' onChange={onChange}>
          {TagCategories.map((category) =>
            category === Category ? (
              <option value={Category} selected>
                {Category}
              </option>
            ) : (
              <option value={category}>{category}</option>
            )
          )}
        </select>
      </td>
      <td>
        <select name='classInfo' onChange={onChange}>
          <option value={classId}>{className}</option>
          <option value={classInfo}>{className}</option>
        </select>
      </td>
      <td>
        <select name='tagInfo' onChange={onChange}>
          <option value={id}>{tagName}</option>
          <option value={tagInfo}>{tagName}</option>
        </select>
      </td>
      <td>x</td>
    </tr>
  );
};

export default ({ loading, data }) => {
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data.getSettingPopularTags && data.getManageCategoryOptions) {
    return (
      <>
        <WrapPage>
          <Header>
            <PageTitle text={'Recommendation Tag Management'}></PageTitle>
          </Header>
          <Header>
            <SectionTitle text={'Recommendation Tag Management'}></SectionTitle>
          </Header>
          <br />
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
