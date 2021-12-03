import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import {
  FormControlLabel,
  Radio,
  Box,
  Typography,
  RadioGroup,
} from "@mui/material";

const RadioFields = ({ className, name, options, ...props }) => {
  return (
    <Field component={RadioGroup} name={name}>
      {options.map((option) => {
        const value = JSON.stringify(option);
        return (
          <FormControlLabel
            key={option._id}
            value={value}
            control={<Radio disabled={props.isSubmitting} />}
            disabled={props.isSubmitting}
            label={
              <Box>
                <Typography>{option.street}</Typography>
                <Typography>{option.district}</Typography>
              </Box>
            }
          />
        );
      })}
    </Field>
  );
};

RadioFields.prototype = {
  name: PropTypes.object.isRequired,
  className: PropTypes.object.isRequired,

  options: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};

RadioFields.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disable: false,
};

export default RadioFields;
