const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const groupDetailSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  groupId: { type: Schema.Types.ObjectId, ref: "Group" },
  role: { type: String },
});

module.exports = mongoose.model("GroupDetail", groupDetailSchema);
