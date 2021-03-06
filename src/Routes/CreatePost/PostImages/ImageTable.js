import React, { useContext } from "react";
import { DeleteIcon } from "../../../Components/Icons";
import styled from "styled-components";
import { PostInfoContext } from "../PostInfoContainer";
import Button from "../../../Components/Button";
import { toast } from "react-toastify";
import { S3_URL } from "../../../AWS_IAM";

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
`;

const PreviewImage = styled.img`
  height: 170px;
`;

const ImageTable = ({ data }) => {
  const { postDispatch } = useContext(PostInfoContext);
  const imagePostInput = React.createRef();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "order") {
      if (Number(value) >= 0) {
        postDispatch({
          type: "UPDATE_IMAGE",
          data: {
            id: Number(data.id),
            order: Number(value),
            url: data.url,
            imageInput: data.imageInput,
            imageFile: data.imageFile,
            imagePreviewUrl: data.imagePreviewUrl,
          },
        });
      }
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    postDispatch({
      type: "DELETE_IMAGE",
      data: {
        id: Number(rowId),
      },
    });
  };

  const ClickEvent = (e) => {
    e.preventDefault();
    try {
      const url = data.imagePreviewUrl;
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

  const ChangeImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      postDispatch({
        type: "UPDATE_IMAGE_FILE",
        data: {
          id: Number(data.id),
          order: Number(data.order),
          url: data.url,
          imageInput: imagePostInput,
          imageFile: file,
          imagePreviewUrl: reader.result,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const imgUrl = S3_URL + data.url;

  let Image_Preview = null;
  if (data.imageLogoFile !== "") {
    Image_Preview = (
      <PreviewImage className="Image_Preview" src={data.imagePreviewUrl} />
    );
  }

  return (
    <tr id={data.id}>
      <td>
        <OrderInputBox
          name="order"
          type="text"
          value={data.order}
          onChange={onChange}
          required
        />
      </td>
      <td>
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg"
          name="ImageInput"
          onChange={(e) => ChangeImage(e)}
          ref={imagePostInput}
        />
      </td>
      <td>
        {data.url !== "" && data.imageFile === "" ? (
          <PreviewImage src={imgUrl} />
        ) : (
          <></>
        )}
        {Image_Preview}
      </td>
      <td>
        <Button text={"Enlarge"} ClickEvent={ClickEvent} />
      </td>
      <td>
        <RowButton onClick={(e) => deleteRow(e, data.id)}>
          <DeleteIcon size={19} />
        </RowButton>
      </td>
    </tr>
  );
};

export default ImageTable;
