const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignment");

router.post("/assignments", async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();

    res.status(201).send(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find({});

    res.send(assignments);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/assignments/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const assignment = await Assignment.findById(_id);

    if (!assignment) {
      return res.status(404).send({ error: "Assignment not found!" });
    }

    res.send(assignment);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/assignments/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const validOperations = ["name"];

  const isValidOperation = updates.every(update =>
    validOperations.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Enter valid properties!" });
  }

  try {
    const _id = req.params.id;
    const assignment = await Assignment.findById(_id);

    if (!assignment) {
      return res.status(404).send({ error: "Assignment not found!" });
    }

    updates.forEach(update => (assignment[update] = req.body[update]));

    await assignment.save();

    res.status(201).send(assignment);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/assignments/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const assignment = await Assignment.findById(_id);

    if (!assignment) {
      return res.status(404).send({ error: "Assignment not found!" });
    }

    await assignment.remove();

    res.status(201).send({ assignment, message: "Assignment is removed." });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
