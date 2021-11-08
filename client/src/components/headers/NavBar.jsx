import React, { useRef, useState, useMemo, useEffect } from "react";
import { Input, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { RiShoppingBag3Line } from "react-icons/ri";
import { NavLink, Link, useHistory } from "react-router-dom";
import queryString from "query-string";

import style from "./NavBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchSearch } from "../../app/searchSlice";

const NavBar = () => {
  const typingTimeoutRef = useRef(null);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const loadingSearching = useSelector((state) => state.search.loading);
  const searchResult = useSelector((state) => state.search.current) || [];

  const urlParams = useMemo(
    () =>
      queryString.parse(history.location.search, {
        arrayFormat: "bracket-separator",
        arrayFormatSeparator: "|",
      }),
    [history.location.search],
  );

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchSearch();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    fetchData();
  }, [search, dispatch]);

  const handleInputOnchangeInputSearch = (e) => {
    const value = e.target.value;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setSearch(value);
      if (history.location.pathname === "/store") {
        if (value !== "") {
          history.replace({
            pathname: history.location.pathname,
            search: queryString.stringify(
              { ...urlParams, q: value },
              { arrayFormat: "bracket-separator", arrayFormatSeparator: "|" },
            ),
          });
        } else {
          delete urlParams.q;
          history.replace({
            pathname: history.location.pathname,
            search: queryString.stringify(
              { ...urlParams },
              { arrayFormat: "bracket-separator", arrayFormatSeparator: "|" },
            ),
          });
        }
      }
    }, 500);
  };

  return (
    <nav className={style.nav}>
      <div className={style.nav_wrapper}>
        <div className={style.feature_container}>
          <div className={style.logo_container}>
            <Link to="/store">Tào Đạo store</Link>
          </div>
          <div className={style.search_container}>
            <Input
              placeholder="Tìm kiếm sản phẩm ở đây"
              onChange={handleInputOnchangeInputSearch}
            />
            {search &&
              (loadingSearching ? (
                <ListGroup className={style.search_result_container}>
                  <ListGroupItem className={style.spinner_container}>
                    <Spinner>Loading...</Spinner>
                  </ListGroupItem>
                </ListGroup>
              ) : (
                <ListGroup className={style.search_result_container}>
                  {searchResult.map((item) => (
                    <ListGroupItem>
                      <Link to={`/store/product/${item._id}`}>{item.name}</Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              ))}
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
