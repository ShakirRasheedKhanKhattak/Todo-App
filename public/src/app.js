angular.module('TodoApp', ['ngRoute', 'ngResource', 'ngMessages'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/todos', {
                controller: 'ListController',
                templateUrl: 'views/list.html'
            })
            .when('/todo/new', {
                controller: 'NewController',
                templateUrl: 'views/new.html'
            })
            .when('/todo/:id', {
                controller: 'ListController',
                // templateUrl: 'views/single.html'
                templateUrl: 'views/list.html'
            })
            // .when('/settings', {
            //     controller: 'SettingsController',
            //     templateUrl: 'views/settings.html'
            // })
            .otherwise({
                redirectTo: '/todos'   
            });
        $locationProvider.html5Mode(true);
    })
    .value('options', {})
    .run(function (options, Fields) {
        Fields.get().success(function (data) {
            options.displayed_fields = data;
        });
    });
