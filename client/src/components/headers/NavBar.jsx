import React from "react";
import { Input } from "reactstrap";
import { RiShoppingBag3Line } from "react-icons/ri";
import { NavLink, Link } from "react-router-dom";

import style from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <div className={style.nav_wrapper}>
        <div className={style.feature_container}>
          <div className={style.logo_container}>
            <Link to="/store">Tào Đạo store</Link>
          </div>
          <div className={style.search_container}>
            <Input placeholder="Tìm kiếm sản phẩm ở đây" />
          </div>
          <div className={style.user_profile}>
            <div className={style.user_profile}>Loli</div>
            <div className={style.cart}>
              <RiShoppingBag3Line className={style.cart_logo} />
              <div className={style.cart_info}>
                <span className={style.title}>Giỏ Hàng</span>
                <span className={style.count}>{"10 sản phầm"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.product_type}>
          <NavLink
            className={`link-light ${style.type}`}
            activeClassName={style.type_active}
            to="/store/laptop">
            Laptop
          </NavLink>
          <NavLink
            className={`link-light ${style.type}`}
            activeClassName={style.type_active}
            to="/store/phone">
            Điện thoại
          </NavLink>
          <NavLink
            className={`link-light ${style.type}`}
            activeClassName={style.type_active}
            to="/store/headphone">
            Tai nghe
          </NavLink>
          <NavLink
            className={`link-light ${style.type}`}
            activeClassName={style.type_active}
            to="/store/keyboard">
            Bàn phím
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
