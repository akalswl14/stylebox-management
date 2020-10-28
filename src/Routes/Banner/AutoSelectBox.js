/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const AutoSelectBox = ({
  data,
  defaultValue,
  onTitleChangeFunc,
  onTitleSelectFunc,
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      style={{ width: "100%" }}
      options={data}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.title}
      defaultValue={defaultValue}
      renderOption={(option) => (
        <React.Fragment>
          <span>{option.id}</span>
          {option.title}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Event"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          onChange={onTitleChangeFunc}
        />
      )}
      onChange={onTitleSelectFunc}
    />
  );
};

const banners = [
  {
    bannerImage: "1.png",
    id: 2,
    title: "EventTitle2",
  },
  {
    bannerImage: "3.jpg",
    id: 4,
    title: "EventTitle",
  },
  {
    bannerImage: "2.jpg",
    id: 3,
    title: "EventTitle",
  },
];

export default AutoSelectBox;
