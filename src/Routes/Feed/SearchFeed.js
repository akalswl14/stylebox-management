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
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  tr {
    border: 1px solid #858585;
  }
  td {
    vertical-align: middle;
  }
  td:first-child {
    border: 1px solid #858585;
    padding: 8px;
    background-color: #f2f2f2;
    width: 25%;
    vertical-align: middle;
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
      </Table>
    </>
  );
};

export default SearchFeed;
