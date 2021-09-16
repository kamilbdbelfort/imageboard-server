const jwt = require("jsonwebtoken");

const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

// data => userID
// secret => jumbler
// expiration => how long is this valid

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" }); //create token
}

function toData(token) {
  return jwt.verify(token, secret); //check token
}

module.exports = { toJWT, toData };
