import React from "react";
import style from "./SideBar.module.scss";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";

import { NavLink, useRouteMatch } from "react-router-dom";

const SideBar = () => {
  const match = useRouteMatch();
  return (
    <div className={style.sidebar}>
      <div className={style.sidebarWrapper}>
        <div className={style.sidebarMenu}>
          <h3 className={style.sidebarTitle}>Dashboard</h3>
          <ul className={style.sidebarList}>
            <NavLink to="/" className={style.link}>
              <li className={`${style.sidebarListItem} ${style.active}`}>
                <LineStyle className={style.sidebarIcon} />
                Home
              </li>
            </NavLink>
            <li className={style.sidebarListItem}>
              <Timeline className={style.sidebarIcon} />
              Analytics
            </li>
            <li className={style.sidebarListItem}>
              <TrendingUp className={style.sidebarIcon} />
              Sales
            </li>
          </ul>
        </div>
        <div className={style.sidebarMenu}>
          <h3 className={style.sidebarTitle}>Quick Menu</h3>
          <ul className={style.sidebarList}>
            <NavLink to={`${match.url}/user`} className={style.link}>
              <li className={style.sidebarListItem}>
                <PermIdentity className={style.sidebarIcon} />
                Users
              </li>
            </NavLink>
            <NavLink to={`${match.url}/product`} className={style.link}>
              <li className={style.sidebarListItem}>
                <Storefront className={style.sidebarIcon} />
                Products
              </li>
            </NavLink>
            <li className={style.sidebarListItem}>
              <AttachMoney className={style.sidebarIcon} />
              Transactions
            </li>
            <li className={style.sidebarListItem}>
              <BarChart className={style.sidebarIcon} />
              Reports
            </li>
          </ul>
        </div>
        <div className={style.sidebarMenu}>
          <h3 className={style.sidebarTitle}>Notifications</h3>
          <ul className={style.sidebarList}>
            <li className={style.sidebarListItem}>
              <MailOutline className={style.sidebarIcon} />
              Mail
            </li>
            <li className={style.sidebarListItem}>
              <DynamicFeed className={style.sidebarIcon} />
              Feedback
            </li>
            <li className={style.sidebarListItem}>
              <ChatBubbleOutline className={style.sidebarIcon} />
              Messages
            </li>
          </ul>
        </div>
        <div className={style.sidebarIcon}>
          <h3 className={style.sidebarTitle}>Staff</h3>
          <ul className={style.sidebarList}>
            <li className={style.sidebarListItem}>
              <WorkOutline className={style.sidebarIcon} />
              Manage
            </li>
            <li className={style.sidebarListItem}>
              <Timeline className={style.sidebarIcon} />
              Analytics
            </li>
            <li className={style.sidebarListItem}>
              <Report className={style.sidebarIcon} />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
