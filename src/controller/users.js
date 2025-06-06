const getALLUsers = (req, res) => {
    const data = {
        id: "1",
        name: "Paijo",
        email: "paijo@gmail.com"
    }
    res.json({
        message: "GET All users success",
        data: data
    });
}

const createNewUser = (req, res) => {
    console.log(req.body);
    res.json({
        message: 'Create New Users success',
        data: req.body
    });
}

const updateUser = (req, res) => {
    const {id} = req.params;
    console.log('id:', id);
    res.json({
        message: 'UPDATE Success',
        data: req.body,
    })
}

const deleteUser = (req, res) => {
    const {id} = req.params;
    res.json({
        message: 'delete success',
        data: {
            id: id,
            name: 'mail',
            email: 'mail@gmail.com'
        }
    })
}

module.exports = {
    getALLUsers,
    createNewUser,
    updateUser,
    deleteUser
}