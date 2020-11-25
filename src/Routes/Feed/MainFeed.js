import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import PageChangeButton from "../../Components/PageChangeButton";
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
    width: 25%;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:nth-child(odd) {
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

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const MainFeed = ({ todayStylePeriod, ChangeStyleDate }) => {
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Main(Home) Feed"} />
        <ButtonBox>
          <PageChangeButton text="Back To Main" href="/" />
          <Button type="submit" text="Confirm"></Button>
        </ButtonBox>
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
                  id="todaysStylesPeriod"
                  label="todays Styles Period"
                  value={todayStylePeriod.TodaysStylesPeriod}
                  onChange={(date) => ChangeStyleDate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </td>
            <td>Open Posts</td>
            <td>{todayStylePeriod.postNum} posts</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default MainFeed;
