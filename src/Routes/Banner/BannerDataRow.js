import React, { useContext } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEARCH_EVENT } from "./BannerQueries";
import { DeleteIcon } from "../../Components/Icons";
import { BannerContext } from "./BannerContainer";
import { toast } from "react-toastify";
import ImageThumbnail from "./ImageThumbnail";

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const TitleInputBox = styled.input`
  width: 150px;
  text-align: center;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

const BannerDataRow = ({ data }) => {
  const { BannerDispatch } = useContext(BannerContext);

  const {
    loading: loading_SearchEvent,
    data: data_SearchEvent,
    error: error_SearchEvent,
  } = useQuery(SEARCH_EVENT, {
    variables: { eventTitle: "" },
  });

  if (error_SearchEvent) toast.error("Error Occured while searching events");
  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "order") {
      BannerDispatch({
        type: "UPDATE_BANNER",
        data: {
          id: data.id,
          order: Number(value) > 0 ? Number(value) : "",
          title: data.title,
          eventId: data.eventId,
          bannerImage: data.bannerImage,
        },
      });
    }
    if (name === "eventTitle") {
      for (const eachOption of data_SearchEvent.searchEvent) {
        if (eachOption.title === value) {
          BannerDispatch({
            type: "UPDATE_BANNER",
            data: {
              id: data.id,
              order: data.order,
              title: value,
              eventId: eachOption.id,
              bannerImage: eachOption.bannerImage,
            },
          });
          return;
        }
      }
      BannerDispatch({
        type: "UPDATE_BANNER",
        data: {
          id: data.id,
          order: data.order,
          title: value,
          eventId: 0,
          bannerImage: null,
        },
      });
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    BannerDispatch({
      type: "DELETE_BANNER",
      data: {
        id: Number(rowId),
      },
    });
  };

  const OpenImage = (e, Key) => {
    e.preventDefault();
    const url =
      "https://appdata-stylebox.s3-ap-southeast-1.amazonaws.com/" + Key;
    const img = new Image();
    img.src = url;
    const ImageWidth = img.width;
    const ImageHeight = img.height;
    const features = "width=" + ImageWidth + ",height=" + ImageHeight;
    window.open(url, "", features);
  };

  return (
    <tr id={data.id}>
      <td>
        <OrderInputBox name="order" value={data.order} onChange={onChange} />
      </td>
      <td>{data.eventId ? data.eventId : "-"}</td>
      <td>
        <TitleInputBox
          name="eventTitle"
          value={data.title}
          onChange={onChange}
          list="searchEvents"
        />
        <datalist id="searchEvents">
          {data_SearchEvent &&
            data_SearchEvent.searchEvent.map((eachEvent) => (
              <option value={eachEvent.title} id={eachEvent.id}></option>
            ))}
        </datalist>
      </td>
      <td>
        <ImageThumbnail Key={data.bannerImage} />
      </td>
      <td>
        <button onClick={(e) => OpenImage(e, data.bannerImage)}>
          {"Enlarge"}
        </button>
      </td>
      <td>
        <RowButton onClick={(e) => deleteRow(e, data.id)}>
          <DeleteIcon size={19} />
        </RowButton>
      </td>
    </tr>
  );
};

export default BannerDataRow;
