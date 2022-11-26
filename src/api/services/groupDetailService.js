const GroupDetail = require("../models/groupDetailModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");

module.exports = {
  save: async ({ userID, groupID, role }) => {
    var newMember = new GroupDetail({
      userId: mongoose.Types.ObjectId(userID),
      groupId: mongoose.Types.ObjectId(groupID),
      role: role,
    });

    try {
      const result = await newMember.save();

      if (result) {
        return true;
      }

      return false;
    } catch (e) {
      console.Error("Assign new role error", e);
      return false;
    }
  },

  assignRole: async ({ ownerId, groupId, role, email }) => {
    try {
      var owner = await GroupDetail.findOne({
        userId: ownerId,
        groupId: groupId,
      });

      if (owner.role !== "ROLE_OWNER") {
        return { message: "unauthorized" };
      }

      var user = await User.findOne({
        email: email,
      });

      if (!user) {
        return { message: "invalid" };
      }

      var newRow = GroupDetail({
        groupId: groupId,
        userId: user._id,
        role: role,
      });

      const isExist = await GroupDetail.findOne({
        groupId: groupId,
        userId: user._id,
      });
      if (isExist) {
        return { message: "exist" };
      }

      const result = await newRow.save();
      if (result) {
        return { message: "success" };
      }
      return { message: "failure" };
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  detachRole: async ({ userIds, groupId }) => {
    try {
      for (const userId of userIds) {
        await GroupDetail.deleteOne({
          userId,
          groupId,
        });
      }
      return true;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};
