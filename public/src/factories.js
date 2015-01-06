angular.module('TodoApp')
    .factory('Contact', function ($resource) {
        return $resource('/api/todo/:id', { id: '@id' }, {
            'update': { method: 'PUT' }
        });
    })
    .factory('Fields', function ($q, $http, Contact) {
        var url = '/options/displayed_fields',
            ignore = ['firstName', 'lastName', 'id', 'userId'],
            allFields = [],
            deferred = $q.defer(),

            todos = Contact.query(function () {
                todos.forEach(function (c) {
                    Object.keys(c).forEach(function (k) {
                        if (allFields.indexOf(k) < 0 && ignore.indexOf(k) < 0) allFields.push(k);
                    });
                });
                deferred.resolve(allFields);
            });

        return {
            get: function () {
                return $http.get(url);
            },
            set: function (newFields) {
                return $http.post(url, { fields: newFields });
            },
            headers: function () {
                return deferred.promise;
            }
        };
    });
