const mongoose = require("mongoose");

const slideResultSchema = new mongoose.Schema(
    {
        presentationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Presentation",
        },
        slideId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slide",
        },
        user: {
            type: String
        },
        choice: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const SlideResult = mongoose.model("SlideResult", slideResultSchema);

module.exports = SlideResult;
