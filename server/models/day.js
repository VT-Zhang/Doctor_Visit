var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DaySchema = new Schema({
    date: {type: Date},
    app_counter: {
        type: Number,
        default: 0,
        max: 3,
    },
    appointments: [{type: Schema.Types.ObjectId, ref: "Appointment"}],
    users: [{type: Schema.Types.ObjectId, ref: "User"}],
}, {timestamps: true});

mongoose.model("Day", DaySchema);
