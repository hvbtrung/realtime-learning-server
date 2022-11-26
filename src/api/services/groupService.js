const Group = require("../models/groupModel");
const GroupDetail = require("../models/groupDetailModel");
const groupDetailService = require("./groupDetailService");
const User = require("../models/userModel");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  save: async ({ nameGroup, shortDesc, userId }) => {
    var newGroup = new Group({
      name: nameGroup,
      shortDesc: shortDesc,
    });

    try {
      newGroup = await newGroup.save();
      const newMember = await groupDetailService.save({
        userID: userId,
        groupID: newGroup.id,
        role: "ROLE_OWNER",
      });

      if (newMember) {
        return true;
      }
      return false;
    } catch (e) {
      console.error("Create group failure, please try again");
      return false;
    }
  },

  findGroupsByUserId: async ({ userId }) => {
    try {
      userId = mongoose.Types.ObjectId(userId);
      const results = await GroupDetail.find({ userId })
        .populate("groupId")
        .populate("userId");

      return results;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  findGroup: async ({ groupId, type }) => {
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
        return { message: "Invalid" };
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
};
