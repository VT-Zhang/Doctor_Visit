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
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        today = mm+'/'+dd+'/'+yyyy;
        Appointment.findOne({_id: req.params.id}, function(err, appointment){
            if(err){
                return res.json({errors: err.errors});
            }
            if ((appointment.date - today) < 1){
                return res.json({errors: {errors: {message: "Sorry, you can't cancel your appointment the same day of your appointment."}}});
            }
            else {
                Appointment.remove({_id: req.params.id}, function(err, appointment){
                   if(err){
                       return res.json({errors: err.errors});
                   }
                   else {
                       return res.json(appointment);
                   }
               });
            }
        });
    },

}
