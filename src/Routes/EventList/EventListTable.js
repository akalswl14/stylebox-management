import React, { useContext } from "react";
import styled from "styled-components";
import { EventListContext } from "./EventListContainer";
import SortButton from "../../Components/SortButton";
import PageChangeButton from "../../Components/PageChangeButton";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import queryString from "query-string";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 6px 2px;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    font-size: 13px;
    vertical-align: middle;
  }
  th:first-child,
  th:last-child {
    width: 5%;
  }
  td {
    font-size: 13px;
    vertical-align: middle;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const SortText = styled.span`
  line-height: 30px;
`;

const EventListTable = ({ data }) => {
  const { eventState, eventDispatch } = useContext(EventListContext);

  const queryInput = queryString.parse(window.location.search);

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
    if (!eventState.selectedEventIdList.includes(eventId)) {
      eventState.selectedEventIdList.push(eventId);
    }
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
    }
  };

  const ChangeStartDate = (e, date, eventId) => {
    if (!eventState.selectedEventIdList.includes(eventId)) {
      eventState.selectedEventIdList.push(eventId);
    }
    eventDispatch({
      type: "UPDATE_STARTDATE",
      data: {
        eventId,
        date,
      },
    });
  };

  const ChangeEndDate = (e, date, eventId) => {
    if (!eventState.selectedEventIdList.includes(eventId)) {
      eventState.selectedEventIdList.push(eventId);
    }
    eventDispatch({
      type: "UPDATE_ENDDATE",
      data: {
        eventId,
        date,
      },
    });
  };

  const SortClick = (e, name) => {
    e.preventDefault();

    const changedQuery = {
      page: 1,
      id: queryInput.id ?? undefined,
      eventtitle: queryInput.eventtitle ?? undefined,
    };

    if (name === "eventId") {
      const sortid = queryInput.sortid;
      if (sortid) {
        if (Number(sortid) === 0) changedQuery.sortid = 1;
      } else {
        changedQuery.sortid = 0;
      }
    } else if (name === "eventTitle") {
      const sorttitle = queryInput.sorttitle;
      if (sorttitle) {
        if (Number(sorttitle) === 0) changedQuery.sorttitle = 1;
      } else {
        changedQuery.sorttitle = 0;
      }
    } else if (name === "startDate") {
      const sortstart = queryInput.sortstart;
      if (sortstart) {
        if (Number(sortstart) === 0) changedQuery.sortstart = 1;
      } else {
        changedQuery.sortstart = 0;
      }
    } else if (name === "endDate") {
      const sortend = queryInput.sortend;
      if (sortend) {
        if (Number(sortend) === 0) changedQuery.sortend = 1;
      } else {
        changedQuery.sortend = 0;
      }
    }

    window.location.href = `/eventlist?${queryString.stringify(changedQuery)}`;
  };
  return (
    <Table>
      <thead>
        <tr>
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
                !queryInput.sortid ? 0 : Number(queryInput.sortid) === 0 ? 1 : 2
              }
              func={(e) => SortClick(e, "eventId")}
            />
          </th>
          <th>
            <SortText>Event Title</SortText>
            <SortButton
              type={
                !queryInput.sorttitle
                  ? 0
                  : Number(queryInput.sorttitle) === 0
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
                !queryInput.sortstart
                  ? 0
                  : Number(queryInput.sortstart) === 0
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
                !queryInput.sortend
                  ? 0
                  : Number(queryInput.sortend) === 0
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
        </tr>
      </thead>
      <tbody>
        {eventState.eventInfo.map((event) => (
          <tr key={event.eventId}>
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="startDate"
                  label="Start Date"
                  value={event.eventStart}
                  onChange={(e, date) =>
                    ChangeStartDate(e, date, event.eventId)
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </td>
            <td>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="endDate"
                  label="End Date"
                  value={event.eventEnd}
                  onChange={(e, date) => ChangeEndDate(e, date, event.eventId)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
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
              <PageChangeButton
                text="edit"
                href={"/eventdetail/" + event.eventId}
                width={50}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EventListTable;
