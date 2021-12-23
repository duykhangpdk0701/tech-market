import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getByIdGoodReceivedAsync } from "../../../app/goodReceivedDetailSlice";
import { Box, Card, CardHeader, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import style from "./GoodReceivedDetail.module.scss";

const GoodReceivedDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const goodReceived =
    useSelector((state) => state.goodsReceivedDetail.current) || {};

  useEffect(() => {
    const fetchData = async () => {
      const action = await getByIdGoodReceivedAsync({ id });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return (
    <Box className={style.container}>
      <Box className={style.header}>
        <Card className={style.card}>
          <CardHeader
            avatar={
              <Avatar>
                {goodReceived.admin && goodReceived.admin.username[0]}
              </Avatar>
            }
            title={goodReceived.admin && goodReceived.admin.username}
            subheader={goodReceived.admin && goodReceived.admin.role}
          />
        </Card>

        <Card className={style.card}>
          <CardHeader
            avatar={
              <Avatar>
                {goodReceived.provider && goodReceived.provider.name[0]}
              </Avatar>
            }
            title={goodReceived.provider && goodReceived.provider.name}
            subheader="Nhà cung cấp"
          />
        </Card>
      </Box>

      <Box className={style.body}>
        <Card>
          {goodReceived.goodsReceivedDetail &&
            goodReceived.goodsReceivedDetail.map((item) => {
              return (
                <div>
                  <Typography>{item._id}</Typography>
                </div>
              );
            })}
        </Card>
      </Box>
    </Box>
  );
};

export default GoodReceivedDetail;
