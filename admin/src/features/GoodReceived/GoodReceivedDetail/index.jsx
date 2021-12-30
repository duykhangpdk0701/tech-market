import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Paper,
} from "@mui/material";
import style from "./GoodReceivedDetail.module.scss";
import goodReceivedApi from "../../../api/goodReceivedApi";
import { useState } from "react";
import toPrice from "../../../helper/toPrice";

const GoodReceivedDetail = () => {
  const { id } = useParams();
  const [goodReceived, setGoodReceived] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let fetch = await goodReceivedApi.getById(id);
      for (const key in fetch.goodsReceived.goodsReceivedDetail) {
        fetch.goodsReceived.goodsReceivedDetail[key].product =
          fetch.goodsReceived.newProduct[key];
      }
      setGoodReceived(fetch.goodsReceived);
    };
    fetchData();
  }, []);

  return (
    <Box className={style.container}>
      {goodReceived && (
        <>
          <Box className={style.header}>
            <Card className={style.card}>
              <CardHeader
                avatar={<Avatar>{goodReceived.admin.username[0]}</Avatar>}
                title={goodReceived.admin.username}
                subheader={goodReceived.admin.role}
              />
            </Card>

            <Card className={style.card}>
              <CardHeader
                avatar={<Avatar>{goodReceived.provider.name[0]}</Avatar>}
                title={goodReceived.provider.name}
                subheader="Nhà cung cấp"
              />
            </Card>
          </Box>

          <Box className={style.body}>
            <Card className={style.card_detail}>
              {goodReceived.goodsReceivedDetail.map((item) => {
                return (
                  <Paper
                    variant="outlined"
                    mx={{ p: 3 }}
                    className={style.container_small}
                    key={item._id}>
                    <Box className={style.img_contianer}>
                      {item.product &&
                      item.product.images &&
                      item.product.images.length !== 0 ? (
                        <img
                          className={style.img}
                          src={`${process.env.REACT_APP_SERVER_URL}${item.product.images[0]}`}
                        />
                      ) : (
                        <img
                          className={style.img}
                          src="https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/23/637232326768418337_lenovo-ideapad-L340-den-2.png"
                        />
                      )}
                    </Box>
                    <Box className={style.name_container}>
                      <Typography>
                        {item.product && item.product.name}
                      </Typography>
                    </Box>
                    <Box className={style.price_container}>
                      <Typography variant="h6">
                        {toPrice(
                          (item.product && item.product.price) * item.quantity,
                        )}
                      </Typography>
                      <Typography>Số lượng: {item.quantity}</Typography>
                    </Box>
                  </Paper>
                );
              })}
            </Card>
          </Box>
        </>
      )}
    </Box>
  );
};

export default GoodReceivedDetail;
