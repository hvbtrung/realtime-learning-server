const GroupDetail = require("../models/groupDetailModel");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  save: async ({ userID, groupID, role }) => {
    var newMember = new GroupDetail({
      userId: mongoose.Types.ObjectId(userID),
      groupId: mongoose.Types.ObjectId(groupID),
      role: role,
    });

    try {
      const result = await newMember.save();

      console.log("result: ", result);
      if (result) {
        return true;
      }

      return false;
    } catch (e) {
      console.Error("Assign new role error", e);
      return false;
    }
  },

  getGroupsByUserId: async ({ id }) => {},
};
