var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
    date: {
        type: Date,
        required: "Please pick a date for your appointment.",
    },
    time: {
        type: String,
        required: "Please pick time for your appointment."
    },
    complain: {
        type: String,
        required: "Please specify your complain for us to better serve you..",
        minlength: [ 10, "Complain must be at least 10 characters.."],
    },
    _user: {type: Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

mongoose.model("Appointment", AppointmentSchema);
