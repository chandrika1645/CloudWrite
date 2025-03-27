const Draft = require("../models/Draft");

const saveDraft = async (req, res) => {
  const { content, draftId, title } = req.body;
  const userId = req.token.uid

  if (!content || !title) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    let draft;
    if (draftId) {
      draft = await Draft.findByIdAndUpdate(draftId, { content }, { new: true });
    } else {
      draft = new Draft({ userId, content , title});
      await draft.save();
    }

    res.json({ message: "Draft saved successfully", draft });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ error: "Error saving draft" });
  }
};

const getUserDrafts = async (req, res) => {
    const userId = req.token.uid
    try {
    const drafts = await Draft.find({ userId });
    
    if (!drafts) return res.json([]); 

    res.json(drafts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching drafts" });
  }
};

const getLatestDraft = async (req, res) => {
  const userId = req.token.uid

  try {
    const latestDraft = await Draft.findOne({ userId }).sort({ createdAt: -1 });
    res.json(latestDraft || { content: "" }); 
  } catch (error) {
    res.status(500).json({ error: "Error fetching draft" });
  }
};



const deleteDraft = async (req, res) => {
    const userId = req.user.uid; 
    const { draftId } = req.params;
  
    try {
      
      const draft = await Draft.findOneAndDelete({ _id: draftId, userId });
  
      if (!draft) {
        return res.status(404).json({ error: "Draft not found or unauthorized" });
      }
  
      res.json({ message: "Draft deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting draft" });
    }
  };
  

module.exports = { saveDraft, getUserDrafts, getLatestDraft, deleteDraft };

