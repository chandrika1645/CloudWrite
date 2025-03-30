const mongoose = require("mongoose");

const DraftSchema = new mongoose.Schema({
    title: {type: String, required: true},
  userId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},
{ timestamps: true }
);

module.exports = mongoose.model("Draft", DraftSchema);
