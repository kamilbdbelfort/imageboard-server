// import router
const { Router } = require("express");
// import images
const Image = require("../models").image;
// setup new router
const router = new Router();

// get one image
router.get("/:imageId", async (req, res, next) => {
  try {
    const id = req.params.imageId;
    console.log("id:", id);
    const getImage = await Image.findByPk(id);
    res.send(getImage["url"]);
  } catch (e) {
    next(e);
  }
});

// get images and corresponding users
router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.send(images);
  } catch (e) {
    next(e);
  }
});

// create a new image in DB
router.post("/", async (req, res, next) => {
  try {
    const title = req.body.title;
    const url = req.body.url;
    if (!title || !url) {
      let warning = "";
      if (!title && !url) {
        warning = "title & url";
      } else if (!title) {
        warning = "title";
        return warning;
      } else if (!url) {
        warning = "url";
        return warning;
      }
      res.status(400).send(`Must provide: ${warning} `);
    } else {
      const newImage = await Image.create({
        title,
        url,
      });
      res.json(newImage);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
