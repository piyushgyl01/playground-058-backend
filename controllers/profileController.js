const Profile = require("../models/Profile");

exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createProfile = async (req, res) => {
  const { name, location, yearsOfExperience, skills, preferredJobType } =
    req.body;

  const profileFields = {
    user: req.user.id,
    name,
    location,
    yearsOfExperience,
    skills: Array.isArray(skills)
      ? skills
      : skills.split(",").map((skill) => skill.trim()),
    preferredJobType,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    res.json({ msg: "Profile deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
