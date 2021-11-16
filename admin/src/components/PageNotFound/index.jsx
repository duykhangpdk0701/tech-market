import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import style from "./PageNotFound.module.scss";
import PageNotFoundImg from "../../assets/PageNotFoundImg.svg";

const PageNotFound = () => {
  return (
    <section className={style.section}>
      <div className={style.container}>
        <img className={style.img} src={PageNotFoundImg} alt="" />
        <h1>Page not found</h1>
        <p>Chúng tôi xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
        <Button variant="contained">
          <Link className={style.link} to="/admin">
            go to home page
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default PageNotFound;
