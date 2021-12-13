import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../../app/productSlice";
import { Box, Typography, Grid, Rating } from "@mui/material";
import style from "./Product.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ImageGallery from "react-image-gallery";
const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.current) || {};
  const { id } = useParams();
  const loading = useSelector((state) => state.product.loading);

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
      originalHeight: "570px",
      thumbnailHeight: "100",
      thumbnailWidth: "100",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
      originalHeight: "570px",
      thumbnailHeight: "100",
      thumbnailWidth: "100",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
      originalHeight: "570px",
      thumbnailHeight: "100",
      thumbnailWidth: "100",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
      originalHeight: "570px",
      thumbnailHeight: "100",
      thumbnailWidth: "100",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
      originalHeight: "570px",
      thumbnailHeight: "100",
      thumbnailWidth: "100",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
      originalHeight: "570px",
      thumbnailHeight: "100",
      thumbnailWidth: "100",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
      originalHeight: "570px",
      thumbnailHeight: "100",
      thumbnailWidth: "100",
    },
  ];

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
              <Link to="/store/product">
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
        <div className={style.container}>
          <div className={style.detail_top}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <div className={style.product_gallery}>
                  <ImageGallery
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showBullets={false}
                    showNav={false}
                    items={images}
                  />
                </div>
              </Grid>
              <Grid item md={6}>
                <div className={style.product_detail}>
                  <Typography variant="h5">{product.name}</Typography>
                  <Rating
                    name="size-small"
                    defaultValue={2}
                    size="small"
                    readOnly
                  />
                  <Typography variant="h5" color="primary">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </Typography>
                  <Typography>{product.description}</Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Product;
