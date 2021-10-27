const Test = require("../model/Test");

exports.getTest = (req, res) => {
  try {
    res.status(200).send({ text: "Hello xin chao ban Hien" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

exports.postTest = async (req, res) => {
  // const name = req.body.name
  const { name } = req.body;

  try {
    const test = new Test({
      //name : name
      name,
    });
    const saveTest = await test.save();

    res.status(200).send({ message: "inserted", test, saveTest });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
