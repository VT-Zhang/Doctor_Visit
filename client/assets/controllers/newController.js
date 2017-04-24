app.controller("newController", ["$scope", "mainFactory", "$location", "$cookies", function($scope, mainFactory, $location, $cookies){

    var index = function() {
        if(!$cookies.get("user_id")){
            $location.url("/");
        };
        $scope.appt = {};
        $scope.today = new Date().toISOString().split("T")[0];
        console.log($scope.today);
    }
    index();

    $scope.create = function(){
        $scope.appt._user = $cookies.get("user_id");
        console.log($scope.appt);
        mainFactory.create($scope.appt, function(data){
            console.log(data);
            if(data.errors){
                console.log(data.errors);
                $scope.errors = data.errors;
                index();
            }
            else{
                $scope.errors = [];
                $location.url("/dashboard");
            }
        })
    }

}]);
