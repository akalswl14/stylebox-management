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
    width: 25%;
  }
  td:nth-child(odd) {
    border: 1px solid #858585;
    padding: 8px;
    background-color: #f2f2f2;
    vertical-align: middle;
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
