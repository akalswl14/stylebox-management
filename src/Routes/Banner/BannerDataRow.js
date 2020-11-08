import React, { useContext } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEARCH_EVENT } from "./BannerQueries";
import { DeleteIcon } from "../../Components/Icons";
import { BannerContext } from "./BannerContainer";
import { toast } from "react-toastify";
import ImageThumbnail from "./ImageThumbnail";
import AutoSelectBox from "./AutoSelectBox";
import { S3_URL } from "../../AWS_IAM";

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

  const onEventTitleSelect = (e) => {
    if (!e.target.querySelector("li>span")) {
      const value = e.target.value;
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
    } else {
      const EventId = Number(e.target.querySelector("li>span").textContent);
      for (const eachOption of data_SearchEvent.searchEvent) {
        if (eachOption.id === EventId) {
          BannerDispatch({
            type: "UPDATE_BANNER",
            data: {
              id: data.id,
              order: data.order,
              title: eachOption.title,
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
          title: data.title,
          eventId: 0,
          bannerImage: null,
        },
      });
    }
  };

  const onEventTitleChange = (e) => {
    const value = e.target.value;
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
  };

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
    const url = S3_URL + Key;
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
        <AutoSelectBox
          defaultValue={{
            id: data.eventId,
            title: data.title,
            bannerImage: data.bannerImage,
          }}
          data={data_SearchEvent ? data_SearchEvent.searchEvent : []}
          onTitleChangeFunc={onEventTitleChange}
          onTitleSelectFunc={onEventTitleSelect}
        />
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
