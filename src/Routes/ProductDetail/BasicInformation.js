import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import SectionTitle from "../../Components/SectionTitle";
import { ProductInfoContext } from "./ProductDetailContainer";

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
      const productImageInfo = ProductInfoState.BasicInformation.productImage;
      if (productImageInfo.isChange || !productImageInfo.s3Key) {
        ProductInfoDispatch({
          type: "UPDATE_BASICINFO",
          data: {
            BasicInformation: {
              ...ProductInfoState.BasicInformation,
              productImage: {
                File: file,
                PreviewUrl: reader.result,
                isChange: true,
                s3Key: null,
              },
            },
          },
        });
      } else {
        ProductInfoDispatch({
          type: "UPDATE_BATCH",
          data: {
            ...ProductInfoState,
            BasicInformation: {
              ...ProductInfoState.BasicInformation,
              productImage: {
                File: file,
                PreviewUrl: reader.result,
                isChange: true,
                s3Key: null,
              },
            },
            DeleteImageKey: productImageInfo.s3Key,
          },
        });
      }
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
            productName: { value: e.target.value, isChange: true },
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
              isChange: true,
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
              isChange: true,
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
            isChange: true,
          },
        },
      },
    });
  };

  const DeleteImage = (e) => {
    const productImageInfo = ProductInfoState.BasicInformation.productImage;
    if (productImageInfo.isChange || !productImageInfo.s3Key) {
      ProductInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...ProductInfoState.BasicInformation,
            productImage: {
              File: "",
              PreviewUrl: "",
              isChange: true,
              s3Key: null,
            },
          },
        },
      });
    } else {
      ProductInfoDispatch({
        type: "UPDATE_BATCH",
        data: {
          ...ProductInfoState,
          BasicInformation: {
            ...ProductInfoState.BasicInformation,
            productImage: {
              File: "",
              PreviewUrl: "",
              isChange: true,
              s3Key: null,
            },
          },
          DeleteImageKey: productImageInfo.s3Key,
        },
      });
    }
    productImage_Preview = null;
    document.getElementsByName("ProductImageInput")[0].value = null;
  };

  return (
    <>
      <SectionTitle text="Basic Information" />
      <Table>
        <tr>
          <th>Product ID</th>
          <td className="smallerCell">
            {ProductInfoState.BasicInformation.productId}
          </td>
          <th rowSpan="3">Product Image</th>
          <td rowSpan="3">
            <ImageInputBox>
              <Input
                type="file"
                accept="image/jpg,image/png,image/jpeg"
                name="ProductImageInput"
                onChange={(e) => ChangeImage(e)}
              />
              {productImage_Preview}
            </ImageInputBox>
            <Button
              text={"Delete Photo"}
              isButtonType={true}
              ClickEvent={(e) => DeleteImage(e)}
            />
          </td>
        </tr>
        <tr>
          <th>Product Name</th>
          <td className="smallerCell">
            <Input
              InputWidth={300}
              type="text"
              name="ProductNameInput"
              value={ProductInfoState.BasicInformation.productName.value}
              onChange={(e) => onChange(e)}
            />
          </td>
        </tr>
        <tr>
          <th>Price</th>
          <td className="smallerCell">
            <Input
              InputWidth={300}
              type="text"
              name="PriceInput"
              value={ProductInfoState.BasicInformation.price.value}
              onChange={(e) => onChange(e)}
            />
          </td>
        </tr>
        <tr>
          <th>Link URL</th>
          <td colSpan="3" id="AddressCell">
            <AddressCellWrapper>
              <Input
                InputWidth={900}
                type="text"
                name="ShopLinkInput"
                value={ProductInfoState.BasicInformation.externalLink.value}
                onChange={(e) => onChange(e)}
              />
              <Button
                text={"Check"}
                isButtonType={true}
                ClickEvent={CheckLink}
              />
            </AddressCellWrapper>
          </td>
        </tr>
      </Table>
    </>
  );
};
