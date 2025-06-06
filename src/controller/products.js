const supabase = require('../config/supabase.js');
const { createNewUser } = require('./users.js');

const getAllProducts = async (req, res) => {
    const {data, error} = await supabase.from('products').select('*');
    if (error) return res.status(500).json({error});
    res.json(data);
};

const createNewProducts = async (req, res) => {
  try {
    const { name, price, description, image_url } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert([{ name, price, description, image_url }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Pastikan response selalu dikirim
    return res.status(201).json({ success: true, data });
  } catch (err) {
    // Tangani error tak terduga
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getAllProducts,
    createNewProducts,
}