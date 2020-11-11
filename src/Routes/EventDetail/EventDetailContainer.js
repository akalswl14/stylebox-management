import React, { useReducer } from "react";
import EventDetailPresenter from "./EventDetailPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CATEGORY_OPTION, UPDATE_EVENT, GET_EVENT } from "./EventDetailQueries";
import { toast } from "react-toastify";
import putImagetoS3 from "./putImagetoS3";
import deleteImagefromS3 from "./deleteImagefromS3";

export const EventInfoContext = React.createContext(null);

const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const initialState = {
  BasicInformation: {
    eventId: "-",
    isOnList: { value: true, isChange: false },
    title: { value: "", isChange: false },
    startDate: { value: today, isChange: false },
    endDate: { value: tomorrow, isChange: false },
    url: { value: "", isChange: false },
  },
  BasicStatus: {
    likesNum: 0,
    viewsNum: 0,
    RegistrationDate: "--/--/----",
    LastUpdated: "--/--/--- --:--:--",
  },
  TagInformation: { value: [], isChange: false },
  ThumbnailImages: {
    value: { id: 1, ImageFile: "", ImagePreviewUrl: "" },
    isChange: false,
  },
  MainImages: { value: [], isChange: false },
  MainVideos: { value: [], isChange: false },
  DetailImages: { value: [], isChange: false },
  CategoryData: [],
  DeleteImageList: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_BASICINFO":
      return { ...state, BasicInformation: action.data.BasicInformation };
    case "UPDATE_BASICSTATUS":
      return { ...state, BasicStatus: action.data.BasicStatus };
    case "UPDATE_TAGINFO":
      return { ...state, TagInformation: action.data.TagInformation };
    case "UPDATE_THUMBNAIL":
      return { ...state, ThumbnailImages: action.data.ThumbnailImages };
    case "UPDATE_MAINIMAGE":
      return { ...state, MainImages: action.data.MainImages };
    case "UPDATE_MAINVIDEO":
      return { ...state, MainVideos: action.data.MainVideos };
    case "UPDATE_DETAILIMAGE":
      return { ...state, DetailImages: action.data.DetailImages };
    case "UPDATE_BATCH":
      return action.data;
    default:
      return state;
  }
}

