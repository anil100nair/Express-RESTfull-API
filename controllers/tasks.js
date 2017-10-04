const tasksModel = require('../models/tasks');
const usersModel = require('../models/users');

exports.createTask = (req, res) => {
    req.params.userId = req.userId;
    new tasksModel({
        task: req.body.task,
        isDone: req.body.isDone,
        taskUser: req.params.userId
    }).save((err, task) => {
        console.log("Task successfully created.");
        usersModel.findById(req.params.userId, (err, user) => {
            if (err) {
                console.log(err);
                res.status(404).send();
            } else {
                user.tasks.push(task.id);
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
    });
}

exports.findAllTasks = (req, res) => {
    req.params.userId = req.userId;
    tasksModel.find({ taskUser: req.params.userId }, (err, tasks) => {
        if (err) {
            console.log(err);
            res.status(400).send();
        } else {
            console.log("All tasks found.");
            res.status(200).send(tasks);
        }
    });
}

exports.findOneTask = (req, res) => {
    tasksModel.findById(req.params.taskId)
        .then(task => {
            if (task === null) {
                console.log("Invalid params");
                res.status(400).send();
            } else {
                console.log("Task found.");
                res.status(200).send(task);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).send();
        });
}

exports.editTask = (req, res) => {
    tasksModel.findById(req.params.taskId, (err, task) => {
        if (err) {
            console.log(err);
            res.status(404).send();
        } else {
            task.task = req.body.task || task.task;
            task.isDone = req.body.isDone || task.isDone;
            task.taskUser = req.body.taskUser || task.taskUser;
            task.save((err, savedTask) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    console.log('User successfully updated.');
                    res.status(201).send();
                }
            });
        }
    });
}

exports.deleteTask = (req, res) => {
    req.params.userId = req.userId;
    tasksModel.findByIdAndRemove(req.params.taskId, (err, task) => {
        if (err) {
            console.log(err);
            res.status(404).send();
        } else {
            console.log('Task successfully deleted.');
            usersModel.findById(req.params.userId, (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(404).send();
                } else {
                    let pos = user.tasks.indexOf(req.params.taskId);
                    user.tasks.splice(pos, 1);
                    user.save((err, savedUser) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send();
                        } else {
                            console.log('User successfully updated.');
                            res.status(204).send();
                        }
                    });
                }
            });
        }
    });
}