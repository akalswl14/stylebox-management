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
import { useQuery } from "react-apollo-hooks";
import { CHECK_TAGNAME } from "./TagInfoQueries";
import { PossibleIcon, ImpossibleIcon } from "../../Components/Icons";
import { toast } from "react-toastify";

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
  td {
    padding: 8px;
    vertical-align: middle;
    width: 25%;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:nth-child(odd) {
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

const CheckStatusIcon = styled.span`
  height: 35px;
  padding: 0px 10px;
  line-height: 35px;
  width: 35px;
  justify-content: center;
  vertical-align: middle;
  display: inline-block;
`;

const getFormatDate = (date) => {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  let hour = date.getHours();
  hour = hour >= 10 ? hour : "0" + hour;
  let minute = date.getMinutes();
  minute = minute >= 10 ? minute : "0" + minute;
  let seconds = date.getSeconds();
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
  );
};

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

    const { data: checkData } = useQuery(CHECK_TAGNAME, {
      variables: { tagName: tagName ? tagName : "" },
    });

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
          originalTagName: tagData.tagName,
        },
      });
    }, []);

    const onChange = (e) => {
      const { name, value } = e.target;
      let isCheck = false;
      if (tagState.originalTagName === value) {
        isCheck = true;
      }
      tagDispatch({
        type: "TAGINFO_CHANGE",
        data: {
          name,
          value,
          isCheck,
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
        toast.error("Please select a category first.");
        return;
      }
      let isCheck = checkData.getTagDuplication;
      if (!tagName || tagName === "") {
        toast.error("Please write a tag name.");
      } else {
        if (tagState.originalTagName === tagName) isCheck = true;
        tagDispatch({
          type: "TAGNAME_CHECK",
          data: {
            isCheck,
          },
        });
        if (!isCheck) {
          toast.info("🚫  The Tag already exists. Please check it again.");
        } else {
          toast.info("✅  Valid Tag.");
        }
      }
    };

    const registrationDate = getFormatDate(new Date(createdAt));
    const updatedDate = getFormatDate(new Date(updatedAt));

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
                  <PageChangeButton text="Back to List" href="/taglist" />
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
                      {category !== "ShopName" ? (
                        <>
                          {" "}
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
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Tag Name</td>
                    <td>
                      {category !== "ShopName" ? (
                        <>
                          <Input
                            InputWidth={100}
                            name="tagName"
                            type="text"
                            value={tagName}
                            onChange={onChange}
                            required
                          />
                          <CheckStatusIcon>
                            {tagState.isCheck ? (
                              <PossibleIcon />
                            ) : (
                              <ImpossibleIcon />
                            )}
                          </CheckStatusIcon>
                          <Button
                            text={"Check"}
                            isButtonType={true}
                            ClickEvent={onCheck}
                          ></Button>{" "}
                        </>
                      ) : (
                        tagName
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Tag Type</td>
                    <td>
                      {category !== "ShopName" ? (
                        <>
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
                        </>
                      ) : (
                        category
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Tag Class</td>
                    <td colSpan="3">
                      {category !== "ShopName" ? (
                        <TagTdTable category={category} />
                      ) : (
                        tagName
                      )}
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
                    <td>{registrationDate}</td>
                    <td>Last Updated</td>
                    <td>{updatedDate}</td>
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
