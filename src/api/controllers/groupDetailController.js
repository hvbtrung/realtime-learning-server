const groupDetailService = require("../services/groupDetailService");

module.exports = {
  assignRole: async (req, res) => {
    const { groupId, role, email } = req.body.data;

    const result = await groupDetailService.assignRole({
      ownerId: req.user._id,
      groupId,
      role,
      email,
    });

    if (result) {
      if (result.message === "exist") {
        return res.json({
          status: "error",
          message: "Member is exist",
        });
      } else if (result.message === "unauthorized") {
        return res.json({
          status: "error",
          message: "You don't have permission for this action",
        });
      } else if (result.message === "invalid") {
        return res.json({
          status: "error",
          message: "An email has been typed which is invalid",
        });
      }

      return res.json({
        status: "success",
        message: "Assign new role success",
      });
    }
  },

  kickOutMember: async (req, res) => {
    const { userId, groupId, list } = req.params;

    const result = await groupDetailService.delete({
      ownerId: req.user._id,
      userId,
      groupId,
    });
    if (result) {
      if (result.message === "unauthorized") {
        return res.json({
          status: "error",
          message: "You don't have permission for this action!",
        });
      }
      return res.json({
        status: "success",
        message: "Deleting a member is successful!",
      });
    }
    return res.json({
      status: "error",
      message: "Removing a member is a failure",
    });
  },

  joinGroup: async (req, res) => {
    const { groupId } = req.body.data;

    const result = await groupDetailService.joinGroup({
      userId: req.user._id,
      groupId,
    });

    if (result) {
      if (result.message === "exist") {
        return res.json({
          status: "error",
          message: "You have already participated in group!",
        });
      }
      return res.json({
        status: "success",
        message: "Joining a group is successful!",
      });
    }
    return res.json({
      status: "error",
      message: "Joining a group is a failure",
    });
  },

  getMembers: async (req, res) => {
    const { groupId, type } = req.query;

    const data = await groupDetailService.findGroupByGroupId({ groupId, type });
    if (data) {
      return res.json({
        status: "success",
        message: "get group info success",
        members: data,
      });
    }

    return res.json({
      status: "error",
      message: "get group info failure",
    });
  },
  getInfoGroup: async (req, res) => {
    const { groupId } = req.params;

    const data = await groupDetailService.findGroup({ groupId });

    if (data) {
      return res.json({
        status: "success",
        message: "get group info success",
        group: data,
      });
    }

    return res.json({
      status: "error",
      message: "get group info failure",
    });
  },
};
