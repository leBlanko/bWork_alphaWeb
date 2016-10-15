angular.module('bWork_alphaWeb')
    .service(
        'dayData', [
            '$http',
            '$q',
            function(
                $http,
                $q
            ) {
                this.getDays = function() {
                    var promise = $http.get('/days/');
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



                this.getDayById = function(id) {
                    var promise = $http.get('/day/' + id + '/');
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

                this.create = function(day) {
                    var promise = $http.post('/day/', day);
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
                    var promise = $http.delete('/day/' + id + '/');
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