const supabase = require('../config/supabase.js');


// GET METHOD
const getAllProducts = async (req, res) => {
    const {data, error} = await supabase.from('products').select('*');
    if (error) return res.status(500).json({error});
    res.json(data);
};

// POST METHOD
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

// DELETE METHOD
const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }

    res.json({
      message: 'Delete success',
      data: {
        id: id,
      }
    });

  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
}

// PATCH METHPD
const updateProducts = async (req, res) => {
    const {id} = req.params;
    const updates = req.body;

    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()

    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Failed to update user', error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'User not found or no changes applied' });
    }

    res.json({
      message: 'Update success',
      data: data[0], // Mengembalikan objek yang diupdate (jika .select() digunakan)
    });
}

module.exports = {
    getAllProducts,
    createNewProducts,
    deleteProducts,
    updateProducts
}