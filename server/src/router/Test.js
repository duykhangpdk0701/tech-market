const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const session = require('express-session');

router.post("/", (req, res) => {
  console.log({
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  });
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  transport.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready for message");
      console.log(success);
    }
  });

  transport.sendMail({
    from: "duykhangwork0701@gmail.com",
    to: "duykhangpdk0701@gmail.com",
    subject: "Testing nodemail",
    text: "thư nè Khang",
  });
  res.send({ success: true });
});

router.post('/session', ()=>{

})

module.exports = router;
