var app = angular.module('bWork_alphaWeb');
app.run();

app.controller('HomeCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', 'templateData', function($scope, $cookieStore, $window, $http, toastr, $auth, $location, templateData) {

    $scope.logout = function() {

        if (!$auth.isAuthenticated()) {
            return;
        }
        $auth.logout()
            .then(function() {
                $cookieStore.remove("user");
                toastr.info('You have been logged out');
                $location.path('/login');
            });

    }

    //$scope.user = $cookieStore.get('user').user;
}]);