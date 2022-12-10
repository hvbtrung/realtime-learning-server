const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 30,
      require: true
    },
    shortDesc: {
      type: String,
      maxLength: 40
    },
    photo: {
      type: String,
      default: "https://gstatic.com/classroom/themes/img_read.jpg",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
