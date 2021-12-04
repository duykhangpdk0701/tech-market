import { Box, Step, Stepper, StepLabel, Button } from "@mui/material";
import React, { useState } from "react";
import style from "./Orders.module.scss";
import AddressOrder from "./AddressOrder";
import CompleteOrder from "./CompleteOrder";
import MethodPayment from "./MethodPayment";
import ConfirmOrder from "./ConfirmOrder";

const steps = [
  "Chọn địa chỉ giao hàng",
  "Chọn phương thức thanh toán",
  "Xác nhận đơn hàng",
];

const Orders = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepScreen = (activeStep) => {
    const property = {
      activeStep,
      handleBack,
      setActiveStep,
      steps,
      handleNext,
    };

    switch (activeStep) {
      case 0:
        return <AddressOrder {...property} />;
      case 1:
        return <MethodPayment {...property} />;
      case 2:
        return <ConfirmOrder {...property} />;

      default:
        return <AddressOrder {...property} />;
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 1,
        bgcolor: "background.paper",
        p: 5,
      }}
      className={style.section}>
      <Box>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {activeStep === steps.length ? <CompleteOrder /> : stepScreen(activeStep)}
    </Box>
  );
};

export default Orders;
