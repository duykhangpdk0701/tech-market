import React from "react";
import * as Yup from "yup";

const AddAdmin = () => {
  const initialValue = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Bạn cần nhập tên"),
    lastname: Yup.string().required("Bạn cần nhập Họ"),
    username: Yup.string().required("Bạn cần nhập adminname"),
    email: Yup.string().required("Bạn cần nhập email"),
    password: Yup.string().required("Bạn cần nhập password"),
  });

  return (
    <div>
      <h1>this is Admin page</h1>
    </div>
  );
};

export default AddAdmin;
