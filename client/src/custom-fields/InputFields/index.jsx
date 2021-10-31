import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input, Label, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";

const InputField = (props) => {
  const { field, form, type, label, placeholder, disabled, bsSize } = props;
  // eslint-disable-next-line
  const { name, values, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched;
  return (
    <FormGroup floating>
      <Input
        id={name}
        {...field}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        invalid={showError}
      />
      {label && <Label for={name}>{label}</Label>}

      <ErrorMessage name={name} component={FormFeedback} />
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
