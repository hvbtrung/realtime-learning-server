const GroupPresentationSlide = require("../models/groupPresentationSlideModel");

exports.getGroupPresentationSlide = async (req, res) => {
    const presentationId = req.params.presentationId;
    const groupId = req.params.groupId;
    const groupPresentationSlide = await GroupPresentationSlide.findOne({ presentationId, groupId }).populate("currentSlideId");

    res.status(200).json({
        status: 'success',
        data: groupPresentationSlide
    });
}

exports.createGroupPresentationSlide = async (req, res) => {
    const newGroupPresentationSlide = await GroupPresentationSlide.create(req.body);

    res.status(201).json({
        status: "success",
        data: newGroupPresentationSlide
    })
}

exports.updateGroupPresentationSlide = async (req, res) => {
    const presentationId = req.params.presentationId;
    const groupId = req.params.groupId;
    const updatedGroupPresentationSlide = await GroupPresentationSlide.findOneAndUpdate({ presentationId, groupId }, req.body, {
        new: true
    });

    res.status(200).json({
        status: 'success',
        data: updatedGroupPresentationSlide
    });
}

exports.deleteGroupPresentationSlide = async (req, res) => {
    const presentationId = req.params.presentationId;
    const groupId = req.params.groupId;
    const deletedGroupPresentationSlide = await GroupPresentationSlide.findOneAndDelete({ presentationId, groupId });

    res.status(204).json({
        status: 'success',
        data: null
    });
}
