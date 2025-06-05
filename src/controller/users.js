const getALLUsers = (req, res) => {
    res.json({
        message: "GET All users success"
    });
}

const createNewUser = (req, res) => {
    res.json({
        message: 'Create New Users success',
    });
}

module.exports = {
    getALLUsers,
    createNewUser,
}