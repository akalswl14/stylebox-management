import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../../Components/Button";
import { DeleteIcon } from "../../../Components/Icons";
import { EventInfoContext } from "../EventDetailContainer";

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
  const { EventInfoState, EventInfoDispatch } = useContext(EventInfoContext);
  let EventPreviewImage = null;
  if (data.ImagePreviewUrl !== "") {
    EventPreviewImage = (
      <PreviewImage className="EventPreviewImage" src={data.ImagePreviewUrl} />
    );
  }

  const ChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      const rtnData = EventInfoState.MainImages.value.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            ...eachData,
            ImageFile: file,
            ImagePreviewUrl: reader.result,
            isNewImage: true,
            s3Key: null,
          };
        }
        return eachData;
      });
      if (data.isNewImage) {
        EventInfoDispatch({
          type: "UPDATE_MAINIMAGE",
          data: { MainImages: { value: rtnData, isChange: true } },
        });
      } else {
        EventInfoDispatch({
          type: "UPDATE_BATCH",
          data: {
            ...EventInfoState,
            MainImages: { value: rtnData, isChange: true },
            DeleteImageList: [...EventInfoState.DeleteImageList, data.s3Key],
          },
        });
      }
    };
    reader.readAsDataURL(file);
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "order") {
      if (Number(value) > 0) {
        const rtnData = EventInfoState.MainImages.value.map((eachData) => {
          if (eachData.id === Number(data.id)) {
            return {
              ...eachData,
              order: value,
            };
          }
          return eachData;
        });
        EventInfoDispatch({
          type: "UPDATE_MAINIMAGE",
          data: { MainImages: { value: rtnData, isChange: true } },
        });
      }
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    let PrevData = EventInfoState.MainImages.value;
    let isNewImage = data.isNewImage;
    const idx = PrevData.findIndex(function (item) {
      return item.id === Number(rowId);
    });
    if (idx > -1) PrevData.splice(idx, 1);
    if (isNewImage) {
      EventInfoDispatch({
        type: "UPDATE_MAINIMAGE",
        data: { MainImages: { value: PrevData, isChange: true } },
      });
    } else {
      EventInfoDispatch({
        type: "UPDATE_BATCH",
        data: {
          ...EventInfoState,
          MainImages: { value: Prevdata, isChange: true },
          DeleteImageList: [...EventInfoState.DeleteImageList, data.s3Key],
        },
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
      toast.error("Invalid Image.");
      return;
    }
  };

  return (
    <tr id={data.id}>
      <td className="orderInputCell">
        <OrderInputBox name="order" value={data.order} onChange={onChange} />
      </td>
      <td>
        <Input
          type="file"
          accept="image/jpg,image/png,image/jpeg"
          name="EventLogoInput"
          onChange={(e) => ChangeImage(e)}
        />
      </td>
      <td>{EventPreviewImage}</td>
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
