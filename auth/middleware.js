// import auth toke functions
const { toData } = require("../auth/jwt");
const User = require("../models").user;

async function auth(req, res, next) {
  console.log("Im going through middleware");

  const authHeader = req.headers.authorization?.split(" ");
  console.log("did I get the header corractly", authHeader);

  if (authHeader && authHeader[1]) {
    try {
      const data = toData(authHeader[1]);
      console.log("data? ", data); // object with userId

      const thisUser = await User.findByPy(data.userId);

      req.user = thisUser;

      req.secretMessage = "I went through middleware";
      // do next when info of the user is correct
      next();
    } catch (e) {
      res.status(401).sed("Toke invalid");
    }
  } else {
    res.status(401).send("Please provide a token in the header.");
  }
}

module.exports = route;
