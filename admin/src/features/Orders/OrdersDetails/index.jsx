import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ordersApi from "../../../api/ordersApi";
import style from "./OrdersDetails.module.scss";
import toPrice from "../../../helper/toPrice";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let fetch = await ordersApi.getOrderById(id);
      for (const key in fetch.order.orderDetail) {
        fetch.order.orderDetail[key].product = fetch.order.newProduct[key];
      }
      setOrder(fetch.order);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={style.order_details}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
        {[
          <Link key="1" to="/admin">
            Home
          </Link>,
          <Link key="2" to="/admin/order">
            Order
          </Link>,
          <Typography key="3">{id}</Typography>,
        ]}
      </Breadcrumbs>
      <div className={style.container}>
        <div>
          {order &&
            order.orderDetail.map((item) => (
              <Paper
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
          <Paper className={style.sum_container}>
            <Box>
              <Typography variant="h4">Tổng:</Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary">
                {order && toPrice(order.totalPrice)}
              </Typography>
            </Box>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
