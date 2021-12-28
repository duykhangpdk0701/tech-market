import React from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import prototype from "prop-types";
import styles from "./AutoField.module.scss";

const AutoField = (props) => {
  const { field, form, label, options, placeholder } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleChange = (e) => {
    const changeEvent = {
      target: {
        name: name,
        value: e.target.value,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <>
      <InputLabel id={name} className={styles.label}>{label}</InputLabel>
      <Select
        labelId={name}
        id={name}
        {...field}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        label={label}
        className={styles.select}>
        {options.map((element) => (
          <MenuItem key={element._id} value={element._id}>
            {element.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

AutoField.prototype = {
  field: prototype.object.isRequired,
  form: prototype.object.isRequired,

  type: prototype.string,
  label: prototype.string,
  placeholder: prototype.string,
  disable: prototype.bool,
  options: prototype.array,
};

AutoField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disable: false,
  options: [],
};

export default AutoField;
