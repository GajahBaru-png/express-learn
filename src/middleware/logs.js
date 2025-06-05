const logRequest = (req, res, next) => { //Bisa jadi Middleware dan Bersifat General
    console.log('Anjas ada request di:', req.path);
    next();
}

module.exports = logRequest;