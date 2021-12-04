import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ConfirmOrder = (props) => {
  const { handleBack, activeStep, setActiveStep, steps, handleNext } = props;
  return (
    <>
      <Box>
        <Typography>confirm </Typography>
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

        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </>
  );
};

export default ConfirmOrder;
