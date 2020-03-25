const express = require("express");
const router = express.Router();
const Course = require("../models/course");

router.post("/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();

    res.status(201).send(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});

    res.send(courses);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/courses/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const course = await Course.findById(_id);

    if (!course) {
      return res.status(404).send({ error: "Course not found!" });
    }

    res.send(course);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/courses/:id", async (req, res) => {
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
    const course = await Course.findById(_id);

    if (!course) {
      return res.status(404).send({ error: "Course not found!" });
    }

    updates.forEach(update => (course[update] = req.body[update]));

    await course.save();

    res.status(201).send(course);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/courses/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const course = await Course.findById(_id);

    if (!course) {
      return res.status(404).send({ error: "Course not found!" });
    }

    await course.remove();

    res.status(201).send({ course, message: "Course is removed." });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
