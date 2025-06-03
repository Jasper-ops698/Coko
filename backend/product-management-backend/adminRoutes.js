const admin = require('firebase-admin');
const express = require("express");
const User = require("./UserSchema");

const router = express.Router();

// Assign MasterAdmin role manually
router.post("/assign-master-admin", async (req, res) => {
  const { uid } = req.body;

  try {
    // Update Firebase custom claims
    await admin.auth().setCustomUserClaims(uid, { MasterAdmin: true });

    // Update MongoDB
    await User.findOneAndUpdate({ uid }, { role: "MasterAdmin" }, { upsert: true });

    res.status(200).send({ message: "MasterAdmin role assigned successfully" });
  } catch (error) {
    console.error("Error assigning MasterAdmin role:", error); // Log the error for debugging
    res.status(500).send({ error: "Failed to assign MasterAdmin role" });
  }
});

module.exports = router;
