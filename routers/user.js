// import router
const { Router } = require("express");
// import auth toke functions
const { toJWT, toData } = require("../auth/jwt");
// import users
const User = require("../models").user;
// setup new router
const router = new Router();
const bycrypt = require("bcrypt");
const authMiddleware = require("./auth").middleware;

// get users
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    console.log("Who's making this request??", request.user);
    console.log("What's a secret message??", request.secretMessage);
    const users = await User.findAll();
    res.send(users.map((user) => console.log(user)));
  } catch (e) {
    next(e);
  }
});

// create a new user
router.post("/signup", async (req, res, next) => {
  try {
    const email = req.params.email;
    const password = req.params.password;
    const fullName = req.params.fullName;
    if (!email || !password || !fullName) {
      res.status(400).send(`Must provide parameters `);
    } else {
      const newUser = await User.create({
        email,
        password: bycrypt.hashSync(password, 10),
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

// check a login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send(`Missing parameters `);
    }
    // check if he is in the system
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).send("Incorrect paramters");
    }

    // we have the user
    // now we check the password
    const passwordMatch = bycrypt.compareSync(password, user.password); // returns True of False

    if (!passwordMatch) {
      return res.satus(400).send("wrong password");
    } else {
      // give user a token
      const token = toJWT({ userID: userId });
      return res.send("Congrats you are logged in!", token);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// axios.get("localhost:4000/users", {
//   headers: {
//     Authorization: "Bearer aasdasd",
//   },
// });

module.exports = router;
