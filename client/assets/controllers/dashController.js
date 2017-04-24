app.controller("dashController", ["$scope", "mainFactory", "$location", "$cookies", function($scope, mainFactory, $location, $cookies){

    $scope.user_name = $cookies.get("user_name");
    $scope.today = new Date().toISOString().split("T")[0]+"T04:00:00.000Z";
    console.log($scope.today);

    var index = function(){
        if(!$cookies.get("user_id")){
            $location.url("/");
        };
        mainFactory.dashIndex(function(data){
            $scope.appointments = data;

        });
        $scope.user_name = $cookies.get("user_name");
    }
    index();

    $scope.delete = function(id){
        mainFactory.delete(id, function(data){
            if(data.errors){
                console.log(data.errors);
                $scope.errors = data.errors;
            }
            else{
                $scope.errors = [];
            }
            index();
        });
    }

    $scope.logout = function(){
        $cookies.remove("user_id");
        $cookies.remove("user_name");
        $location.url("/");
    }
}]);
