const Draft = require("../models/Draft");

const saveDraft = async (req, res) => {
  const { content, draftId, title } = req.body;
  const userId = req.token.uid;

  if (!content || !title) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    let draft;
    if (draftId) {
      draft = await Draft.findByIdAndUpdate(
        draftId,
        { content, title },
        { new: true }
      );
    } else {
      draft = new Draft({ userId, content, title });
      await draft.save();
    }

    return res.json({ message: "Draft saved successfully", draft });
  } catch (error) {
    console.error("Save error:", error);
    return res.status(500).json({ error: "Error saving draft" });
  }
};

const getUserDrafts = async (req, res) => {
  const userId = req.token.uid;
  try {
    const drafts = await Draft.find({ userId });

    if (!drafts) return res.json([]);

    return res.json(drafts);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching drafts" });
  }
};

const getUserDraftsByDraftId = async (req, res) => {
  const userId = req.token.uid;
  const { draftId } = req.params;

  try {
    const draft = await Draft.findOne({ _id: draftId, userId });

    if (!draft)
      return res.status(404).json({ error: "Draft not found or unauthorized" });

    return res.json(draft);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching drafts" });
  }
};

const getLatestDraft = async (req, res) => {
  const userId = req.token.uid;
  try {
    const latestDraft = await Draft.find({ userId }).sort({ createdAt: -1 });
    return res.json(latestDraft || { content: "" });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching draft" });
  }
};

const deleteDraft = async (req, res) => {
  const userId = req.token.uid;
  const { draftId } = req.params;

  try {
    const draft = await Draft.findOneAndDelete({ _id: draftId, userId });

    if (!draft) {
      return res.status(404).json({ error: "Draft not found or unauthorized" });
    }

    return res.json({ message: "Draft deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting draft" });
  }
};

module.exports = {
  saveDraft,
  getUserDrafts,
  getLatestDraft,
  deleteDraft,
  getUserDraftsByDraftId,
};
