const mongoose = require("mongoose");

const groupPresentationSlideSchema = new mongoose.Schema(
    {
        presentationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Presentation"
        },
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        },
        currentSlideId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slide"
        },
    },
    {
        timestamps: true,
    }
);

const GroupPresentationSlide = mongoose.model("GroupPresentationSlide", groupPresentationSlideSchema);

module.exports = GroupPresentationSlide;
