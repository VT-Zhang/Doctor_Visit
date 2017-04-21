var mongoose = require("mongoose");
var users = require("./../controllers/users.js");
var appointments = require("./../controllers/appointments.js");

module.exports = function(app){
    app.post("/users", function(req, res){
        users.create(req, res);
    });

    app.get("/dashboard", function(req, res){
        appointments.index(req, res);
    });

    app.post("/appointments", function(req, res){
        appointments.create(req, res);
    });

    app.delete("/appointments/:id", function(req, res){
        appointments.destroy(req, res);
    });

}
