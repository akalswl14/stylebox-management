import React, { useContext } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import { ImpossibleIcon, PossibleIcon } from "../../Components/Icons";
import SectionTitle from "../../Components/SectionTitle";
import { ShopInfoContext } from "./CreateShopContainer";
import { CHECK_SHOPNAME } from "./CreateShopQueries";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  font-size: 15px;
  tr {
    height: 40px;
  }
  tr,
  td,
  th {
    border: ${(props) => props.theme.tableBorder};
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
  }
  .smallerCell {
    width: 600px;
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
  if (ShopInfoState.BasicInformation.ShopLogoFile !== "") {
    ShopLogo_Preview = (
      <PreviewImage
        className="ShopLogo_Preview"
        src={ShopInfoState.BasicInformation.ShopLogoPreviewUrl}
      />
    );
  }

  const ChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      ShopInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ShopInfoState.BasicInformation,
            ShopLogoFile: file,
            ShopLogoPreviewUrl: reader.result,
          },
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "ShopNameInput") {
      ShopInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ShopInfoState.BasicInformation,
            shopName: e.target.value,
            CheckShopName: false,
          },
        },
      });
    } else if (e.target.name === "PhoneNumberInput") {
      ShopInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ShopInfoState.BasicInformation,
            phoneNumber: e.target.value,
          },
        },
      });
    } else if (e.target.name === "MainAddressInput") {
      ShopInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ShopInfoState.BasicInformation,
            MainAddress: e.target.value,
          },
        },
      });
    } else if (e.target.name === "MainMapUrlInput") {
      ShopInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ShopInfoState.BasicInformation,
            MainMapUrl: e.target.value,
          },
        },
      });
    }
  };

  const CheckMapLink = () => {
    let InputLink = ShopInfoState.BasicInformation.MainMapUrl;
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
          MainMapUrl: InputLink,
        },
      },
    });
  };

  const CheckName = async (e) => {
    const InputShopName = ShopInfoState.BasicInformation.shopName;
    if (InputShopName.length <= 0) {
      toast.error("Invalid Shop Name.");
      return;
    } else {
      const {
        data: { getShopNameExists },
      } = await CheckShopNameMutation({
        variables: { shopName: InputShopName },
      });
      if (getShopNameExists == null || CheckError) {
        toast.error("Error occured while checking shopName.");
        return;
      } else {
        if (getShopNameExists) {
          toast.info("🚫  This Shop Name already Exists.");
          ShopInfoDispatch({
            type: "UPDATE_BASICINFO",
            data: {
              BasicInformation: {
                ...ShopInfoState.BasicInformation,
                CheckShopName: false,
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
                CheckShopName: true,
              },
            },
          });
          return;
        }
      }
    }
  };

  const DeleteImage = (e) => {
    ShopInfoDispatch({
      type: "UPDATE_BASICINFO",
      data: {
        BasicInformation: {
          ...ShopInfoState.BasicInformation,
          ShopLogoFile: "",
          ShopLogoPreviewUrl: "",
        },
      },
    });
    ShopLogo_Preview = null;
    document.getElementsByName("ShopLogoInput")[0].value = null;
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
                value={ShopInfoState.BasicInformation.shopName}
                onChange={(e) => onChange(e)}
              />
              <CheckStatusIcon>
                {ShopInfoState.BasicInformation.CheckShopName ? (
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
                value={ShopInfoState.BasicInformation.phoneNumber}
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
                  value={ShopInfoState.BasicInformation.MainAddress}
                  onChange={(e) => onChange(e)}
                />
                <MapUrlWrapper>
                  <TitleSpan>Map URL</TitleSpan>
                  <Input
                    InputWidth={500}
                    type="text"
                    name="MainMapUrlInput"
                    value={ShopInfoState.BasicInformation.MainMapUrl}
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
