import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { TagInfoContext } from "./TagInfoContainer";
import PageChangeButton from "../../Components/PageChangeButton";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import TagTdTable from "./TagTdTable";
import { S3_URL } from "../../AWS_IAM";

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

export default ({ loading, data, error, onSubmit }) => {
  const imageInput = React.createRef();
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    const { tagDispatch, tagState } = useContext(TagInfoContext);
    const {
      tagId,
      tagName,
      category,
      postNum,
      shopNum,
      productNum,
      createdAt,
      updatedAt,
    } = tagState.tagInfo;

    useEffect(() => {
      const tagData = data.getTagInfo;
      let tagInfo = {
        tagId: tagData.tagId,
        tagName: tagData.tagName,
        tagImage: tagData.tagImage,
        classId: tagData.classId,
        className: tagData.className,
        category: tagData.category,
        postNum: tagData.postNum,
        shopNum: tagData.shopNum,
        productNum: tagData.productNum,
        createdAt: tagData.createdAt,
        updatedAt: tagData.updatedAt,
      };

      tagDispatch({
        type: "SET_DATA",
        data: {
          tagInfo,
        },
      });
    }, []);

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

    let RegistrationDate = String(createdAt).split("T");
    let UpdatedDate = String(updatedAt).split("T");
    let UpdatedTime = String(UpdatedDate[1]).split(".");

    let TagLogo_Preview = null;
    if (tagState.tagLogoFile !== "") {
      TagLogo_Preview = (
        <PreviewImage
          className="TagLogo_Preview"
          src={tagState.tagLogoPreviewUrl}
        />
      );
    }

    if (!tagState.isData) {
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
                    <td>Tag Id</td>
                    <td>{tagId}</td>
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
                        {tagState.tagLogoFile === "" &&
                        tagState.tagInfo.tagImage ? (
                          <PreviewImage
                            className="TagLogo_Preview"
                            src={S3_URL + tagState.tagInfo.tagImage}
                          />
                        ) : (
                          <></>
                        )}
                        {TagLogo_Preview}
                      </ImageInputBox>
                      <ButtonBox onClick={onClick}>
                        <Button text="Delete"></Button>
                      </ButtonBox>
                    </td>
                  </tr>
                  <tr>
                    <td>Tag Name</td>
                    <td>
                      <input
                        name="tagName"
                        type="text"
                        value={tagName}
                        required
                        onChange={onChange}
                      />
                    </td>
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
                  </tr>
                  <tr>
                    <td>Tag Class</td>
                    <td colSpan="3">
                      <TagTdTable category={category} />
                    </td>
                  </tr>
                  <tr>
                    <td>Posts</td>
                    <td>{postNum} Posts</td>
                    <td>Shops</td>
                    <td>{shopNum} Shops</td>
                  </tr>
                  <tr>
                    <td>Products</td>
                    <td colSpan="3">{productNum} Products</td>
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
