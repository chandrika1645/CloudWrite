const express = require("express");
const router = express.Router();
const {
  saveDraft,
  getUserDrafts,
  getLatestDraft,
  deleteDraft,
} = require("../controllers/draft");
const verifyToken = require("../middleware/userAuth");

router.post("/save", verifyToken, saveDraft);

router.get("/", verifyToken, getUserDrafts);

router.get("/latest", verifyToken, getLatestDraft);

router.delete("/:draftId", verifyToken, deleteDraft);

module.exports = router;
