import React, { useContext } from "react";
import styled from "styled-components";
import { EventListContext } from "./EventListContainer";
import Button from "../../Components/Button";
import SortButton from "../../Components/SortButton";
import { Link } from "react-router-dom";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  th:first-child {
    width: 13%;
    padding: 12px;
    border-right: 1px solid #858585;
    background-color: #f2f2f2;
  }
  th {
    padding: 12px;
    border: 1px solid #858585;
    background-color: #f2f2f2;
  }
  tr {
    border: 1px solid #858585;
  }
  td {
    padding: 3px;
  }
  td:first-child {
    border: 1px solid #858585;
  }
`;

const SortText = styled.span`
  line-height: 30px;
`;

const EventListTable = ({ data }) => {
  const { eventState, eventDispatch } = useContext(EventListContext);

  const CheckAllCheckBox = (e) => {
    let saveList = eventState.selectedEventIdList.slice();
    if (e.target.checked) {
      for (const eachEvent of data.getEventManageList.events) {
        if (!saveList.includes(eachEvent.eventId)) {
          saveList.push(eachEvent.eventId);
        }
      }
    } else {
      for (const eachEvent of data.getEventManageList.events) {
        const idx = saveList.indexOf(eachEvent.eventId);
        if (idx > -1) {
          saveList.splice(idx, 1);
        }
      }
    }
    eventDispatch({
      type: "UPDATE_BATCH_SELECTEVENT",
      data: { saveList },
    });
  };

  const onCheckBoxChange = (eventId) => {
    eventDispatch({
      type: "UPDATE_SELECTEVENT",
      data: { eventId },
    });
  };

  const AllCheckBoxStatus = () => {
    for (const eachEvent of data.getEventManageList.events) {
      if (!eventState.selectedEventIdList.includes(eachEvent.eventId)) {
        return false;
      }
    }
    return true;
  };

  const onChange = (e, eventId) => {
    const { name } = e.target;
    if (eventState.selectedEventIdList.includes(eventId)) {
      if (name === "isOnList") {
        const { checked } = e.target;
        eventDispatch({
          type: "UPDATE_EVENT",
          data: {
            name,
            checked,
            eventId,
          },
        });
      } else {
        const { value } = e.target;
        eventDispatch({
          type: "UPDATE_EVENT",
          data: {
            name,
            value,
            eventId,
          },
        });
      }
    }
  };

  const SortClick = (e, name) => {
    e.preventDefault();
    let sortOption = {
      sortEventId: false,
      sortEventTitle: false,
      sortStartDate: false,
      sortEndDate: false,
      eventIdAsc: true,
      eventTitleAsc: true,
      startDateAsc: true,
      endDateAsc: true,
    };
    if (name === "eventId") {
      if (eventState.sortOption.sortEventId) {
        if (eventState.sortOption.eventIdAsc) {
          sortOption.sortEventId = true;
          sortOption.eventIdAsc = false;
        } else {
          sortOption.sortEventId = false;
          sortOption.eventIdAsc = true;
        }
      } else {
        sortOption.sortEventId = true;
        sortOption.eventIdAsc = true;
      }
    } else if (name === "eventTitle") {
      if (eventState.sortOption.sortEventTitle) {
        if (eventState.sortOption.eventTitleAsc) {
          sortOption.sortEventTitle = true;
          sortOption.eventTitleAsc = false;
        } else {
          sortOption.sortEventTitle = false;
          sortOption.eventTitleAsc = true;
        }
      } else {
        sortOption.sortEventTitle = true;
        sortOption.eventTitleAsc = true;
      }
    } else if (name === "startDate") {
      if (eventState.sortOption.sortStartDate) {
        if (eventState.sortOption.startDateAsc) {
          sortOption.sortStartDate = true;
          sortOption.startDateAsc = false;
        } else {
          sortOption.sortStartDate = false;
          sortOption.startDateAsc = true;
        }
      } else {
        sortOption.sortStartDate = true;
        sortOption.startDateAsc = true;
      }
    } else if (name === "endDate") {
      if (eventState.sortOption.sortEndDate) {
        if (eventState.sortOption.endDateAsc) {
          sortOption.sortEndDate = true;
          sortOption.endDateAsc = false;
        } else {
          sortOption.sortEndDate = false;
          sortOption.endDateAsc = true;
        }
      } else {
        sortOption.sortEndDate = true;
        sortOption.endDateAsc = true;
      }
    }
    eventDispatch({
      type: "UPDATE_SORTOPTION",
      data: {
        sortOption,
      },
    });
  };
  return (
    <Table>
      <th>
        <input
          type="checkbox"
          onChange={CheckAllCheckBox}
          checked={AllCheckBoxStatus()}
        />
      </th>
      <th>
        <SortText>Event Id</SortText>
        <SortButton
          type={
            !eventState.sortOption.sortEventId
              ? 0
              : eventState.sortOption.eventIdAsc
              ? 1
              : 2
          }
          func={(e) => SortClick(e, "eventId")}
        />
      </th>
      <th>
        <SortText>Event Title</SortText>
        <SortButton
          type={
            !eventState.sortOption.sortEventTitle
              ? 0
              : eventState.sortOption.eventTitleAsc
              ? 1
              : 2
          }
          func={(e) => SortClick(e, "eventTitle")}
        />
      </th>
      <th>
        <SortText>Event Start</SortText>
        <SortButton
          type={
            !eventState.sortOption.sortStartDate
              ? 0
              : eventState.sortOption.startDateAsc
              ? 1
              : 2
          }
          func={(e) => SortClick(e, "startDate")}
        />
      </th>
      <th>
        <SortText>Event End</SortText>
        <SortButton
          type={
            !eventState.sortOption.sortEndDate
              ? 0
              : eventState.sortOption.endDateAsc
              ? 1
              : 2
          }
          func={(e) => SortClick(e, "endDate")}
        />
      </th>
      <th>Show in List</th>
      <th>Link</th>
      <th>Likes</th>
      <th>Views</th>
      <th>Edit</th>
      {eventState.eventInfo.map((event) => (
        <tr>
          <td>
            <input
              type="checkbox"
              name="isOnList"
              onChange={() => onCheckBoxChange(event.eventId)}
              checked={
                eventState.selectedEventIdList.includes(event.eventId)
                  ? true
                  : false
              }
            />
          </td>
          <td>{event.eventId}</td>
          <td>{event.eventTitle}</td>
          <td>
            <input
              name="eventStart"
              type="date"
              value={event.eventStart.split("T")[0]}
              onChange={(e) => onChange(e, event.eventId)}
            />
          </td>
          <td>
            <input
              name="eventEnd"
              type="date"
              value={event.eventEnd.split("T")[0]}
              onChange={(e) => onChange(e, event.eventId)}
            />
          </td>
          <td>
            <input
              type="checkbox"
              name="isOnList"
              onChange={(e) => onChange(e, event.eventId)}
              checked={event.isOnList}
            />
          </td>
          <td>{event.link}</td>
          <td>{event.likesNum}</td>
          <td>{event.viewsNum}</td>
          <td>
            <Link to="/">
              <Button text="Edit"></Button>
            </Link>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default EventListTable;
