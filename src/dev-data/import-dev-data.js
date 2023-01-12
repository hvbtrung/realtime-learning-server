require('dotenv').config({ path: './.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../api/models/userModel');
const Group = require('../api/models/groupModel');
const GroupDetail = require('../api/models/groupDetailModel');
const Presentation = require('../api/models/presentationModel');
const Slide = require('../api/models/slideModel');
const GroupPresentationSlide = require('../api/models/groupPresentationSlideModel');
const Message = require('../api/models/messageModel');
const Question = require('../api/models/questionModel');
const QuestionVote = require('../api/models/questionVoteModel');
const SlideResult = require('../api/models/slideResultModel');
const UserPresentation = require('../api/models/userPresentationModel');

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => console.log(err));

const users = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, 'utf-8'));
const groups = JSON.parse(fs.readFileSync(`${__dirname}/groups.json`, 'utf-8'));
const groupDeltails = JSON.parse(fs.readFileSync(`${__dirname}/groupdetails.json`, 'utf-8'));
const presentations = JSON.parse(fs.readFileSync(`${__dirname}/presentations.json`, 'utf-8'));
const slides = JSON.parse(fs.readFileSync(`${__dirname}/slides.json`, 'utf-8'));
const grouppresentationslides = JSON.parse(fs.readFileSync(`${__dirname}/grouppresentationslides.json`, 'utf-8'));
const messages = JSON.parse(fs.readFileSync(`${__dirname}/messages.json`, 'utf-8'));
const questions = JSON.parse(fs.readFileSync(`${__dirname}/questions.json`, 'utf-8'));
const questionvotes = JSON.parse(fs.readFileSync(`${__dirname}/questionvotes.json`, 'utf-8'));
const slideresults = JSON.parse(fs.readFileSync(`${__dirname}/slideresults.json`, 'utf-8'));
const userpresentations = JSON.parse(fs.readFileSync(`${__dirname}/userpresentations.json`, 'utf-8'));

const importData = async () => {
    try {
        await User.create(users, { validateBeforeSave: false });
        await Group.create(groups, { validateBeforeSave: false });
        await GroupDetail.create(groupDeltails, { validateBeforeSave: false });
        await Presentation.create(presentations, { validateBeforeSave: false });
        await Slide.create(slides, { validateBeforeSave: false });
        await GroupPresentationSlide.create(grouppresentationslides, { validateBeforeSave: false });
        await Message.create(messages, { validateBeforeSave: false });
        await Question.create(questions, { validateBeforeSave: false });
        await QuestionVote.create(questionvotes, { validateBeforeSave: false });
        await SlideResult.create(slideresults, { validateBeforeSave: false });
        await UserPresentation.create(userpresentations, { validateBeforeSave: false });
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

const deleteData = async () => {
    try {
        await User.deleteMany();
        await Group.deleteMany();
        await GroupDetail.deleteMany();
        await Presentation.deleteMany();
        await Slide.deleteMany();
        await GroupPresentationSlide.deleteMany();
        await Message.deleteMany();
        await Question.deleteMany();
        await QuestionVote.deleteMany();
        await SlideResult.deleteMany();
        await UserPresentation.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
