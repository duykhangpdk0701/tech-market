import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import style from "./Template.module.scss";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../app/snackbarSlice";
import { addToCart } from "../../../app/cartsSlice";

const ItemProduct = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async (e) => {
    const productId = props.item._id;
    setLoading(true);
    dispatch(addToCart(productId));

    setLoading(false);
    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: "Thêm vào giỏ hàng thành công!",
      }),
    );
  };

  const { item } = props;
  return (
    <Card key={item._id} className={style.item_wrapper}>
      <CardActionArea>
        <CardMedia
          className={style.img_container}
          component="img"
          image="https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/23/637232326768418337_lenovo-ideapad-L340-den-2.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.category.name}
          </Typography>
          <Typography variant="body2">{item.description}</Typography>
        </CardContent>
        <CardActions>
          <div className={style.btn_container}>
            <Tooltip title="Thêm vào giỏ hàng">
              <LoadingButton
                loading={loading}
                className={style.card_btn}
                variant="contained"
                onClick={handleAddToWishlist}>
                <AddShoppingCartIcon />
              </LoadingButton>
            </Tooltip>
          </div>
        </CardActions>
        <Link className={style.item_link} to={`/store/product/${item._id}`} />
      </CardActionArea>
    </Card>
  );
};

export default ItemProduct;
