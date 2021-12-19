const Admin = require("../model/Admin");
const argon2 = require("argon2");
const User = require("../model/User");

class AdminController {
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, messages: "Missing username or password" });
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res
          .status(400)
          .json({ success: false, messages: "Incorrect username or password" });
      }
      const passowrdvalid = await argon2.verify(admin.password, password);
      if (!passowrdvalid) {
        return res
          .status(500)
          .json({ success: false, messages: "Wrong password" });
      }
      res.json({ success: true, messages: "Login successfully", admin });
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
        .json({ success: false, messages: "Missing Adminname or password" });
    try {
      //checking if admin exist
      const user = await Admin.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, messages: "Adminname already taken" });
      }
      //checking if email exist
      const findEmail = await Admin.findOne({ email });
      if (findEmail) {
        return res
          .status(400)
          .json({ success: false, messages: "Email already taken" });
      }
      const hashpassword = await argon2.hash(password);
      const newUser = new Admin({ ...req.body, password: hashpassword });
      await newUser.save();
      res.json({
        success: true,
        messages: "Register successfully",
        user: newUser,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAllUser(req, res) {
    try {
      const findUsers = await User.find();
      return res.status(200).json({ success: true, users: findUsers });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const findUser = await User.findById(id);
      return res.status(200).json({ success: true, users: findUser });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async toggleActiveUser(req, res) {
    try {
      const { id, isActive } = req.body;
      const updateUser = await User.findByIdAndUpdate(id, {
        isActive: !isActive,
      });

      res.json({
        success: true,
        user: updateUser,
        messages: "toggle successfully",
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllAdmin(req, res) {
    try {
      const findAdmin = await Admin.find();
      return res.json({ success: true, admins: findAdmin });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async changeRole(req, res) {
    try {
      const { id, role } = req.body;
      const updateAdmin = await Admin.findByIdAndUpdate(id, {
        role: role,
      });

      const findAdmin = await Admin.findById(id);

      res.json({
        success: true,
        admin: findAdmin,
        messages: "change role successfully",
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new AdminController();
