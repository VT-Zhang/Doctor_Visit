var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = {
    create: function(req, res){
        User.findOne({name: req.body.name}, function(err, user){
            console.log(req.body.name);
            if(err){
                return res.json({errors: err.errors});
            }
            if(!user){
                User.create(req.body, function(err, newuser){
                    if(err){
                        return res.json({errors: err.errors});
                    }
                    return res.json(newuser);
                });
            }
            else {
                return res.json(user);
            }
        });
    },
}
