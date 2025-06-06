const supabase = require('../config/supabase.js')

const getALLUsers = async (req, res) => {
    const {data, error} = await supabase.from('users').select('*');
    if (error) return res.status(500).json({error});
    res.json(data);
};

const createNewUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email }])
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

const updateUser = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL
  const updates = req.body; // Mengambil data yang akan diupdate dari body request

  try {
    const { data, error } = await supabase
      .from('users') // Nama tabel Anda
      .update(updates) // Mengirimkan objek `updates` ke Supabase
      .eq('id', id)   // Memfilter baris berdasarkan ID
      .select();      // Mengembalikan data yang diupdate (opsional, tapi disarankan)

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

  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Failed to delete user', error: error.message });
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

module.exports = {
    getALLUsers,
    createNewUser,
    updateUser,
    deleteUser
}