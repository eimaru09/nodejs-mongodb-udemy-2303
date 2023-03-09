const Task = require("../models/Task");

//27
//34
const getAllTasks =  async(req, res) => {
    try {
        const allTask = await Task.find({});
        res.json(allTask);
    } catch (err) {
        res.status(500).json(err);
    }
};
const createTask = async (req, res) => {
    //33
    try {
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch (err) {
        res.status(500).json(err);
    }
};
const getSingleTask =  async (req, res) => {
    try {
        const singleTask = await Task.findById({ _id: req.params.id});
        if(!singleTask){
            res.status(404).json(`${req.params.id} は存在しません`);
        }
        res.json(singleTask);
    } catch (err) {
        res.status(500).json(err);
    }
};
const updateTask =  async(req, res) => {
    try {
        const updateTask = await Task.findByIdAndUpdate({ _id: req.params.id}, req.body, { new: true });
        if(!updateTask){
            res.json(`${req.params.id} は存在しません`);
        }
        res.json(updateTask);
    } catch (err) {
        res.status(500).json(err);
    }
};
const deleteTask =  async(req, res) => {
    try {
        const deleteTask = await Task.deleteOne({ _id: req.params.id});
        if(!deleteTask){
            res.status(404).json(`${req.params.id} は存在しません`);
        }
        res.json(deleteTask);
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
};