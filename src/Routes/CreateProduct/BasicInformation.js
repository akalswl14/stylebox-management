import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import OpenPageButton from "../../Components/OpenPageButton";
import SectionTitle from "../../Components/SectionTitle";
import { ProductInfoContext } from "./CreateProductContainer";

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
    width: 10%;
  }
  .smallerCell {
    text-align: left;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
  #checkCell {
    width: 21%;
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

const Input = styled.input`
  width: ${(props) => {
    if (props.InputWidth) {
      return props.InputWidth;
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

export default () => {
  const { ProductInfoState, ProductInfoDispatch } = useContext(
    ProductInfoContext
  );

  let productImage_Preview = null;
  if (ProductInfoState.BasicInformation.productImage.PreviewUrl !== "") {
    productImage_Preview = (
      <PreviewImage
        className="productImage_Preview"
        src={ProductInfoState.BasicInformation.productImage.PreviewUrl}
      />
    );
  }

  const ChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      ProductInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ProductInfoState.BasicInformation,
            productImage: {
              File: file,
              PreviewUrl: reader.result,
            },
          },
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "ProductNameInput") {
      ProductInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ProductInfoState.BasicInformation,
            productName: { value: e.target.value },
          },
        },
      });
    } else if (e.target.name === "PriceInput") {
      ProductInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ProductInfoState.BasicInformation,
            price: {
              value: e.target.value,
            },
          },
        },
      });
    } else if (e.target.name === "ShopLinkInput") {
      ProductInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ProductInfoState.BasicInformation,
            externalLink: {
              value: e.target.value,
            },
          },
        },
      });
    }
  };

  const CheckLink = () => {
    let InputLink = ProductInfoState.BasicInformation.externalLink.value;
    InputLink =
      InputLink.includes("http://") || InputLink.includes("https://")
        ? InputLink
        : "http://" + InputLink;
    try {
      window.open(InputLink, "_blank");
    } catch (e) {
      toast.error("You are checking invalid URL");
    }
    ProductInfoDispatch({
      type: "UPDATE_BASICINFO",
      data: {
        BasicInformation: {
          ...ProductInfoState.BasicInformation,
          externalLink: {
            value: InputLink,
          },
        },
      },
    });
  };

  const DeleteImage = (e) => {
    ProductInfoDispatch({
      type: "UPDATE_BASICINFO",
      data: {
        BasicInformation: {
          ...ProductInfoState.BasicInformation,
          productImage: {
            File: "",
            PreviewUrl: "",
          },
        },
      },
    });
    productImage_Preview = null;
    document.getElementsByName("ProductImageInput")[0].value = null;
  };

  const enlargeClickEvent = (e) => {
    e.preventDefault();
    try {
      const url = ProductInfoState.BasicInformation.productImage.PreviewUrl;
      if (url === "") {
        toast.error("You have to select Image.");
        return;
      }
      const img = new Image();
      img.src = url;
      const ImageWidth = img.width;
      const ImageHeight = img.height;
      const features = "width=" + ImageWidth + ",height=" + ImageHeight;
      var Window = window.open(url, "", features);
      Window.document.write(
        "<!DOCTYPE html><html style='height:100%'><body style='margin:0px;height:100%;'><div style='height:100%;overflow:scroll'>" +
          img.outerHTML +
          "</div><body/><html>"
      );
    } catch {
      toast.error("Image is Invalid.");
      return;
    }
  };

  return (
    <>
      <SectionTitle text="Basic Information" />
      <Table>
        <tbody>
          <tr>
            <th>Product ID</th>
            <td colSpan="2" className="smallerCell">
              {ProductInfoState.BasicInformation.productId}
            </td>
          </tr>
          <tr>
            <th>Product Name</th>
            <td colSpan="2" className="smallerCell">
              <Input
                InputWidth={"76.3%"}
                type="text"
                name="ProductNameInput"
                value={ProductInfoState.BasicInformation.productName.value}
                onChange={(e) => onChange(e)}
              />
            </td>
          </tr>
          <tr>
            <th>Price</th>
            <td colSpan="2" className="smallerCell">
              <Input
                InputWidth={"76.3%"}
                type="text"
                name="PriceInput"
                value={ProductInfoState.BasicInformation.price.value}
                onChange={(e) => onChange(e)}
              />
            </td>
          </tr>
          <tr>
            <th>Link URL</th>
            <td colSpan="1">
              <Input
                InputWidth={"100%"}
                type="text"
                name="ShopLinkInput"
                value={ProductInfoState.BasicInformation.externalLink.value}
                onChange={(e) => onChange(e)}
              />
            </td>
            <td colSpan="1" id="checkCell">
              <Button
                text={"Check"}
                isButtonType={true}
                ClickEvent={CheckLink}
              />
            </td>
          </tr>
          <tr>
            <th colSpan="1" rowSpan="4">
              Product Image
            </th>
            <td colSpan="2" rowSpan="1">
              <ImageInputBox>
                <Input
                  type="file"
                  accept="image/jpg,image/png,image/jpeg"
                  name="ProductImageInput"
                  onChange={(e) => ChangeImage(e)}
                />
                <Button
                  text={"Delete Photo"}
                  isButtonType={true}
                  ClickEvent={(e) => DeleteImage(e)}
                />
              </ImageInputBox>
            </td>
          </tr>
          <tr>
            <td colSpan="1" rowSpan="1">
              {"Before "}
              {ProductInfoState.BasicInformation.productImage.PreviewUrl !==
              "" ? (
                <OpenPageButton func={enlargeClickEvent} />
              ) : null}
            </td>
            <td colSpan="1" rowSpan="1">
              {"After "}
              {ProductInfoState.BasicInformation.productImage.PreviewUrl !==
              "" ? (
                <OpenPageButton func={enlargeClickEvent} />
              ) : null}
            </td>
          </tr>
          <tr>
            <td colSpan="1" rowSpan="1">
              MB
            </td>
            <td colSpan="1" rowSpan="1">
              MB
            </td>
          </tr>
          <tr>
            <td colSpan="1" rowSpan="1">
              {productImage_Preview}
            </td>
            <td colSpan="1" rowSpan="1">
              {productImage_Preview}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
