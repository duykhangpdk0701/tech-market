import { RadioGroup, Typography, Box, Button } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Form, Formik, FastField, Field } from "formik";
import RadioFields from "../../custom-fields/RadioFields";

const AddressOrder = (props) => {
  const { address, initialValue, handleSubmit, validationSchema } = props;

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {(formikProps) => {
          return (
            <Form>
              <RadioFields name="address" options={address} />
              <Box>
                <Button type="submit" variant="contained">
                  Summit
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

AddressOrder.prototype = {
  initialValue: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
  address: PropTypes.object,
};

AddressOrder.defaultProps = {
  address: {},
};

export default AddressOrder;
