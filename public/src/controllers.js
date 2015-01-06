angular.module('TodoApp')
    .controller('ListController', function ($scope, $rootScope, Contact, $location, options, $routeParams) {
        $rootScope.PAGE = "all";
        $scope.todos = Contact.query();
        // $scope.fields = ['firstName', 'lastName'].concat(options.displayed_fields);
        $scope.fields = ['myTodo'];

        $scope.sort = function (field) {
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };

        // $scope.sort.field = 'firstName';
        $scope.sort.field = 'myTodos';
        $scope.sort.order = false;

        $scope.show = function (id) {
            // $location.url('/todo/' + id);
            $location.url('/todo/'+id);
        };

        $scope.todo = Contact.get({ id: parseInt($routeParams.id, 10) }); 
        $scope.delete = function () {
            $scope.todo.$delete();
            $location.url('/todos');
        };
        // $scope.delete = function (req, res) {
        //     db.delete(req.dbQuery, function () {
        //         res.json(null);
        //     });
        // };
    })
    .controller('NewController', function ($scope, $rootScope, Contact, $location) {
        $rootScope.PAGE = "new";
        // $scope.todo = new Contact({
        //     firstName: ['', 'text'],
        //     lastName:  ['', 'text'],
        //     email:     ['', 'email'],
        //     homePhone: ['', 'tel'],
        //     cellPhone: ['', 'tel'],
        //     birthday:  ['', 'date'],
        //     website:   ['', 'url'],
        //     address:   ['', 'text']
        // });
        $scope.todo = new Contact({
            myTodo: ['', 'text']
        });

        $scope.save = function () {
            if ($scope.newContact.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                $scope.todo.$save();
                $location.url('/todos');
            }
        };
    });

    // .controller('SingleController', function ($scope, $rootScope, $location, Contact, $routeParams) {
    //     $rootScope.PAGE = "single";
    //     $scope.todo = Contact.get({ id: parseInt($routeParams.id, 10) }); 
    //     $scope.delete = function () {
    //         $scope.todo.$delete();
    //         $location.url('/todos');
    //     };
    // })
    // .controller('SettingsController', function ($scope, $rootScope, options, Fields) {
    //     $rootScope.PAGE = 'settings';
        
    //     $scope.allFields = [];
    //     $scope.fields = options.displayed_fields;

    //     Fields.headers().then(function (data) {
    //         $scope.allFields = data;
    //     });

    //     $scope.toggle = function (field) {
    //         var i = options.displayed_fields.indexOf(field);

    //         if (i > -1) {
    //             options.displayed_fields.splice(i, 1);
    //         } else {
    //             options.displayed_fields.push(field); 
    //         }

    //         Fields.set(options.displayed_fields);
    //     };
    // });
