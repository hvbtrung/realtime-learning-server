const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const groupSchema = new Schema(
  {
    // _id: { type: Number },
    name: { type: String, maxLength: 30, require: true },
    shortDesc: { type: String, maxLength: 40 },
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

// groupSchema.plugin(AutoIncrement); // set auto increment for id

module.exports = mongoose.model("Group", groupSchema);
