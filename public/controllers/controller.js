var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/register", {
            templateUrl : "/views/register.html"
        })
        .when("/home", {
            templateUrl : "/views/home.html"
        })
        .when("/login", {
            templateUrl : "/views/login.html"
        })
        .when("/products", {
        templateUrl : "/views/products.html"
    })
});

app.controller("mainCTRL",function ($scope,$window,$location,$timeout) {

    // test if the token is there
    if($window.localStorage.getItem('token')){
        $scope.logMsg = " Redirecting You to login page ... ";
        $timeout(function () {
            $scope.logMsg = ""
        },2000);
        $timeout(function () {

            $location.path("/products")
        },2000)
    }
    else{
        $scope.logMsg = "Please login to lauch the Auctions"
    }

    $scope.logout = function () {
        $window.localStorage.removeItem('token');
        $scope.logMsg = " Please wait loging you out ... ";
        $timeout(function () {
            $scope.logMsg = ''
            $location.path("/home");
        },2000);
    }


});









app.controller("userCTRL", function($scope,$http,$timeout,$location) {

    $scope.myFunc = function () {

        $http.post("/api/users",{
            username : $scope.username ,
            password  : $scope.password,
            email : $scope.email
        }).then(function (data) {
            $scope.message = data.data.message ;
            console.log($scope.message);

            $timeout(function () {

                $location.path('/');
            },2000);
        })
    }
});

app.controller("loginCTRL", function($scope,$http,$timeout,$location,$window) {

    $scope.login = function () {

        $http.post("/api/authenticate",{
            username : $scope.username ,
            password  : $scope.password
        }).then(function (data) {

            $scope.message = data.data.message;
            $scope.success = data.data.success ;
            $scope.token = data.data.token ;
            $window.localStorage.setItem('token',$scope.token)
            $scope.storage = $window.localStorage.getItem('token');
            if($scope.success){
                $timeout(function () {


                    $location.path('/products');
                },2000);
            }
            else{
                $location.path('/login');
            }

        })
    }
});


app.controller("productsCTRL",function ($scope,$http) {
    $http.get("api/findProducts").then(function (data) {
        $scope.list = data.data ;


    })
})






