const SlideResult = require("../models/slideResultModel");

exports.getSlideResult = async (req, res) => {
    const slideResult = await SlideResult.find({ slideId: req.params.id });

    res.status(200).json({
        status: 'success',
        data: slideResult
    });
}

exports.createSlideResult = async (req, res) => {
    const newSlideResult = await SlideResult.create(req.body);

    res.status(201).json({
        status: "success",
        data: newSlideResult
    })
}
