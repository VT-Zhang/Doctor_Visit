var app = angular.module("app", ["ngRoute", "ngCookies"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl:"partials/login.html"
    })
    .when("/dashboard", {
        templateUrl:"partials/dashboard.html"
    })
    .when("/new_appointment", {
        templateUrl:"partials/new.html"
    })
    .otherwise({
        templateUrl:"partials/login.html"
    });
});