export default ({ match }) => {
  const [EventInfoState, EventInfoDispatch] = useReducer(reducer, initialState);

  const eventId = Number(match.params.eventId);

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId },
  });

  const [UpdateEventMutation, { error: UpdateError }] = useMutation(
    UPDATE_EVENT
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(EventInfoState);

    let TimeNumber = new Date();
    if (
      EventInfoState.BasicInformation.title.isChange &&
      EventInfoState.BasicInformation.title.value === ""
    ) {
      toast.error("Please enter Event Title.");
      return;
    }
    if (
      EventInfoState.BasicInformation.startDate.isChange ||
      EventInfoState.BasicInformation.endDate.isChange
    ) {
      if (
        new Date(EventInfoState.BasicInformation.startDate.value) >
        new Date(EventInfoState.BasicInformation.endDate.value)
      ) {
        toast.error("Start date have to earlier than End date.");
        return;
      }
    }
    if (EventInfoState.BasicInformation.url.isChange) {
      if (
        EventInfoState.BasicInformation.url.value === "http://" ||
        EventInfoState.BasicInformation.url.value === "" ||
        EventInfoState.BasicInformation.url.value === "https://"
      ) {
        toast.error("Invalid Event Link URL.");
        return;
      }
    }
    let TagOrderList = [];
    let TagIdList = [];
    let rtnTagList = [];
    if (EventInfoState.TagInformation.isChange) {
      let inputTagList = EventInfoState.TagInformation.value;
      inputTagList.sort((a, b) => a.order - b.order);
      for (const eachTag of inputTagList) {
        if (TagOrderList.includes(Number(eachTag.order))) {
          toast.error("Tag Order values should not be the same.");
          return;
        }
        if (isNaN(Number(eachTag.order))) {
          toast.error("Invalid Tag Order Value.");
          return;
        }
        if (Number(eachTag.order) <= 0) {
          toast.error("Tag Order Value should be bigger than 0");
        }
        if (
          Number(eachTag.tagId) === 0 ||
          Number(eachTag.classId) === 0 ||
          eachTag.category === "-- CHOOSE DATA --" ||
          eachTag.category === "-- LOADING --"
        ) {
          toast.error("Please choose Tag.");
          return;
        }
        if (TagIdList.includes(Number(eachTag.tagId))) {
          toast.error("Tag should not be the same.");
          return;
        }
        TagOrderList.push(Number(eachTag.order));
        TagIdList.push(Number(eachTag.tagId));
        rtnTagList.push({
          id: Number(eachTag.tagId),
          order: Number(eachTag.order),
        });
      }
    }
    let rtnImage = {
      ThumbnailImages: null,
      MainImages: [],
      DetailImages: [],
      s3Images: [],
    };
    if (EventInfoState.ThumbnailImages.isChange) {
      let rtnThumbnailImage = {
        File: EventInfoState.ThumbnailImages.value.ImageFile,
        fileName: null,
      };
      if (rtnThumbnailImage.File === "" || !rtnThumbnailImage.File) {
        toast.error("Please add Thumbnail Image.");
        return;
      } else {
        var ImageType = rtnThumbnailImage.File.type.substring(6);
        TimeNumber = new Date();
        var ImageFileName =
          "Event/" +
          eventId +
          "/Thumbnail_" +
          TimeNumber.getTime() +
          "." +
          ImageType;
        rtnThumbnailImage.fileName = ImageFileName;
        rtnImage.ThumbnailImages = ImageFileName;
        rtnImage.s3Images.push(rtnThumbnailImage);
      }
    }
    if (
      EventInfoState.MainImages.value.length +
        EventInfoState.MainVideos.value.length ===
      0
    ) {
      toast.error("Please add Main Image or Main Video.");
      return;
    }

    if (EventInfoState.MainImages.isChange) {
      let mainImageOrderList = [];
      for (const eachImage of EventInfoState.MainImages.value) {
        if (eachImage.isNewImage) {
          if (eachImage.ImageFile === "" || !eachImage.ImageFile) {
            toast.error("Please upload a Main Image.");
            return;
          }
        }
        if (mainImageOrderList.includes(Number(eachImage.order))) {
          toast.error("Main Image Order values should not be the same.");
          return;
        }
        if (isNaN(Number(eachImage.order))) {
          toast.error("Invalid Main Image Order Value.");
          return;
        }
        if (Number(eachImage.order) <= 0) {
          toast.error("Main Image Order Value should be bigger than 0");
        }
        TimeNumber = new Date();
        var ImageFileName = null;
        if (eachImage.isNewImage) {
          var ImageType = eachImage.ImageFile.type.substring(6);
          ImageFileName =
            "Event/" +
            eventId +
            "/Main_" +
            eachImage.order +
            "_" +
            TimeNumber.getTime() +
            "." +
            ImageType;
          rtnImage.s3Images.push({
            File: eachImage.ImageFile,
            fileName: ImageFileName,
          });
        } else {
          ImageFileName = eachImage.s3Key;
        }
        rtnImage.MainImages.push({
          order: Number(eachImage.order),
          url: ImageFileName,
        });
        mainImageOrderList.push(Number(eachImage.order));
      }
    }

    let VideoOrderList = [];
    let rtnVideoList = [];
    if (EventInfoState.MainVideos.isChange) {
      for (const eachVideo of EventInfoState.MainVideos.value) {
        if (VideoOrderList.includes(Number(eachVideo.order))) {
          toast.error("Video Order values should not be the same.");
          return;
        }
        if (isNaN(Number(eachVideo.order))) {
          toast.error("Invalid Video Order value.");
          return;
        }
        if (Number(eachVideo.order) <= 0) {
          toast.error("Video Order values should be bigger than 0.");
          return;
        }
        if (
          eachVideo.url === "http://" ||
          eachVideo.url === "" ||
          eachVideo.url === "https://"
        ) {
          toast.error("Invalid Video URL value.");
          return;
        }
        VideoOrderList.push(Number(eachVideo.order));
        rtnVideoList.push({
          order: Number(eachVideo.order),
          url: eachVideo.url,
        });
      }
      rtnVideoList.sort((a, b) => a.order - b.order);
    }

    if (EventInfoState.DetailImages.value.length === 0) {
      toast.error("Please add Detail Image.");
      return;
    }

    if (EventInfoState.DetailImages.isChange) {
      let detailImageOrderList = [];
      for (const eachImage of EventInfoState.DetailImages.value) {
        if (eachImage.isNewImage) {
          if (eachImage.ImageFile === "" || !eachImage.ImageFile) {
            toast.error("Please upload a Detail Image.");
            return;
          }
        }
        if (detailImageOrderList.includes(Number(eachImage.order))) {
          toast.error("Detail Image Order values should not be the same.");
          return;
        }
        if (isNaN(Number(eachImage.order))) {
          toast.error("Invalid Detail Image Order Value.");
          return;
        }
        if (Number(eachImage.order) <= 0) {
          toast.error("Detail Image Order Value should be bigger than 0");
        }
        var ImageFileName = null;
        if (eachImage.isNewImage) {
          var ImageType = eachImage.ImageFile.type.substring(6);
          ImageFileName =
            "Event/" +
            eventId +
            "/Detail_" +
            eachImage.order +
            "_" +
            TimeNumber.getTime() +
            "." +
            ImageType;
          rtnImage.s3Images.push({
            File: eachImage.ImageFile,
            fileName: ImageFileName,
          });
        } else {
          ImageFileName = eachImage.s3Key;
        }
        TimeNumber = new Date();
        rtnImage.DetailImages.push({
          order: Number(eachImage.order),
          url: ImageFileName,
        });
        detailImageOrderList.push(eachImage.order);
      }
    }
    let rtnStartDate = new Date(
      EventInfoState.BasicInformation.startDate.value
    );
    if (EventInfoState.BasicInformation.startDate.isChange) {
      rtnStartDate.setUTCHours(17, 0, 0, 0);
    }
    let rtnEndDate = new Date(EventInfoState.BasicInformation.endDate.value);
    if (EventInfoState.BasicInformation.endDate.isChange) {
      rtnEndDate.setUTCHours(17, 0, 0, 0);
    }
    const mutationData = {
      eventId,
      title: EventInfoState.BasicInformation.title.isChange
        ? EventInfoState.BasicInformation.title.value
        : null,
      startDate: EventInfoState.BasicInformation.startDate.isChange
        ? rtnStartDate
        : null,
      endDate: EventInfoState.BasicInformation.endDate.isChange
        ? rtnEndDate
        : null,
      url: EventInfoState.BasicInformation.url.isChange
        ? EventInfoState.BasicInformation.url.value
        : null,
      bannerImage: EventInfoState.ThumbnailImages.isChange
        ? rtnImage.ThumbnailImages
        : null,
      isOnList: EventInfoState.BasicInformation.isOnList.isChange
        ? EventInfoState.BasicInformation.isOnList.value
        : null,
      images: EventInfoState.MainImages.isChange ? rtnImage.MainImages : null,
      contentsImages: EventInfoState.DetailImages.isChange
        ? rtnImage.DetailImages
        : null,
      videos: EventInfoState.MainVideos.isChange ? rtnVideoList : null,
      tags: EventInfoState.TagInformation.isChange ? rtnTagList : null,
    };

    const {
      data: { updateEvent },
    } = await UpdateEventMutation({
      variables: mutationData,
    });
    if (!updateEvent || UpdateError) {
      toast.error("Error occured while update data.");
      return;
    }

    if (updateEvent) {
      try {
        for (const eachImage of rtnImage.s3Images) {
          await putImagetoS3({
            file: eachImage.File,
            fileName: eachImage.fileName,
          });
        }
      } catch (e) {
        toast.error("Error occured while update data.");
        return;
      }
      try {
        await deleteImagefromS3({
          keys: EventInfoState.DeleteImageList,
        });
      } catch (e) {
        toast.error("Error occured while update data.");
        return;
      }
      toast.success("Sucessfullly update Data!");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);
      return;
    }
  };

  return (
    <EventInfoContext.Provider value={{ EventInfoState, EventInfoDispatch }}>
      <EventDetailPresenter
        onSubmit={onSubmit}
        loading={loading}
        data={data}
        error={error}
      />
    </EventInfoContext.Provider>
  );
};
