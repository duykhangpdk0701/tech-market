import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../../app/productSlice";
import { Box, Typography, Grid, Paper, Tooltip, Button } from "@mui/material";
import style from "./Product.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ImageGallery from "react-image-gallery";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import { DeveloperBoard, Memory, Storage } from "@mui/icons-material";
import { addToCart } from "../../app/cartsSlice";
import { setSnackbar } from "../../app/snackbarSlice";

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.current) || {};
  const { id } = useParams();

  const image = product.images
    ? product.images.map((item) => ({
        original: `${process.env.REACT_APP_SERVER_URL}${item}`,
        thumbnail: `${process.env.REACT_APP_SERVER_URL}${item}`,
        originalHeight: "570px",
        thumbnailHeight: "100",
        thumbnailWidth: "100",
      }))
    : [];

  const handleAddToWishlist = async (e) => {
    const productId = id;
    dispatch(addToCart(productId));

    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: "Thêm vào giỏ hàng thành công!",
      }),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchProduct({ id });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch, id]);

  return (
    <Box className={style.main}>
      <nav className={style.breadcrumb_nav}>
        <div>
          <ol className={style.breadcrumb}>
            <li className={style.breadcrumb_item}>
              <Link to="/store">
                <Typography variant="body2" className={style.breadcrumb_text}>
                  Trang chủ
                </Typography>
              </Link>
            </li>
            <li className={style.breadcrumb_item}>
              <ChevronRightIcon
                className={style.breadcrumb_icon}
                fontSize="small"
              />
              <Link to="/store">
                <Typography variant="body2" className={style.breadcrumb_text}>
                  Sản Phẩm
                </Typography>
              </Link>
            </li>
            <li className={style.breadcrumb_item}>
              <ChevronRightIcon
                className={style.breadcrumb_icon}
                fontSize="small"
              />
              <Typography
                variant="body2"
                className={`${style.breadcrumb_text} ${style.breadcrumb_text_active}`}>
                {product.name}
              </Typography>
            </li>
          </ol>
        </div>
      </nav>

      <div className={style.page_content}>
        <Paper className={style.container}>
          <div className={style.detail_top}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <div className={style.product_gallery}>
                  <ImageGallery
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showBullets={false}
                    showNav={false}
                    items={image}
                  />
                </div>
              </Grid>
              <Grid item md={6}>
                <div className={style.product_detail}>
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>

                  <Typography variant="h4" color="primary" gutterBottom>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </Typography>
                  <Typography gutterBottom>{product.description}</Typography>
                </div>
                <Paper variant="outlined" className={style.param}>
                  <Tooltip
                    className={style.Tooltip}
                    title="Độ Phân giải màn hình"
                    arrow>
                    <Box className={style.flex_line}>
                      <ScreenShareIcon />
                      <Typography>
                        15.6", 1920 x 1080 Pixel, IPS, 144 Hz, IPS LCD
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip className={style.Tooltip} title="CPU" arrow>
                    <Box className={style.flex_line}>
                      <Memory />
                      <Typography>Intel Core i7-10750H</Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip className={style.Tooltip} title="RAM" arrow>
                    <Box className={style.flex_line}>
                      <DeveloperBoard />
                      <Typography>8 GB, DDR4, 3200 MHz</Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip className={style.Tooltip} title="Ổ cứng" arrow>
                    <Box className={style.flex_line}>
                      <Storage />
                      <Typography>SSD 512 GB</Typography>
                    </Box>
                  </Tooltip>
                </Paper>
                <Button
                  onClick={handleAddToWishlist}
                  sx={{ mt: 2 }}
                  variant="contained"
                  fullWidth
                  size="lg">
                  Thêm vào giỏ hàng
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </Box>
  );
};

export default Product;
