import { LinearProgress } from "@mui/material";
import { GridOverlay } from "@mui/x-data-grid";
import React from "react";
import style from "./LoadingOverLay.module.scss";

const LoadingOverLay = () => {
  return (
    <GridOverlay>
      <div className={style.wrapper}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
};

export default LoadingOverLay;
