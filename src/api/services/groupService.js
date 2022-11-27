const Group = require("../models/groupModel");
const GroupDetail = require("../models/groupDetailModel");
const groupDetailService = require("./groupDetailService");
const sendEmail = require("../utils/sendEmail");
const mongoose = require("mongoose");

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
      const results = await GroupDetail.find({ userId }).populate("groupId");

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

  getGroup: async ({ groupId }) => {
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

  sendMail: async ({ inviteeEmail, groupId, link }) => {
    const subject = "[GROUP INVITATION]";
    const send_to = inviteeEmail;
    const send_from = process.env.EMAIL_USER;

    // link = `${process.env.CLIENT_URL}/group/join?${groupId}`;
    const message = `
        <h2>Hello buddy,</h2>
        <p>Please use the url below to join group</p>

        <a href=${link} clicktracking=off>${link}</a>

        <p>Regards...</p>
        <p>Realtime Learning Team</p>
    `;

    try {
      await sendEmail(subject, message, send_to, send_from);
      return true;
    } catch (error) {
      console.error("error send email", error);
      return null;
    }
  },
};
