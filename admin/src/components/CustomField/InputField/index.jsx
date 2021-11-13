import { TextField } from "@mui/material";
import React from "react";
import prototype from "prop-types";

const InputField = (props) => {
  const { field, form, type, label, placeholder, disabled } = props;

  const { name, values, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <TextField
      id={name}
      value={values}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      label={label}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      autoComplete={name}
      error={showError}
      helperText={errors[name]}
      margin="normal"
    />
  );
};

InputField.prototype = {
  field: prototype.object.isRequired,
  form: prototype.object.isRequired,

  type: prototype.string,
  label: prototype.string,
  placeholder: prototype.string,
  disable: prototype.bool,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disable: false,
};

export default InputField;
