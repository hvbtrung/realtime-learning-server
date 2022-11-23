const Group = require("../models/groupModel");
const GroupDetail = require("../models/groupDetailModel");
const groupDetailService = require("./groupDetailService");
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
      console.log("new group", newGroup._id);
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
};
// pipeline: [
//     {
//       $match: {
//         $expr: {
//           $eq: ["groupId", "35"],
//         },
//       },
//     },
//   ],
// Group.aggregate([
//     {
//       $lookup: {
//         from: "groupdetails",
//         localField: "_id",
//         foreignField: "groupId",
//         as: "member",
//       },
//     },
//   ]);
// .aggregate([
//   { $match: { groupId: "35" } },
//   {
//     $lookup: {
//       from: "groups",
//       localField: "groupId",
//       foreignField: "_id",
//       as: "member",
//     },
//   },
// ]);
// console.log(groups);
// } catch (e) {
// console.error(e);
// }
// },
