import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import {
  FormControlLabel,
  Radio,
  Box,
  Typography,
  RadioGroup,
  ListItem,
} from "@mui/material";
import style from "./RadioFields.module.scss";

const RadioFields = ({ className, name, options, ...props }) => {
  return (
    <RadioGroup className={className}>
      {options.map((option) => {
        return (
          <ListItem key={option._id} button>
            <FormControlLabel
              className={style.form_control_label}
              control={
                <Field as={Radio} name={name} value={JSON.stringify(option)} />
              }
              label={
                <Box>
                  <Typography>{option.street}</Typography>
                  <Typography>{option.district}</Typography>
                </Box>
              }
            />
          </ListItem>
        );
      })}
    </RadioGroup>
  );
};

RadioFields.prototype = {
  name: PropTypes.object.isRequired,
};

RadioFields.defaultProps = {};

export default RadioFields;
