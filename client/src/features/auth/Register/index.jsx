import React from "react";
import FormRegister from "./FormRegister";

//import style
import style from "./Register.module.scss";

const Register = () => {
  return (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.form_container}>
          <FormRegister />
        </div>
      </div>
    </section>
  );
};

export default Register;
