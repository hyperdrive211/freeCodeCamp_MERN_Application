const express = require("express");
const router = express.Router();
const Exercise = require("../Models/Exercise.Model");

router.get("/", (req, res) => {
  console.log("this is not being hit");
  Exercise.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then((ex) => res.json(ex))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.delete("/:id", (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/update/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then((ex) => {
      ex.username = req.body.username;
      ex.description = req.body.description;
      ex.duration = Number(req.body.duration);
      ex.date = Date.parse(req.body.date);

      ex.save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
