angular.module('bWork_alphaWeb')
    .service(
        'userData', [
            '$http',
            '$q',
            function(
                $http,
                $q
            ) {
                this.getUsers = function() {
                    var promise = $http.get('/users/');
                    var deferred = $q.defer();

                    promise.then(
                        function(data) {
                            deferred.resolve(data);
                        },
                        function() {
                            deferred.reject();
                        }
                    );

                    return deferred.promise;
                };



                this.getUserById = function(id) {
                    var promise = $http.get('/user/' + id + '/');
                    var deferred = $q.defer();

                    promise.then(
                        function(data) {
                            deferred.resolve(data);
                        },
                        function() {
                            deferred.reject();
                        }
                    );

                    return deferred.promise;
                };

                this.create = function(user) {
                    var promise = $http.post('/user/', user);
                    var deferred = $q.defer();

                    promise.then(
                        function(data) {
                            deferred.resolve(data);
                        },
                        function() {
                            deferred.reject();
                        }
                    );

                    return deferred.promise;
                };

                this.delete = function(id) {
                    var promise = $http.delete('/user/' + id + '/');
                    var deferred = $q.defer();

                    promise.then(
                        function(data) {
                            deferred.resolve(data);
                        },
                        function() {
                            deferred.reject();
                        }
                    );

                    return deferred.promise;
                }
            }
        ]
    );