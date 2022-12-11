const mongoose = require("mongoose");

const slideTypeSchema = new mongoose.Schema({
    name: {
        type: String,
    }
});

const SlideType = mongoose.model("SlideType", slideTypeSchema);

module.exports = SlideType;
