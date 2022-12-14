require('dotenv').config({ path: './.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../api/models/userModel');
const Group = require('../api/models/groupModel');
const GroupDetail = require('../api/models/groupDetailModel');
const Presentation = require('../api/models/presentationModel');
const Slide = require('../api/models/slideModel');

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

const importData = async () => {
    try {
        await User.create(users, { validateBeforeSave: false });
        await Group.create(groups, { validateBeforeSave: false });
        await GroupDetail.create(groupDeltails, { validateBeforeSave: false });
        await Presentation.create(presentations, { validateBeforeSave: false });
        await Slide.create(slides, { validateBeforeSave: false });
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
