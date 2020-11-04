import React, { useContext } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import { TagInfoContext } from "./CreateTagContainer";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import TagTdTable from "./TagTdTable";

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
    padding: 8px;
    vertical-align: middle;
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

const ImageInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PreviewImage = styled.img`
  height: 170px;
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

export default ({ onSubmit }) => {
  const imageInput = React.createRef();
  const { tagDispatch, tagState } = useContext(TagInfoContext);

  const { tagName, category } = tagState.tagInfo;

  const onChange = (e) => {
    const { name, value } = e.target;
    tagDispatch({
      type: "TAGINFO_CHANGE",
      data: {
        name,
        value,
      },
    });
  };

  const ChangeImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      tagDispatch({
        type: "UPDATE_IMAGE",
        data: {
          imageInput,
          tagLogoFile: file,
          tagLogoPreviewUrl: reader.result,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const onClick = (e) => {
    e.preventDefault();
    tagDispatch({
      type: "DELETE_IMAGE",
    });
  };

  let TagLogo_Preview = null;
  if (tagState.tagLogoFile !== "") {
    TagLogo_Preview = (
      <PreviewImage
        className="TagLogo_Preview"
        src={tagState.tagLogoPreviewUrl}
      />
    );
  }

  return (
    <>
      <WrapPage>
        <form onSubmit={onSubmit}>
          <PageTitle text={"Tag Management"} />
          <TitleBox>
            <SectionTitle text={"Tag Information"} />
            <ButtonBox>
              <Link to="/">
                <Button text="Back To Main"></Button>
              </Link>
              <Button type="submit" text="Confirm"></Button>
            </ButtonBox>
          </TitleBox>
          <Table>
            <tr>
              <td>Tag Name</td>
              <td>
                <input
                  name="tagName"
                  type="text"
                  value={tagName}
                  onChange={onChange}
                  required
                />
              </td>
              <td rowSpan="3">Tag Image</td>
              <td rowSpan="3">
                <ImageInputBox>
                  <Input
                    type="file"
                    accept="image/jpg,image/png,image/jpeg"
                    name="TagLogoInput"
                    onChange={(e) => ChangeImage(e)}
                    ref={imageInput}
                  />
                  {TagLogo_Preview}
                </ImageInputBox>
                <ButtonBox onClick={onClick}>
                  <Button text="Delete"></Button>
                </ButtonBox>
              </td>
            </tr>
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
              <td>Tag Class</td>
              <td>
                <TagTdTable category={category} />
              </td>
            </tr>
          </Table>
        </form>
      </WrapPage>
    </>
  );
};
