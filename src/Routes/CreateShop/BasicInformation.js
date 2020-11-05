import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import SectionTitle from "../../Components/SectionTitle";
import { ShopInfoContext } from "./CreateShopContainer";

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const Form = styled.form``;

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
    width: 400px;
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

export default () => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

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
      </Table>
    </>
  );
};
