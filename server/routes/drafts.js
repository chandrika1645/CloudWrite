const express = require("express");
const router = express.Router();
const {
  saveDraft,
  getUserDrafts,
  getLatestDraft,
  deleteDraft,
  getUserDraftsByDraftId,
} = require("../controllers/draft");
const verifyToken = require("../middleware/userAuth");

router.post("/save", verifyToken, saveDraft);

router.get("/latest", verifyToken, getLatestDraft);

router.get("/", verifyToken, getUserDrafts);

router.get("/:draftId", verifyToken, getUserDraftsByDraftId);

router.delete("/:draftId", verifyToken, deleteDraft);

module.exports = router;
