import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import SectionTitle from "../../Components/SectionTitle";
import { EventInfoContext } from "./EventDetailContainer";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  font-size: 15px;
  tr {
    height: 40px;
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-right: 0.5px solid black;
    width: 200px;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
  td {
    text-align: start;
  }
  .itemsCell {
    width: 380px;
  }
`;

const Input = styled.input`
  width: ${(props) => {
    if (props.InputWidth) {
      return props.InputWidth.toString() + "px";
    } else if (props.InputWidthPercent) {
      return props.InputWidthPercent.toString() + "%";
    } else {
      return null;
    }
  }};
  height: 35px;
  font-size: 15px;
`;

const AddressCellWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const DateWrapper = styled.div`
  align-items: center;
  justify-content: space-around;
  display: flex;
  width: 60%;
`;

export default () => {
  const { EventInfoState, EventInfoDispatch } = useContext(EventInfoContext);

  const onChange = (e) => {
    if (e.target.name === "EventShowCheckBox") {
      const originalValue = EventInfoState.BasicInformation.isOnList.value;
      EventInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...EventInfoState.BasicInformation,
            isOnList: {
              value: !originalValue,
              isChange: true,
            },
          },
        },
      });
    } else if (e.target.name === "TitleInput") {
      EventInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...EventInfoState.BasicInformation,
            title: {
              value: e.target.value,
              isChange: true,
            },
          },
        },
      });
    } else if (e.target.name === "EventLinkInput") {
      EventInfoDispatch({
        type: "UPDATE_BASICINFO",
        data: {
          BasicInformation: {
            ...EventInfoState.BasicInformation,
            url: {
              value: e.target.value,
              isChange: true,
            },
          },
        },
      });
    }
  };

  const CheckLink = () => {
    let InputLink = EventInfoState.BasicInformation.url.value;
    InputLink =
      InputLink.includes("http://") || InputLink.includes("https://")
        ? InputLink
        : "http://" + InputLink;
    try {
      window.open(InputLink, "_blank");
    } catch (e) {
      toast.error("You are checking invalid URL");
    }
    EventInfoDispatch({
      type: "UPDATE_BASICINFO",
      data: {
        BasicInformation: {
          ...EventInfoState.BasicInformation,
          url: {
            value: InputLink,
            isChange: true,
          },
        },
      },
    });
  };

  const ChangeStartDate = (date) => {
    EventInfoDispatch({
      type: "UPDATE_BASICINFO",
      data: {
        BasicInformation: {
          ...EventInfoState.BasicInformation,
          startDate: {
            value: date,
            isChange: true,
          },
        },
      },
    });
  };
  const ChangeEndDate = (date) => {
    EventInfoDispatch({
      type: "UPDATE_BASICINFO",
      data: {
        BasicInformation: {
          ...EventInfoState.BasicInformation,
          endDate: {
            value: date,
            isChange: true,
          },
        },
      },
    });
  };

  return (
    <>
      <SectionTitle text="Basic Information" />
      <Table>
        <tbody>
          <tr>
            <th>Event ID</th>
            <td className="itemsCell">
              {EventInfoState.BasicInformation.eventId}
            </td>
            <th>Event Show in List</th>
            <td className="itemsCell">
              <input
                width="20px"
                type="checkbox"
                name="EventShowCheckBox"
                checked={EventInfoState.BasicInformation.isOnList.value}
                onChange={(e) => onChange(e)}
              />
            </td>
          </tr>
          <tr>
            <th>Event Title</th>
            <td colSpan="3">
              <Input
                InputWidthPercent={60}
                type="text"
                name="TitleInput"
                value={EventInfoState.BasicInformation.title.value}
                onChange={(e) => onChange(e)}
              />
            </td>
          </tr>
          <tr>
            <th>Event Period</th>
            <td colSpan="3">
              <DateWrapper>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="startDate"
                    label="Start Date"
                    value={EventInfoState.BasicInformation.startDate.value}
                    onChange={(date) => ChangeStartDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="startDate"
                    label="End Date"
                    value={EventInfoState.BasicInformation.endDate.value}
                    onChange={(date) => ChangeEndDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </DateWrapper>
            </td>
          </tr>
          <tr>
            <th>Event Link</th>
            <td colSpan="3">
              <AddressCellWrapper>
                <Input
                  InputWidth={800}
                  type="text"
                  name="EventLinkInput"
                  value={EventInfoState.BasicInformation.url.value}
                  onChange={(e) => onChange(e)}
                />
                <Button
                  text={"Check"}
                  isButtonType={true}
                  ClickEvent={CheckLink}
                />
              </AddressCellWrapper>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
