const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const supabase = require('../config/supabase.js');

let users = [];

const register = async (req, res) => {
    const { email, password, name, role } = req.body;

    const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (existingUser) return res.status(400).json({ error: 'User sudah terdaftar' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { data, error } = await supabase
        .from('users')
        .insert([
            { email, password: hashedPassword, name, role: role || 'user' }
        ]);

    if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Gagal registrasi user' });
    }
    
    res.status(201).json({ message: 'Registrasi berhasil', user: data });
};


const login = async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) return res.status(400).json({ error: 'User tidak ditemukan' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Password salah' });

  // Buat token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Kirim token di response
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};


module.exports = {
    register,
    login,
}