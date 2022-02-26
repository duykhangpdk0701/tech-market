const User = require("../model/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class UserController {
  async load(req, res) {
    try {
      const user = await User.findById(req.Id);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, messages: "User not found" });
      }
      res.json({
        success: true,
        user: { userId: user._id, username: user.username },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, messages: "Missing username or password" });
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, messages: "Incorrect username or password" });
      }
      const passowrdvalid = await argon2.verify(user.password, password);
      if (!passowrdvalid) {
        return res
          .status(500)
          .json({ success: false, messages: "Invalid password" });
      }

      if (!user.isActive) {
        return res
          .status(500)
          .json({ success: false, messages: "Tài khoản của bạn đã bị khoá." });
      }

      const accessToken = jwt.sign(
        { Id: user._id },
        process.env.ACCESS_TOKEN_SECRET || "Khangvippro",
      );
      res.json({ success: true, messages: "Login successfully", accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async register(req, res) {
    const { username, password, email } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, messages: "Missing username or password" });
    try {
      //checking if user exist
      const user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, messages: "Username already taken" });
      }
      //checking if email exist
      const findEmail = await User.findOne({ email });
      if (findEmail) {
        return res
          .status(400)
          .json({ success: false, messages: "Email already taken" });
      }
      const hashpassword = await argon2.hash(password);
      const newUser = new User({ ...req.body, password: hashpassword });
      await newUser.save();
      const accessToken = jwt.sign(
        { Id: newUser._id },
        process.env.ACCESS_TOKEN_SECRET || "Khangvippro",
      );
      res.json({
        success: true,
        messages: "Register successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new UserController();
