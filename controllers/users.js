var usersModel = require('../models/users');

// Add user
exports.createUser = (req, res) => {
    if(!req.body.name || !req.body.phone) {
        res.status(400).json({ "Error": "Invalid Data" });
    } else {
        new usersModel({
            name: req.body.name,
            phone: req.body.phone
        }).save((err, savedUser) => {
            if (err) {
                console.log(err);
                res.status(500).json();
            } else {
                console.log("User successfully created.");
                res.status(201).json();
            }
        });
    }
}

// Retrieve all users
exports.findAllUsers = (req, res) => {
    usersModel.find((err, users) => {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log("All Users found");
            res.status(200).json(users);
        }
    });
}

// Retrieve single user
exports.findOneUser = (req, res) => {
    usersModel.findById(req.params.userId).then(user => {
        if (user === null) {
            console.log("Invalid params");
            res.status(400).json({ "Error": "Invalid data"});
        } else {
            console.log("User found");
            res.status(200).json(user);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(404).json();
    });
}

// Update user
exports.editUser = (req, res) => {    
    usersModel.findById(req.params.userId, (err, user) => {
        if (err) {
            console.log(err);
            res.status(404).json();
        } else {
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            user.tasks = req.body.tasks || user.tasks;
            user.save((err, savedUser) => {
                if (err) {
                    console.log(err);
                    res.status(500).json();
                } else {
                    console.log('User successfully updated.');
                    res.status(201).json();
                }
            });
        }
    });
}

// Delete user
exports.deleteUser = (req, res) => {
    usersModel.findByIdAndRemove(req.params.userId, (err, user) => {
        if (err) {
            console.log(err);
            res.status(404).json();
        } else {
            console.log('User successfully deleted.');
            res.status(204).json();
        }
    });
}