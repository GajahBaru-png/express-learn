const express = require('express');
const authenticateToken = require('../middleware/auth.js');
const router = express.Router();

// Protected route
router.get('/', authenticateToken, (req, res) => {
    res.json({
        message: 'Berhasil akses data profil',
        user: req.user, // hasil dari jwt.verify
    });
});

module.exports = router;
