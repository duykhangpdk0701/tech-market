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
  async getAll(req, res) {
    try {
      const findProvider = await Provider.find();
      res.json({
        success: true,
        providers: findProvider,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { name, email, address, phone, id } = req.body;
      const updateProvider = await Provider.findByIdAndUpdate(id, {
        name,
        email,
        address,
        phone,
      });
      res.json({
        success: true,
        providers: updateProvider,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const findProvider = await Provider.findById(id);
      res.json({
        success: true,
        providers: findProvider,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ProviderController();
