const Provider = require("../model/Provider");

class ProviderController {
  async add(req, res) {
    try {
      const data = req.body;
      const addProvider = new Provider(data);
      await addProvider.save();
      res.json({
        success: true,
        messages: "add successfully",
        provider: addProvider,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ProviderController();
