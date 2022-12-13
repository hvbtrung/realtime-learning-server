const Slide = require("../models/slideModel");

exports.getSlides = async (req, res) => {
    let filter = {};
    if (req.params.presentationId) {
        filter = { presentationId: req.params.presentationId }
    }

    const slides = await Slide.find(filter);

    res.status(200).json({
        status: 'success',
        results: slides.length,
        data: slides
    });
}

exports.getSlide = async (req, res) => {
    const slide = await Slide.findById(req.params.id);

    if (!slide) {
        const err = new Error("No slide found with that ID");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: 'success',
        data: slide
    });
}

exports.createSlide = async (req, res) => {
    const newSlide = await Slide.create(req.body);

    res.status(201).json({
        status: "success",
        data: newSlide
    })
}

exports.updateSlide = async (req, res) => {
    const updatedSlide = await Slide.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedSlide) {
        const err = new Error("No slide found with that ID");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: 'success',
        data: updatedSlide
    });
}

exports.deleteSlide = async (req, res) => {
    const deletedSlide = await Slide.findByIdAndDelete(req.params.id);

    if (!deletedSlide) {
        const err = new Error("No slide found with that ID");
        err.statusCode = 404;
        throw err;
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}
