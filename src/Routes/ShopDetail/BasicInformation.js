import React, { useContext } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import SectionTitle from "../../Components/SectionTitle";
import { CHECK_SHOPNAME } from "./ShopDetailQueries";
import { ShopInfoContext } from "./ShopDetailContainer";
import { ImpossibleIcon, PossibleIcon } from "../../Components/Icons";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  font-size: 15px;
  tr {
    height: 40px;
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-right: 0.5px solid black;
  }
  .smallerCell {
    width: 600px;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const ImageInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  height: 170px;
`;

const TitleSpan = styled.span`
  width: 90px;
  line-height: 35px;
  border: black solid 1px;
  height: 35px;
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

const AddressCellWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MapUrlWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
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

export default () => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);
  const [CheckShopNameMutation, { error: CheckError }] = useMutation(
    CHECK_SHOPNAME
  );

  let ShopLogo_Preview = null;
  if (ShopInfoState.BasicInformation.ShopLogo.PreviewUrl !== "") {
    ShopLogo_Preview = (
      <PreviewImage
        className="ShopLogo_Preview"
        src={ShopInfoState.BasicInformation.ShopLogo.PreviewUrl}
      />
    );
  }

  const ChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      if (ShopInfoState.BasicInformation.ShopLogo.s3Key) {
        ShopInfoDispatch({
          type: "UPDATE_BATCH",
          data: {
            ...ShopInfoState,
            BasicInformation: {
              ...ShopInfoState.BasicInformation,
              ShopLogo: {
                File: file,
                PreviewUrl: reader.result,
                isChange: true,
                isNewImage: true,
                s3Key: null,
              },
            },
            DeleteImageList: [
              ...ShopInfoState.DeleteImageList,
              ShopInfoState.BasicInformation.ShopLogo.s3Key,
            ],
          },
        });
      } else {
        ShopInfoDispatch({
          type: "UPDATE_BASICINFO",
          data: {
            BasicInformation: {
              ...ShopInfoState.BasicInformation,
              ShopLogo: {
                File: file,
                PreviewUrl: reader.result,
                isChange: true,
                isNewImage: true,
                s3Key: null,
              },
            },
          },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "ShopNameInput") {
      const StateShopName = ShopInfoState.BasicInformation.shopName;
      if (StateShopName.originalValue === e.target.value) {
        ShopInfoDispatch({
          type: "UPDATE_BASICINFO",
          data: {
            BasicInformation: {
              ...ShopInfoState.BasicInformation,
              shopName: {
                ...StateShopName,
                value: e.target.value,
                isChange: false,
                CheckShopName: true,
              },
            },
          },
        });
      } else {
        ShopInfoDispatch({
          type: "UPDATE_BASICINFO",
          data: {
            BasicInformation: {
              ...ShopInfoState.BasicInformation,
              shopName: {
                ...StateShopName,
                value: e.target.value,
                isChange: true,
                CheckShopName: false,
              },
            },
          },
        });
      }
    } else if (e.target.name === "PhoneNumberInput") {
      ShopInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ShopInfoState.BasicInformation,
            phoneNumber: {
              value: e.target.value,
              isChange: true,
            },
          },
        },
      });
    } else if (e.target.name === "MainAddressInput") {
      ShopInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ShopInfoState.BasicInformation,
            MainAddress: {
              value: e.target.value,
              isChange: true,
            },
          },
        },
      });
    } else if (e.target.name === "MainMapUrlInput") {
      ShopInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ShopInfoState.BasicInformation,
            MainMapUrl: {
              value: e.target.value,
              isChange: true,
            },
          },
        },
      });
    }
  };

  const CheckMapLink = () => {
    let InputLink = ShopInfoState.BasicInformation.MainMapUrl.value;
    InputLink =
      InputLink.includes("http://") || InputLink.includes("https://")
        ? InputLink
        : "http://" + InputLink;
    try {
      window.open(InputLink, "_blank");
    } catch (e) {
      toast.error("You are checking invalid URL");
    }
    ShopInfoDispatch({
      type: "UPDATE_BASICINFO",
      data: {
        BasicInformation: {
          ...ShopInfoState.BasicInformation,
          MainMapUrl: {
            value: InputLink,
            isChange: true,
          },
        },
      },
    });
  };

  const DeleteImage = (e) => {
    let DeleteImageList = ShopInfoState.DeleteImageList;
    if (ShopInfoState.BasicInformation.ShopLogo.s3Key) {
      DeleteImageList.push(ShopInfoState.BasicInformation.ShopLogo.s3Key);
    }
    ShopInfoDispatch({
      type: "UPDATE_BATCH",
      data: {
        ...ShopInfoState,
        BasicInformation: {
          ...ShopInfoState.BasicInformation,
          ShopLogo: {
            File: "",
            PreviewUrl: "",
            isChange: true,
            isNewImage: false,
            s3Key: null,
          },
        },
        DeleteImageList,
      },
    });
    ShopLogo_Preview = null;
    document.getElementsByName("ShopLogoInput")[0].value = null;
  };

  const CheckName = async (e) => {
    const InputShopName = ShopInfoState.BasicInformation.shopName;
    if (!InputShopName.isChange) {
      toast.info("Original Shop Name");
      return;
    }
    if (InputShopName.value.length <= 0) {
      toast.error("Invalid Shop Name.");
      return;
    } else {
      const {
        data: { getShopNameExists },
      } = await CheckShopNameMutation({
        variables: { shopName: InputShopName.value },
      });
      if (getShopNameExists == null || CheckError) {
        toast.error("Error occured while checking shopName.");
        return;
      } else {
        if (getShopNameExists) {
          toast.info(
            "🚫  The Shop Name already exists. Please check it again."
          );
          ShopInfoDispatch({
            type: "UPDATE_BASICINFO",
            data: {
              BasicInformation: {
                ...ShopInfoState.BasicInformation,
                shopName: {
                  ...InputShopName,
                  CheckShopName: false,
                },
              },
            },
          });
          return;
        } else {
          toast.info("✅  Valid Shop Name.");
          ShopInfoDispatch({
            type: "UPDATE_BASICINFO",
            data: {
              BasicInformation: {
                ...ShopInfoState.BasicInformation,
                shopName: {
                  ...InputShopName,
                  CheckShopName: true,
                },
              },
            },
          });
          return;
        }
      }
    }
  };
  return (
    <>
      <SectionTitle text="Basic Information" />
      <Table>
        <tbody>
          <tr>
            <th>Shop ID</th>
            <td className="smallerCell">
              {ShopInfoState.BasicInformation.shopId}
            </td>
            <th rowSpan="3">Shop Logo</th>
            <td rowSpan="3">
              <ImageInputBox>
                <Input
                  type="file"
                  accept="image/jpg,image/png,image/jpeg"
                  name="ShopLogoInput"
                  onChange={(e) => ChangeImage(e)}
                />
                {ShopLogo_Preview}
              </ImageInputBox>
              <Button
                text={"Delete Photo"}
                isButtonType={true}
                ClickEvent={(e) => DeleteImage(e)}
              />
            </td>
          </tr>
          <tr>
            <th>Shop Name</th>
            <td className="smallerCell">
              <Input
                InputWidth={300}
                type="text"
                name="ShopNameInput"
                value={ShopInfoState.BasicInformation.shopName.value}
                onChange={(e) => onChange(e)}
              />
              <CheckStatusIcon>
                {ShopInfoState.BasicInformation.shopName.CheckShopName ? (
                  <PossibleIcon />
                ) : (
                  <ImpossibleIcon />
                )}
              </CheckStatusIcon>
              <Button
                text={"Check"}
                isButtonType={true}
                ClickEvent={CheckName}
              />
            </td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td className="smallerCell">
              <Input
                InputWidth={300}
                type="text"
                name="PhoneNumberInput"
                value={ShopInfoState.BasicInformation.phoneNumber.value}
                onChange={(e) => onChange(e)}
              />
            </td>
          </tr>
          <tr>
            <th>Main Address</th>
            <td colSpan="3" id="AddressCell">
              <AddressCellWrapper>
                <Input
                  InputWidth={500}
                  type="text"
                  name="MainAddressInput"
                  value={ShopInfoState.BasicInformation.MainAddress.value}
                  onChange={(e) => onChange(e)}
                />
                <MapUrlWrapper>
                  <TitleSpan>Map URL</TitleSpan>
                  <Input
                    InputWidth={500}
                    type="text"
                    name="MainMapUrlInput"
                    value={ShopInfoState.BasicInformation.MainMapUrl.value}
                    onChange={(e) => onChange(e)}
                  />
                </MapUrlWrapper>
                <Button
                  text={"Check"}
                  isButtonType={true}
                  ClickEvent={CheckMapLink}
                />
              </AddressCellWrapper>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
