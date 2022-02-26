import React from "react";
import PropTypes from "prop-types";
import style from "./InputFields.module.scss";
import { TextField } from "@mui/material";

const InputField = (props) => {
  const { field, form, type, label, placeholder, disabled, size } = props;
  // eslint-disable-next-line
  const { name, values, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <div className={style.input_wrapper}>
      <TextField
        id={name}
        value={values}
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
      />
    </div>
  );
};

InputField.prototype = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disable: false,
};

export default InputField;
