var app = angular.module('bWork_alphaWeb');
app.run();

app.controller('HomeCtrl', ['$scope', '$cookieStore', '$window', '$http', 'toastr', '$auth', '$location', function($scope, $cookieStore, $window, $http, toastr, $auth, $location) {
    var loadJs = function(file) {
        // DOM: Create the script element
        var jsElm = document.createElement("script");
        // set the type attribute
        jsElm.type = "application/javascript";
        // make the script element load file
        jsElm.src = file;
        // finally insert the element to the body element in order to load the script
        document.body.appendChild(jsElm);
    }

    // loadJs("../assets/plugins/jquery-1.8.3.min.js");
    // loadJs("../assets/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js");
    // loadJs("../assets/plugins/boostrapv3/js/bootstrap.min.js");
    // loadJs("../assets/plugins/breakpoints.js");
    // loadJs("../assets/plugins/jquery-unveil/jquery.unveil.min.js");
    // loadJs("../assets/plugins/jquery-block-ui/jqueryblockui.js")
    // loadJs("../assets/plugins/jquery-slider/jquery.sidr.min.js")
    // loadJs("../assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js")
    // loadJs("../assets/plugins/pace/pace.min.js")
    // loadJs("../assets/plugins/jquery-numberAnimate/jquery.animateNumbers.js")
    // loadJs("../assets/js/core.js")
    // loadJs("../assets/js/chat.js")
    // loadJs("../assets/js/demo.js")

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

    $scope.user = $cookieStore.get('user').user;
}]);