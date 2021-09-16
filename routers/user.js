// import router
const { Router } = require("express");
// import users
const User = require("../models").user;
// setup new router
const router = new Router();

// get users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

// create a new user
router.post("/", async (req, res, next) => {
  try {
    const email = req.params.email;
    const password = req.params.password;
    const fullName = req.params.fullName;
    if (!email || !password || !fullName) {
      let warning = "";
      if (!email && !password && !fullName) {
        warning = "email, password & fullName";
      } else if (!email) {
        warning = "email";
        return warning;
      } else if (!password) {
        warning = "password";
        return warning;
      } else if (!fullName) {
        warning = "fullName";
        return warning;
      }
      res.status(400).send(`Must provide: ${warning} `);
    } else {
      const newUser = await User.create({
        email,
        password,
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
