var usersModel = require('../models/users');

exports.createUser = (req, res) => {
    new usersModel({
        name: req.body.name,
        phone: req.body.phone
    }).save((err, savedUser) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            console.log("User successfully created.");
            res.status(201).send();
        }
    });
}

exports.findAllUsers = (req, res) => {
    usersModel.find((err, users) => {
        if (err) {
            console.log(err);
            res.status(400).send();
        } else {
            console.log("All Users found");
            res.status(200).send(users);
        }
    });
}

exports.findOneUser = (req, res) => {
    usersModel.findById(req.params.userId)
              .then(user => {
                  if (user === null) {
                      console.log("Invalid params");
                      res.status(400).send();
                  } else {
                      console.log("User found");
                      res.status(200).send(user);
                  }
              })
              .catch(err => {
                  console.log(err);
                  res.status(404).send();
              });
}

exports.editUser = (req, res) => {    
    usersModel.findById(req.params.userId, (err, user) => {
        if (err) {
            console.log(err);
            res.status(404).send();
        } else {
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            user.tasks = req.body.tasks || user.tasks;
            user.save((err, savedUser) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                } else {
                    console.log('User successfully updated.');
                    res.status(201).send();
                }
            });
        }
    });
}

exports.deleteUser = (req, res) => {
    usersModel.findByIdAndRemove(req.params.userId, (err, user) => {
        if (err) {
            console.log(err);
            res.status(404).send();
        } else {
            console.log('User successfully deleted.');
            res.status(204).send();
        }
    });
}