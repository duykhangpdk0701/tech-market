import React from "react";
import style from "./TopBar.module.scss";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { Avatar, Box, Button } from "@mui/material";
import { MANAGER, STAFF, ACCOUNTANT } from "../../constant/role";
import { useHistory } from "react-router-dom";

const TopBar = () => {
  const role = parseInt(localStorage.getItem("role"));
  const history = useHistory();
  const renderRole = (role) => {
    switch (role) {
      case MANAGER.value:
        return MANAGER.label;
      case STAFF.value:
        return STAFF.label;
      case ACCOUNTANT.value:
        return ACCOUNTANT.label;

      default:
        return ACCOUNTANT.label;
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    history.push("/auth");
  };

  return (
    <div className={style.topbar}>
      <div className={style.topbarWrapper}>
        <div className={style.topLeft}>
          <span className={style.logo}>Ta Dao</span>
        </div>
        <div className={style.topRight}>
          <Box className={style.topbarIconContainer}>
            <Button onClick={handleLogOut} variant="outlined">
              Đăng xuất
            </Button>
          </Box>
          <Box className={style.topbarIconContainer}>
            <Button>{renderRole(role)}</Button>
          </Box>
          <Box className={style.topbarIconContainer}>
            <Button>{localStorage.getItem("adminName")}</Button>
          </Box>
          <Avatar className={style.topAvatar}>
            {localStorage.getItem("adminName")[0]}
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
