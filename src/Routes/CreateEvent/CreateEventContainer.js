import React, { useReducer } from "react";
import CreateEventPresenter from "./CreateEventPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CATEGORY_OPTION, CREATE_EVENT } from "./CreateEventQueries";
import { toast } from "react-toastify";
import putImagetoS3 from "./putImagetoS3";

export const EventInfoContext = React.createContext(null);

const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const initialState = {
  BasicInformation: {
    eventId: "-",
    isOnList: { value: true },
    title: { value: "" },
    startDate: { value: today },
    endDate: { value: tomorrow },
    url: { value: "" },
  },
  BasicStatus: {
    likesNum: 0,
    viewsNum: 0,
    RegistrationDate: "--/--/----",
    LastUpdated: "--/--/--- --:--:--",
  },
  TagInformation: { value: [] },
  ThumbnailImages: { value: { id: 1, ImageFile: "", ImagePreviewUrl: "" } },
  MainImages: { value: [] },
  MainVideos: { value: [] },
  DetailImages: { value: [] },
  CategoryData: [],
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

export default () => {
  const [EventInfoState, EventInfoDispatch] = useReducer(reducer, initialState);

  const { loading, error, data } = useQuery(CATEGORY_OPTION);

  const [CreateEventMutation, { error: CreateError }] = useMutation(
    CREATE_EVENT
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    let TimeNumber = new Date();
    if (EventInfoState.BasicInformation.title.value === "") {
      toast.error("Please enter Event Title.");
      return;
    }
    if (
      EventInfoState.BasicInformation.startDate.value >
      EventInfoState.BasicInformation.endDate.value
    ) {
      toast.error("Start date have to earlier than End date.");
      return;
    }
    if (
      EventInfoState.BasicInformation.url.value === "http://" ||
      EventInfoState.BasicInformation.url.value === "" ||
      EventInfoState.BasicInformation.url.value === "https://"
    ) {
      toast.error("Invalid Event Link URL.");
      return;
    }
    let TagOrderList = [];
    let TagIdList = [];
    let rtnTagList = [];
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
    let rtnImage = {
      ThumbnailImages: null,
      MainImages: [],
      DetailImages: [],
      s3Images: [],
    };
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
      var ImageFileName = "Thumbnail_" + TimeNumber.getTime() + "." + ImageType;
      rtnThumbnailImage.fileName = ImageFileName;
      rtnImage.ThumbnailImages = ImageFileName;
      rtnImage.s3Images.push(rtnThumbnailImage);
    }
    if (
      EventInfoState.MainImages.value.length +
        EventInfoState.MainVideos.value.length ===
      0
    ) {
      toast.error("Please add Main Image or Main Video.");
      return;
    }

    let mainImageOrderList = [];
    for (const eachImage of EventInfoState.MainImages.value) {
      if (eachImage.ImageFile === "" || !eachImage.ImageFile) {
        toast.error("Please upload a Main Image.");
        return;
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
      var ImageType = eachImage.ImageFile.type.substring(6);
      TimeNumber = new Date();
      var ImageFileName =
        "Main_" +
        eachImage.order +
        "_" +
        TimeNumber.getTime() +
        "." +
        ImageType;
      rtnImage.MainImages.push({
        order: Number(eachImage.order),
        url: ImageFileName,
      });
      rtnImage.s3Images.push({
        File: eachImage.ImageFile,
        fileName: ImageFileName,
      });
      mainImageOrderList.push(Number(eachImage.order));
    }

    let VideoOrderList = [];
    let rtnVideoList = [];
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
      rtnVideoList.push({ order: Number(eachVideo.order), url: eachVideo.url });
    }

    rtnVideoList.sort((a, b) => a.order - b.order);

    if (EventInfoState.DetailImages.value.length === 0) {
      toast.error("Please add Detail Image.");
      return;
    }

    let detailImageOrderList = [];
    for (const eachImage of EventInfoState.DetailImages.value) {
      if (eachImage.ImageFile === "" || !eachImage.ImageFile) {
        toast.error("Please upload a Detail Image.");
        return;
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
      var ImageType = eachImage.ImageFile.type.substring(6);
      TimeNumber = new Date();
      var ImageFileName =
        "Detail_" +
        eachImage.order +
        "_" +
        TimeNumber.getTime() +
        "." +
        ImageType;
      rtnImage.DetailImages.push({
        order: Number(eachImage.order),
        url: ImageFileName,
      });
      rtnImage.s3Images.push({
        File: eachImage.ImageFile,
        fileName: ImageFileName,
      });
      detailImageOrderList.push(eachImage.order);
    }
    let rtnStartDate = new Date(
      EventInfoState.BasicInformation.startDate.value
    );
    rtnStartDate.setUTCHours(17, 0, 0, 0);
    let rtnEndDate = new Date(EventInfoState.BasicInformation.endDate.value);
    rtnEndDate.setUTCHours(17, 0, 0, 0);
    const mutationData = {
      title: EventInfoState.BasicInformation.title.value,
      startDate: rtnStartDate,
      endDate: rtnEndDate,
      url: EventInfoState.BasicInformation.url.value,
      bannerImage: rtnImage.ThumbnailImages,
      isOnList: EventInfoState.BasicInformation.isOnList.value,
      images: rtnImage.MainImages,
      contentsImages: rtnImage.DetailImages,
      videos: rtnVideoList,
      tags: rtnTagList,
    };

    const {
      data: { createEvent },
    } = await CreateEventMutation({
      variables: mutationData,
    });
    if (!createEvent || CreateError) {
      toast.error("Error occured while create data.");
      return;
    }

    if (createEvent) {
      const EventId = createEvent.eventId;
      try {
        for (const eachImage of rtnImage.s3Images) {
          await putImagetoS3({
            file: eachImage.File,
            fileName: "Event/" + EventId + "/" + eachImage.fileName,
          });
        }
      } catch (e) {
        toast.error("Error occured while create data.");
        return;
      }
      toast.success("Sucessfullly create Data!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      return;
    }
  };

  return (
    <EventInfoContext.Provider value={{ EventInfoState, EventInfoDispatch }}>
      <CreateEventPresenter
        onSubmit={onSubmit}
        loading={loading}
        data={data}
        error={error}
      />
    </EventInfoContext.Provider>
  );
};
