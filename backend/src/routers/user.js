const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).send(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const validOperations = ["username", "email", "password"];

  const isValidOperation = updates.every(update =>
    validOperations.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Enter valid properties!" });
  }

  try {
    const _id = req.params.id;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    updates.forEach(update => (user[update] = req.body[update]));

    await user.save();

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    await user.remove();

    res.status(201).send({ user, message: "User is removed." });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
