import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import { TagMapContext } from "./TagMapContainer";
import { BiLinkExternal } from "react-icons/bi";
import PageChangeButton from "../../Components/PageChangeButton";

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
    padding: 8px;
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
    width: 13%;
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

const Tags = () => {
  const { tagState } = useContext(TagMapContext);
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Location Tags"} />
        <ButtonBox>
          <PageChangeButton text="See Tag List" href="/taglist" />
          <PageChangeButton text="Add New Class" href="/createclass" />
          <PageChangeButton text="Add New Tag" href="/createtag" />
          <Button text="Download List"></Button>
        </ButtonBox>
      </TitleBox>
      <Table>
        <thead>
          <tr>
            <th>Class (Province-city)</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {tagState.LocationTagData.map((tag) => (
            <tr key={tag.classId}>
              <td>
                {tag.className}
                <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                  <BiLinkExternal size="15" color="black" />
                </Link>
              </td>
              <TdBox>
                {tag.tags.map((eachtag) => (
                  <TdBoxChildren key={eachtag.tagId}>
                    {eachtag.tagName}({eachtag.postNum})
                  </TdBoxChildren>
                ))}
              </TdBox>
            </tr>
          ))}
        </tbody>
      </Table>
      <TitleBox>
        <SectionTitle text={"Style Tags"} />
      </TitleBox>
      <Table>
        <thead>
          <tr>
            <th>Class (Style)</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {tagState.StyleTagData.map((tag) => (
            <tr key={tag.classId}>
              <td>
                {tag.className}
                <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                  <BiLinkExternal size="15" color="black" />
                </Link>
              </td>
              <TdBox>
                {tag.tags.map((eachtag) => (
                  <TdBoxChildren key={eachtag.tagId}>
                    {eachtag.tagName}({eachtag.postNum})
                  </TdBoxChildren>
                ))}
              </TdBox>
            </tr>
          ))}
        </tbody>
      </Table>
      <TitleBox>
        <SectionTitle text={"Category Tags"} />
      </TitleBox>
      <Table>
        <thead>
          <tr>
            <th>Class (Category)</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {tagState.ProductClassTagData.map((tag) => (
            <tr key={tag.classId}>
              <td>
                {tag.className}
                <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                  <BiLinkExternal size="15" color="black" />
                </Link>
              </td>
              <TdBox>
                {tag.tags.map((eachtag) => (
                  <TdBoxChildren key={eachtag.tagId}>
                    {eachtag.tagName}({eachtag.postNum})
                  </TdBoxChildren>
                ))}
              </TdBox>
            </tr>
          ))}
        </tbody>
      </Table>
      <TitleBox>
        <SectionTitle text={"Feature Tags"} />
      </TitleBox>
      <Table>
        <thead>
          <tr>
            <th>Class (Feature)</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {tagState.FeatureTagData.map((tag) => (
            <tr key={tag.classId}>
              <td>
                {tag.className}
                <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                  <BiLinkExternal size="15" color="black" />
                </Link>
              </td>
              <TdBox>
                {tag.tags.map((eachtag) => (
                  <TdBoxChildren key={eachtag.tagId}>
                    {eachtag.tagName}({eachtag.postNum})
                  </TdBoxChildren>
                ))}
              </TdBox>
            </tr>
          ))}
        </tbody>
      </Table>
      <TitleBox>
        <SectionTitle text={"Price Tags"} />
      </TitleBox>
      <Table>
        <thead>
          <tr>
            <th>Class (Price)</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {tagState.PriceTagData.map((tag) => (
            <tr kety={tag.classId}>
              <td>
                {tag.className}
                <Link to={{ pathname: `/classinfo/${tag.classId}` }}>
                  <BiLinkExternal size="15" color="black" />
                </Link>
              </td>
              <TdBox>
                {tag.tags.map((eachtag) => (
                  <TdBoxChildren key={eachtag.tagId}>
                    {eachtag.tagName}({eachtag.postNum})
                  </TdBoxChildren>
                ))}
              </TdBox>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Tags;
