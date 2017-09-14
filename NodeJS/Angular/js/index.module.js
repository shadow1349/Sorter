angular.module('sorter', [
    'ngAria',
    'ngAnimate',
    'ngMessages',
    'ngMaterial',
    'ui.router'
])
.config(['$stateProvider', '$compileProvider', '$locationProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $compileProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider) {

    //Make sure we can sanitize 
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob|mailto|tel):|data:image\//);
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/index');

    $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('amber')
    .warnPalette('red')
    .backgroundPalette('grey');

    $stateProvider.state('app', {
        url: '/index',
        views: {
            templateUrl: '/index.html',
            controller: 'IndexController as vm'
        }
    });
}])
.factory('Sorter', ['$http', function($http) {
    return {
        GetAllItems : function() {
            return $http.get('/getAllItems');
        }
    }
}]);