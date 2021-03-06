import React, { useReducer } from "react";
import EventListPresenter from "./EventListPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  GET_EVENTLIST,
  DELETE_EVENTS,
  UPDATE_EVENTS,
} from "./EventListQueries";
import { toast } from "react-toastify";
import queryString from "query-string";

export const EventListContext = React.createContext(null);

const initialState = {
  selectedEventIdList: [],
  pageNum: 1,
  searchOption: {
    searchSelectBox: "eventId",
    searchKeyWord: "",
  },
  eventInfo: [],
  confirmButton: "delete",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        eventInfo: action.data.eventInfo,
      };
    case "UPDATE_EVENT":
      if (action.data.name === "isOnList") {
        let eventInfo = state.eventInfo.map((eachEvent) =>
          eachEvent.eventId === action.data.eventId
            ? { ...eachEvent, isOnList: action.data.checked }
            : eachEvent
        );
        return {
          ...state,
          eventInfo,
        };
      }
    case "UPDATE_STARTDATE":
      let eventStartInfos = state.eventInfo.map((eachEvent) =>
        eachEvent.eventId === action.data.eventId
          ? { ...eachEvent, eventStart: action.data.date }
          : eachEvent
      );
      return {
        ...state,
        eventInfo: eventStartInfos,
      };
    case "UPDATE_ENDDATE":
      let eventEndInfos = state.eventInfo.map((eachEvent) =>
        eachEvent.eventId === action.data.eventId
          ? { ...eachEvent, eventEnd: action.data.date }
          : eachEvent
      );
      return {
        ...state,
        eventInfo: eventEndInfos,
      };
    case "UPDATE_SEARCH":
      const { name, value } = action.data;
      if (name === "searchSelectBox") {
        return {
          ...state,
          searchOption: {
            [name]: value,
            searchKeyWord: "",
          },
        };
      }
      return {
        ...state,
        searchOption: {
          ...state.searchOption,
          [name]: value,
        },
      };
    case "UPDATE_SELECTEVENT":
      if (state.selectedEventIdList.includes(action.data.eventId)) {
        let selectedEventIdList = state.selectedEventIdList.filter(
          (eachEventId) => eachEventId !== action.data.eventId
        );
        return { ...state, selectedEventIdList };
      } else {
        let selectedEventIdList = state.selectedEventIdList;
        selectedEventIdList.push(action.data.eventId);
        return { ...state, selectedEventIdList };
      }
    case "UPDATE_BATCH_SELECTEVENT":
      return {
        ...state,
        selectedEventIdList: action.data.saveList,
      };
    case "CHANGE_BUTTON":
      return {
        ...state,
        confirmButton: action.data.buttonKind,
      };
    default:
      return state;
  }
}

export default ({ location }) => {
  const [eventState, eventDispatch] = useReducer(reducer, initialState);
  const [deleteEvents, { error: mutationError }] = useMutation(DELETE_EVENTS);
  const [updateEvents, { error: updateError }] = useMutation(UPDATE_EVENTS);
  const queryInput = queryString.parse(location.search);

  const { loading, error, data } = useQuery(GET_EVENTLIST, {
    variables: {
      pageNum: Number(queryInput.page),
      eventId: queryInput.id ? Number(queryInput.id) : null,
      eventTitle: queryInput.eventtitle ?? null,
      eventIdAsc:
        queryInput.sortid === undefined
          ? null
          : Number(queryInput.sortid) > 0
          ? false
          : true,
      eventTitleAsc:
        queryInput.sorttitle === undefined
          ? null
          : Number(queryInput.sorttitle) > 0
          ? false
          : true,
      eventStartAsc:
        queryInput.sortstart === undefined
          ? null
          : Number(queryInput.sortstart) > 0
          ? false
          : true,
      eventEndAsc:
        queryInput.sortend === undefined
          ? null
          : Number(queryInput.sortend) > 0
          ? false
          : true,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (eventState.selectedEventIdList.length === 0) {
      toast.error("Please select at least one.");
      return;
    }

    if (eventState.confirmButton === "delete") {
      const {
        data: { deleteEventList },
      } = await deleteEvents({
        variables: {
          eventIds: eventState.selectedEventIdList,
        },
      });

      if (!deleteEventList || mutationError) {
        toast.error("Error occured while delete data.");
        return;
      }
      if (deleteEventList) {
        toast.success("Sucessfully Delete Data!");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        return;
      }
    }

    if (eventState.confirmButton === "edit") {
      let events = [];
      for (const id of eventState.selectedEventIdList) {
        for (const eachData of eventState.eventInfo) {
          if (id === eachData.eventId) {
            let rtnStartDate = new Date(eachData.eventStart);
            let rtnEndDate = new Date(eachData.eventEnd);
            rtnStartDate.setUTCHours(17, 0, 0, 0);
            rtnEndDate.setUTCHours(17, 0, 0, 0);

            events.push({
              eventId: eachData.eventId,
              eventStart: rtnStartDate,
              eventEnd: rtnEndDate,
              isOnList: eachData.isOnList,
            });
          }
        }
      }
      if (events.length === 0) {
        toast.error("Please edit at least one.");
        return;
      }
      const {
        data: { updateEventList },
      } = await updateEvents({
        variables: { events },
      });
      if (!updateEventList || updateError) {
        toast.error("Error occured while edit data.");
        return;
      }
      if (updateEventList) {
        toast.success("Sucessfully Edit Data!");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        return;
      }
    }
  };

  return (
    <EventListContext.Provider value={{ eventState, eventDispatch }}>
      <EventListPresenter
        loading={loading}
        data={data}
        error={error}
        onSubmit={onSubmit}
      />
    </EventListContext.Provider>
  );
};
