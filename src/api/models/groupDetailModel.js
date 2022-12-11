const mongoose = require("mongoose");

const groupDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  role: {
    type: String,
  },
});

const GroupDetail = mongoose.model("GroupDetail", groupDetailSchema);

module.exports = GroupDetail;
