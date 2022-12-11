const mongoose = require("mongoose");

const presentationSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const Presentation = mongoose.model("Presentation", presentationSchema);

module.exports = Presentation;
