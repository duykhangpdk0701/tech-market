const User = require("../model/User");

exports.login = async (req, res) => {
  try {
    res.status(200).send({ text: "login" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    //checking if username exist
    const findUsername = User.find({ username });
    if (findUsername) {
      res.status(400).send({ error: "username is Already exist" });
      return;
    }

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    const saveTest = await user.save();
    res.status(200).send({ user: saveTest });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
