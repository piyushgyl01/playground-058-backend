const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const auth = require("../middleware/auth");

router.get("/me", auth, profileController.getCurrentProfile);

router.post("/", auth, profileController.createProfile);

router.delete("/", auth, profileController.deleteProfile);

module.exports = router;
