const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const auth = require("../middleware/auth");

router.get("/", jobController.getAllJobs);

router.get("/:id", jobController.getJobById);

router.post("/", auth, jobController.createJob);

router.put("/:id", auth, jobController.updateJob);

router.delete("/:id", auth, jobController.deleteJob);

router.post("/seed", jobController.seedJobs);

module.exports = router;
