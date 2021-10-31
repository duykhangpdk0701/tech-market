import React from "react";
import FormLogin from "./FormLogin";
//import style
import style from "./Login.module.scss";

import loginBanner from "../../../assets/loginBanner.svg";

const Login = () => {
  return (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.img_container}>
          <img className={style.img} src={loginBanner} alt="" />
        </div>
        <div className={style.form_container}>
          <FormLogin />
        </div>
      </div>
    </section>
  );
};

export default Login;