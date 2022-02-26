class TestController {
  async uploadFIle(req, res, next) {
    try {
      console.log(req.file);
      return res.send({ message: "this is inside testRoute" });
    } catch (error) {
      return res.send({ error: error });
    }
  }
}

module.exports = new TestController();
