const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  // Here goes the login logic.
  try {
    res.send({
      jwt: toJWT({ serdId: 1 }),
    });
  } catch (e) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  }
});

module.exports = router;
