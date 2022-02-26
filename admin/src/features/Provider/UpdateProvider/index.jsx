import { Button, Card, TextField } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import providerApi from "../../../api/providerApi";
import { updateProviderAsync } from "../../../app/providersSlice";

const UpdateProvider = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await providerApi.getById(id);
      setName(fetch.providers.name);
      setEmail(fetch.providers.email);
      setAddress(fetch.providers.address);
      setPhone(fetch.providers.phone);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    const action = await updateProviderAsync({
      id,
      name,
      email,
      address,
      phone,
    });
    const actionResult = await dispatch(action);
    await unwrapResult(actionResult);
  };

  return (
    <div>
      <Card>
        <TextField
          label="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Địa Chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button onClick={handleSubmit}>Xác Nhận</Button>
      </Card>
    </div>
  );
};

export default UpdateProvider;
