import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import { TagMapContext } from "./TagMapContainer";
import { BiLinkExternal } from "react-icons/bi";

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
    background-color: #f2f2f2;
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

const TdBox = styled.td`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const TdBoxChildren = styled.div`
  border-radius: 30px;
  border: 1px solid #858585;
  margin: 5px 5px;
  padding: 5px 15px;
`;

// const style = {
//   fontSize: "1.75em",
//   marginTop: "12px",
// };

const Tags = () => {
  const { tagState } = useContext(TagMapContext);
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Location Tags"} />
        <ButtonBox>
          <Link to="/taglist">
            <Button text="See Tag List"></Button>
          </Link>
          <Link to="/createclass">
            <Button text="Add New Class"></Button>
          </Link>
          <Link to="/createtag">
            <Button text="Add New Tag"></Button>
          </Link>
          <Button text="Download List"></Button>
        </ButtonBox>
      </TitleBox>
      <Table>
        <th>Class (Province-city)</th>
        <th>Tags</th>
        {tagState.LocationTagData.map((tag) => (
          <tr>
            <td>
              {tag.className}
              <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                <BiLinkExternal size="15" color="black" />
              </Link>
            </td>
            <TdBox>
              {tag.tags.map((eachtag) => (
                <TdBoxChildren>
                  {eachtag.tagName}({eachtag.postNum})
                </TdBoxChildren>
              ))}
            </TdBox>
          </tr>
        ))}
      </Table>
      <TitleBox>
        <SectionTitle text={"Style Tags"} />
      </TitleBox>
      <Table>
        <th>Class (Style)</th>
        <th>Tags</th>
        {tagState.StyleTagData.map((tag) => (
          <tr>
            <td>
              {tag.className}
              <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                <BiLinkExternal size="15" color="black" />
              </Link>
            </td>
            <TdBox>
              {tag.tags.map((eachtag) => (
                <TdBoxChildren>
                  {eachtag.tagName}({eachtag.postNum})
                </TdBoxChildren>
              ))}
            </TdBox>
          </tr>
        ))}
      </Table>
      <TitleBox>
        <SectionTitle text={"Category Tags"} />
      </TitleBox>
      <Table>
        <th>Class (Category)</th>
        <th>Tags</th>
        {tagState.ProductClassTagData.map((tag) => (
          <tr>
            <td>
              {tag.className}
              <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                <BiLinkExternal size="15" color="black" />
              </Link>
            </td>
            <TdBox>
              {tag.tags.map((eachtag) => (
                <TdBoxChildren>
                  {eachtag.tagName}({eachtag.postNum})
                </TdBoxChildren>
              ))}
            </TdBox>
          </tr>
        ))}
      </Table>
      <TitleBox>
        <SectionTitle text={"Feature Tags"} />
      </TitleBox>
      <Table>
        <th>Class (Feature)</th>
        <th>Tags</th>
        {tagState.FeatureTagData.map((tag) => (
          <tr>
            <td>
              {tag.className}
              <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                <BiLinkExternal size="15" color="black" />
              </Link>
            </td>
            <TdBox>
              {tag.tags.map((eachtag) => (
                <TdBoxChildren>
                  {eachtag.tagName}({eachtag.postNum})
                </TdBoxChildren>
              ))}
            </TdBox>
          </tr>
        ))}
      </Table>
      <TitleBox>
        <SectionTitle text={"Price Tags"} />
      </TitleBox>
      <Table>
        <th>Class (Price)</th>
        <th>Tags</th>
        {tagState.PriceTagData.map((tag) => (
          <tr>
            <td>
              {tag.className}
              <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                <BiLinkExternal size="15" color="black" />
              </Link>
            </td>
            <TdBox>
              {tag.tags.map((eachtag) => (
                <TdBoxChildren>
                  {eachtag.tagName}({eachtag.postNum})
                </TdBoxChildren>
              ))}
            </TdBox>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default Tags;
