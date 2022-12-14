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

      if (!owner || owner.role !== "ROLE_OWNER") {
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

  joinGroup: async ({ userId, groupId }) => {
    try {
      var isExist = await GroupDetail.findOne({
        userId: userId,
        groupId: groupId,
      });

      if (isExist) {
        return { message: "exist" };
      }

      var newRow = GroupDetail({
        groupId: groupId,
        userId: userId,
        role: "ROLE_MEMBER",
      });

      const result = await newRow.save();

      if (result) {
        return true;
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  delete: async ({ ownerId, userId, groupId }) => {
    try {
      var owner = await GroupDetail.findOne({
        userId: ownerId,
        groupId: groupId,
      });

      if (!owner || owner.role !== "ROLE_OWNER") {
        return { message: "unauthorized" };
      }

      await GroupDetail.deleteOne({
        userId,
        groupId,
      });

      return { message: "success" };
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  findGroup: async ({ groupId }) => {
    try {
      groupId = mongoose.Types.ObjectId(groupId);
      const results = await GroupDetail.findOne({
        groupId,
        role: "ROLE_OWNER",
      }).populate("groupId");

      return results;
    } catch (err) {
      console.error(e);
      return null;
    }
  },

  findGroupByGroupId: async ({ groupId, type }) => {
    try {
      groupId = mongoose.Types.ObjectId(groupId);
      const results = await GroupDetail.find({ groupId, role: type }).populate(
        "userId"
      );

      return results;
    } catch (err) {
      console.error(e);
      return null;
    }
  },
};
