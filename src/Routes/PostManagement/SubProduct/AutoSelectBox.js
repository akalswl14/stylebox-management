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

const AutoSelectBox = ({ data, value, onChangeFunc }) => {
  const classes = useStyles();
  return (
    <Autocomplete
      style={{ width: "100%" }}
      options={[...[value], ...data]}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) =>
        option.productName ? option.productName : ""
      }
      filterSelectedOptions
      value={value}
      onChange={onChangeFunc}
      renderOption={(option) => (
        <React.Fragment>
          <span>{option.productId}</span>
          {option.productName}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Product"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default AutoSelectBox;
