angular.module('bWork_alphaWeb', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer', 'ngCookies', 'oitozero.ngSweetAlert', 'ui.select', 'angularMoment'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {

    $stateProvider
      .state('handleWeek', {
        url: '/handleWeek',
        controller: 'HandleWeekCtrl',
        templateUrl: 'views/handleWeek.html',
      })
      .state('handleTemplate', {
        url: '/handleTemplate',
        controller: 'HandleTemplateCtrl',
        templateUrl: 'views/handleTemplate.html',
      })
      .state('addSup', {
        url: '/addSup',
        controller: 'AddSupCtrl',
        templateUrl: 'views/addSup.html'
      })
      .state('editWeek', {
        url: '/editWeek',
        controller: 'EditWeekCtrl',
        templateUrl: 'views/editWeek.html'
      })
      .state('exportPDF', {
        url: '/exportPDF',
        controller: 'ExportPDFCtrl',
        templateUrl: 'views/exportPDF.html'
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

    $urlRouterProvider.otherwise('/handleWeek');


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