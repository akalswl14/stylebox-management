import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { EventInfoContext } from "./CreateEventContainer";
import { toast } from "react-toastify";
import Button from "../../Components/Button";

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
    width: 200px;
  }
  .orderInputCell,
  .buttonCell {
    width: 120px;
  }
  .checkButtonCell {
    width: 180px;
  }
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

export default () => {
  const { EventInfoState, EventInfoDispatch } = useContext(EventInfoContext);

  const ThumbnailImageData = EventInfoState.ThumbnailImages.value;

  let EventPreviewImage = null;
  if (ThumbnailImageData.ImagePreviewUrl !== "") {
    EventPreviewImage = (
      <PreviewImage
        className="EventPreviewImage"
        src={ThumbnailImageData.ImagePreviewUrl}
      />
    );
  }

  const ChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      let rtnData = {
        id: 1,
        ImageFile: file,
        ImagePreviewUrl: reader.result,
      };

      EventInfoDispatch({
        type: "UPDATE_THUMBNAIL",
        data: { ThumbnailImages: { value: rtnData } },
      });
    };
    reader.readAsDataURL(file);
  };

  const OpenImage = (e) => {
    e.preventDefault();
    try {
      const url = ThumbnailImageData.ImagePreviewUrl;
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
    <>
      <SectionTitle text="Event Thumbnail Images" />
      <Table>
        <tbody>
          <tr>
            <th>Post Thumbnail Image</th>
            <td>
              <Input
                type="file"
                accept="image/jpg,image/png,image/jpeg"
                name="ThumbnailImageInput"
                onChange={(e) => ChangeImage(e)}
              />
            </td>
            <td>{EventPreviewImage}</td>
            <td className="checkButtonCell">
              <Button
                text={"Check"}
                isButtonType={true}
                ClickEvent={OpenImage}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
