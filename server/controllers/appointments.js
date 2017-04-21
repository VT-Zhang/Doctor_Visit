var mongoose = require("mongoose");
var User = mongoose.model("User");
var Appointment = mongoose.model("Appointment");

module.exports = {

    index: function(req, res){
        Appointment.find({})
        .populate("_user")
        .exec(function(err, appointments){
            console.log(appointments);
            if(err){
                return res.json({errors: err.errors});
            }
            return res.json(appointments);
        });
    },

    create: function(req, res){
        User.findOne({_id: req.body._user}, function(err, user){
            if(err){
                return res.json({errors: err.errors});
            }
            Appointment.find({date: req.body.date}, function(err, appointments){
                if(err){
                    return res.json({errors: err.errors});
                }
                if(appointments.length >= 3){
                    return res.json({errors: {errors: {message: "The appointments have been all booked for that day, pick another day.."}}});
                }
                Appointment.find({date: req.body.date, _user: req.body._user}, function(err, appointment){
                    if(err){
                        return res.json({errors: err.errors});
                    }
                    if(appointment.length >= 1){
                        return res.json({errors: {errors: {message: "Your have booked for that day, pick another day.."}}});
                    }
                    else {
                        Appointment.create(req.body, function(err, newapp){
                            if(err){
                                return res.json({errors: err.errors});
                            }
                            user.appointments.push(newapp);
                            user.save(function(err){
                                if(err){
                                    return res.json({errors: err.errors});
                                }
                            });
                            return res.json(newapp);
                        });
                    }
                });
            });
        });
    },

    destroy: function(req, res){
        Appointment.remove({_id: req.params.id}, function(err, appointment){
            if(err){
                return res.json({errors: err.errors});
            }
            return res.json(appointment);
        });
    },

}
