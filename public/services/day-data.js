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

                this.getDayByDayAndMonthAndYear = function(day, month, year) {
                    var promise = $http.get('/day/' + day + '/month/' + month + '/year/' + year + '/');
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

                this.getDaysByFirstAndLastDay = function(first_day_year, last_day_year, first_day_month, last_day_month, first_day_day, last_day_day) {
                    var promise = $http.get('/day/' + first_day_year + '/' + last_day_year + '/' + first_day_month + '/' + last_day_month + '/' + first_day_day + '/' + last_day_day + '/');
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


                this.update = function(day) {
                    console.log(day);
                    var promise = $http.put('/day/' + day.minSup + '/id/' + day.id);
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