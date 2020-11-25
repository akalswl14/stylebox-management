import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
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
  td {
    padding: 5px;
    vertical-align: middle;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:first-child {
    width: 25%;
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchFeed = ({ feedState, ChangeSearchDate }) => {
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Search Feed"} />
      </TitleBox>
      <Table>
        <tbody>
          <tr>
            <td>Open Posts from</td>
            <td>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="searchPeriod"
                  label="search Period"
                  value={feedState.SearchPeriod}
                  onChange={(date) => ChangeSearchDate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default SearchFeed;
