const groupDetailService = require("../services/groupDetailService");

module.exports = {
  assignRole: async (req, res) => {
    const { ownerId, groupId, role, email } = req.body.data;
    const result = await groupDetailService.assignRole({
      ownerId,
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

  detachRole: async (req, res) => {
    const { ownerId, userIds, groupId } = req.body.data;

    const result = await groupDetailService.detachRole({
      ownerId,
      userIds,
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
    const { userId, groupId } = req.body.data;

    const result = await groupDetailService.joinGroup({ userId, groupId });

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
};
