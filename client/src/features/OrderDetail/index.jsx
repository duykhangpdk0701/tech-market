import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderApi from "../../api/orderApi";
import toPrice from "../../helper/toPrice";
import style from "./OrderDetail.module.scss";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let fetch = await orderApi.getOrderById(id);
      for (const key in fetch.order.orderDetail) {
        fetch.order.orderDetail[key].product = fetch.order.newProduct[key];
      }
      setOrder(fetch.order);
    };

    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <Paper>
        {order &&
          order.orderDetail.map((item) => (
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
                <Typography>{item.product && item.product.name}</Typography>
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
          ))}
      </Paper>
    </div>
  );
};

export default OrderDetail;
