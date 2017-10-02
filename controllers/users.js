var usersModel = require('../models/users');

exports.createUser = (req, res) => {
    new usersModel({
        name: req.body.name,
        phone: req.body.phone
    }).save();
}

exports.findAllUsers = (req, res) => {
    usersModel.find((err, users) => {
        if (err) {
            console.log('Error from "findAllUsers"', err);
            res.status(500).send();
        } else {
            res.send(users);
        }
    });
}

exports.findOneUser = (req, res) => {
    usersModel.findById(req.params.id)
              .then(user => {
                  if (user === null) {
                      res.status(400).send('Invalid params');
                  } else {
                      res.send(user);
                  }
              })
              .catch(err => {
                  console.log(err);
                  res.status(500).send();
              });
}

exports.editUser = (req, res) => {    
    usersModel.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            user.tasks = req.body.tasks || user.tasks;
        
            user.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    console.log('User successfully updated.');
                    res.status(200).send(user);
                }
            });
        }
    });
}

exports.deleteUser = (req, res) => {
    usersModel.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            console.log('User successfully deleted.');
            res.status(200).send(user);
        }
    });
}