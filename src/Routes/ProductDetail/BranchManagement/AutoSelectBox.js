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
      value={value}
      onChange={onChangeFunc}
      style={{ width: "100%" }}
      options={[...[value], ...data]}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.shopName}
      filterSelectedOptions
      renderOption={(option) => (
        <React.Fragment>
          <span>{option.id}</span>
          {option.shopName} ( {option.shopLink} )
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Shop"
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
