angular.module('bWork_alphaWeb', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer', 'ngCookies', 'oitozero.ngSweetAlert'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'views/home.html',
        /*resolve: {
          loginRequired: loginRequired
        }*/
      })
      .state('handleWeek', {
        url: '/handleWeek',
        controller: 'HandleWeekCtrl',
        templateUrl: 'views/handleWeek.html',
        /*resolve: {
          loginRequired: loginRequired
        }*/
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })

    $urlRouterProvider.otherwise('/');


    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      console.log($auth.isAuthenticated());
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }

  });