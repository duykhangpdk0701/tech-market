import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import productsApi from "../../../api/productApi";
import toPrice from "../../../helper/toPrice";
import style from "./Item.module.scss";

const ItemAddGoodReceived = ({ id, quantity }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await productsApi.fetchProduct(id);
      setProduct(fetch.product);
    };
    fetchData();
  }, []);

  return (
    <Paper mx={{ p: 3 }} className={style.container_small}>
      {product && (
        <>
          <Box className={style.img_contianer}>
            {product && product.images && product.images.length !== 0 ? (
              <img
                className={style.img}
                src={`${process.env.REACT_APP_SERVER_URL}${product.images[0]}`}
              />
            ) : (
              <img
                className={style.img}
                src="https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/23/637232326768418337_lenovo-ideapad-L340-den-2.png"
              />
            )}
          </Box>
          <Box className={style.name_container}>
            <Typography variant="h6">{product.name}</Typography>
          </Box>
          <Box className={style.price_container}>
            <Typography variant="h6">
              {toPrice(product.price * quantity)}
            </Typography>
            <Typography>Số lượng: {quantity}</Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ItemAddGoodReceived;
