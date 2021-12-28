import {
  Box,
  Typography,
  Button,
  Alert,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./AddressOrder.module.scss";
import { useDispatch } from "react-redux";
import { fetchAdressAsync } from "../../../app/addressSlice";
import { addAddress } from "../../../app/ordersSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import RadioFields from "../../../custom-fields/RadioFields";
import AddIcon from "@mui/icons-material/Add";
import AddAddress from "./AddAddress";

const OrderAddress = (props) => {
  const { handleBack, activeStep, setActiveStep, steps } = props;
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const addressState = useSelector((state) => state.address.current) || [];

  const [open, setOpen] = useState(false);

  const initialValues = {
    address: "",
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Vui lòng tạo hoặc chọn một địa chỉ"),
  });

  const handleSubmit = async (values) => {
    dispatch(addAddress(JSON.parse(values.address)));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const action = await fetchAdressAsync({ userId });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchAddress();
  }, [dispatch, userId]);

  const handleOpenDialog = () => {
    setOpen(true);
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
              <Box
                sx={{
                  display: "flex",
                }}
                className={style.content}>
                {/* left content */}
                <Box className={style.inner_content}>
                  <Typography variant="h5">Chọn địa chỉ giao hàng</Typography>
                  <List>
                    <ListItem button onClick={handleOpenDialog}>
                      <ListItemAvatar>
                        <Avatar>
                          <AddIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>Thêm địa chỉ</ListItemText>
                    </ListItem>
                    <RadioFields name="address" options={addressState} />
                    {formikProps.errors.address &&
                    formikProps.touched.address ? (
                      <Alert severity="error">
                        {formikProps.errors.address}
                      </Alert>
                    ) : null}
                  </List>
                </Box>
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

                <Button type="submit" variant="contained">
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
      <AddAddress open={open} setOpen={setOpen} />
    </>
  );
};

export default OrderAddress;
