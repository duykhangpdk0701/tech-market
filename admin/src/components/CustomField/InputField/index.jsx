import { TextField } from "@mui/material";
import React from "react";
import prototype from "prop-types";

const InputField = (props) => {
  const { field, form, type, label, placeholder, disabled, size, multiline } =
    props;

  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <TextField
      id={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      fullWidth
      label={label}
      error={showError}
      helperText={showError && errors[name]}
      margin="normal"
      size={size}
      multiline={multiline}
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
  multiline: false,
  size: "normal",
};

export default InputField;
