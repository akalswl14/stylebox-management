import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../../Components/Button";
import { DeleteIcon } from "../../../Components/Icons";
import { ShopInfoContext } from "../ShopDetailContainer";

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
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
  text-align: center;
  text-align: left;
`;

const PreviewImage = styled.img`
  height: 170px;
`;

export default ({ data }) => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);
  let ShopPreviewImage = null;
  if (data.ImagePreviewUrl !== "") {
    ShopPreviewImage = (
      <PreviewImage className="ShopPreviewImage" src={data.ImagePreviewUrl} />
    );
  }

  const ChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let targetData;
    reader.onloadend = () => {
      const rtnData = ShopInfoState.ShopImagesManagement.value.map(
        (eachData) => {
          if (eachData.id === Number(data.id)) {
            targetData = eachData;
            return {
              ...eachData,
              ImageFile: file,
              ImagePreviewUrl: reader.result,
              isNewImage: true,
              s3Key: null,
            };
          }
          return eachData;
        }
      );
      if (targetData.s3Key) {
        ShopInfoDispatch({
          type: "UPDATE_BATCH",
          data: {
            ...ShopInfoState,
            ShopImagesManagement: { value: rtnData, isChange: true },
            DeleteImageList: [
              ...ShopInfoState.DeleteImageList,
              targetData.s3Key,
            ],
          },
        });
      }
      ShopInfoDispatch({
        type: "UPDATE_SHOPIMAGE",
        data: { ShopImagesManagement: { value: rtnData, isChange: true } },
      });
    };
    reader.readAsDataURL(file);
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "order") {
      if (Number(value) > 0) {
        const rtnData = ShopInfoState.ShopImagesManagement.value.map(
          (eachData) => {
            if (eachData.id === Number(data.id)) {
              return {
                ...eachData,
                order: value,
              };
            }
            return eachData;
          }
        );
        ShopInfoDispatch({
          type: "UPDATE_SHOPIMAGE",
          data: { ShopImagesManagement: { value: rtnData, isChange: true } },
        });
      }
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    let PrevData = ShopInfoState.ShopImagesManagement.value;
    let targetData = null;
    const idx = PrevData.findIndex(function (item) {
      if (item.id === Number(rowId)) {
        targetData = item;
        return true;
      }
    });
    if (idx > -1) {
      PrevData.splice(idx, 1);
      let DeleteImageList = ShopInfoState.DeleteImageList;
      if (targetData.s3Key) DeleteImageList.push(targetData.s3Key);
      ShopInfoDispatch({
        type: "UPDATE_BATCH",
        data: {
          ...ShopInfoState,
          ShopImagesManagement: { value: PrevData, isChange: true },
        },
        DeleteImageList,
      });
    }
  };

  const OpenImage = (e) => {
    e.preventDefault();
    try {
      const url = data.ImagePreviewUrl;
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
        "<!DOCTYPE html><body style='margin:0px'>" + img.outerHTML + "<body/>"
      );
    } catch {
      toast.error("Image is Invalid.");
      return;
    }
  };

  return (
    <tr id={data.id} key={data.id}>
      <td className="orderInputCell">
        <OrderInputBox name="order" value={data.order} onChange={onChange} />
      </td>
      <td>
        <Input
          type="file"
          accept="image/jpg,image/png,image/jpeg"
          name="ShopLogoInput"
          onChange={(e) => ChangeImage(e)}
        />
      </td>
      <td>{ShopPreviewImage}</td>
      <td className="checkButtonCell">
        <Button text={"Check"} isButtonType={true} ClickEvent={OpenImage} />
      </td>
      <td className="buttonCell">
        <RowButton onClick={(e) => deleteRow(e, data.id)}>
          <DeleteIcon size={19} />
        </RowButton>
      </td>
    </tr>
  );
};
