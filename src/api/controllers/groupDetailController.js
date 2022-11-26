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
    const { userIds, groupId } = req.body.data;

    const result = await groupDetailService.detachRole({ userIds, groupId });
    if (!result) {
      return res.json({
        status: "error",
        message: "Removing a member is a failure",
      });
    }
    return res.json({
      status: "success",
      message: "Deleting a member is successful",
    });
  },
};
