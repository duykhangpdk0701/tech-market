import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input, Label, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";
import style from "./InputFields.module.scss";

const InputField = (props) => {
  const { field, form, type, label, placeholder, disabled } = props;
  // eslint-disable-next-line
  const { name, values, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <div className={style.input_wrapper}>
      <FormGroup floating className="position-relative">
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
