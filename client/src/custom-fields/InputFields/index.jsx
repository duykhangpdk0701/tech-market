import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";

const InputField = (props) => {
  const { field, type, label, placeholder, disabled, bsSize } = props;
  // eslint-disable-next-line
  const { name, values, onChange, onBlur } = field;

  console.log(bsSize);

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        id={name}
        {...field}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        bsSize={bsSize}
      />
    </FormGroup>
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
