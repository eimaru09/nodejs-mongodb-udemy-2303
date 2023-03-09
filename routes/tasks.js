const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");

//26
// router.get("/", (req, res) => {
//     res.send("タスクをすべて取得");
// });
// router.post("/", (req, res) => {
//     res.send("タスクを新規作成");
// });
// router.get("/:id", (req, res) => {
//     res.send("特定タスクを取得");
// });
// router.patch("/:id", (req, res) => {
//     res.send("特定タスクを更新");
// });
// router.delete("/:id", (req, res) => {
//     res.send("特定タスクを削除");
// });

//27
router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getSingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;