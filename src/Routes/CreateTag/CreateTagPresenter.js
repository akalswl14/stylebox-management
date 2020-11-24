import React, { useContext } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import { TagInfoContext } from "./CreateTagContainer";
import PageChangeButton from "../../Components/PageChangeButton";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import TagTdTable from "./TagTdTable";
import { useQuery } from "react-apollo-hooks";
import { CHECK_TAGNAME } from "./CreateTagQueries";
import { PossibleIcon, ImpossibleIcon } from "../../Components/Icons";

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

export default ({ onSubmit }) => {
  const imageInput = React.createRef();
  const { tagDispatch, tagState } = useContext(TagInfoContext);

  const { tagName, category } = tagState.tagInfo;

  const { data } = useQuery(CHECK_TAGNAME, {
    variables: { tagName: tagName ? tagName : "" },
  });

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

  const onCheck = (e) => {
    e.preventDefault();
    if (!category) {
      alert("Please select a category first.");
      return;
    }
    const isCheck = data.getTagDuplication;
    if (!tagName || tagName === "") {
      alert("Please write a tag name.");
    } else {
      tagDispatch({
        type: "TAGNAME_CHECK",
        data: {
          isCheck,
        },
      });
      if (!isCheck) {
        alert("Duplicate tag name.");
      }
    }
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
              <PageChangeButton text="Back To Main" href="/" />
              <Button type="submit" text="Confirm"></Button>
            </ButtonBox>
          </TitleBox>
          <Table>
            <tbody>
              <tr>
                <td>Tag Name</td>
                <td>
                  <Input
                    InputWidth={100}
                    name="tagName"
                    type="text"
                    value={tagName}
                    onChange={onChange}
                    required
                  />
                  <CheckStatusIcon>
                    {tagState.isCheck ? <PossibleIcon /> : <ImpossibleIcon />}
                  </CheckStatusIcon>
                  <Button
                    text={"Check"}
                    isButtonType={true}
                    ClickEvent={onCheck}
                  ></Button>
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
            </tbody>
          </Table>
        </form>
      </WrapPage>
    </>
  );
};
