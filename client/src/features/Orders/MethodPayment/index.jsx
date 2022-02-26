import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addPaymentMethod } from "../../../app/ordersSlice";

const MethodPayment = (props) => {
  const { handleBack, activeStep, setActiveStep, steps } = props;
  const dispatch = useDispatch();
  const initialValues = {
    payment: "",
  };

  const validationSchema = Yup.object().shape({
    payment: Yup.string().required("Vui lòng chọn phương thức thanh toán"),
  });

  const handleSubmit = (values) => {
    dispatch(addPaymentMethod(values.payment));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {(formikProps) => {
          return (
            <Form>
              <Box>
                <Typography variant="h5">
                  Chọn Phương thức thanh toán
                </Typography>

                <List>
                  <RadioGroup>
                    <ListItem>
                      <FormControlLabel
                        control={
                          <Field as={Radio} name="payment" value={"COD"} />
                        }
                        label={<Typography>Ship COD</Typography>}
                      />
                    </ListItem>

                    <ListItem>
                      <FormControlLabel
                        control={
                          <Field as={Radio} name="payment" value={"MOMO"} />
                        }
                        label={<Typography>Thanh toán bằng Momo</Typography>}
                      />
                    </ListItem>

                    <ListItem>
                      <FormControlLabel
                        control={
                          <Field
                            as={Radio}
                            name="payment"
                            value={"Chuyển Khoản"}
                          />
                        }
                        label={<Typography>Chuyển Khoản</Typography>}
                      />
                    </ListItem>
                  </RadioGroup>
                </List>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button variant="contained" type="submit">
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default MethodPayment;
