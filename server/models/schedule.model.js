const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    activity: {
        type: String,
        required: [true, "Activity is required"],
        minlength: [3, "Activity must be 3 characters or longer"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [6, "Description must be 6 characters or longer"]
    },
    start: {
        type: Date,
        required: [true, "Start is required"]
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
        min: [0, "Duration cannot be less than 0"]
    },
    units: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("Schedule", ScheduleSchema);