const { Router } = require("express");
import Image from ("../models/image");
const router = new Router();
router.get("/", (res, req, next) => {
    try {

    } catch (e) {
        next(e);
    }
})