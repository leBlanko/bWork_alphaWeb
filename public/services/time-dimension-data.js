angular.module('bWork_alphaWeb')
    .service(
        'timeDimensionData', [
            '$http',
            '$q',
            function(
                $http,
                $q
            ) {
                this.getTimeDimensions = function() {
                    var promise = $http.get('/timeDimension/');
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


                this.getTimeDimensionsByYearAndFirstAndLastDayByWeek = function(year) {
                    var promise = $http.get('/timeDimension/year/' + year);
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

                this.getTimeDimensionsByStartAndEndDateOfWeek = function(startDate, endDate) {
                    var promise = $http.get('/timeDimension/startDate/' + moment(startDate).format('YYYY-MM-DD') + '/endDate/' + moment(endDate).format('YYYY-MM-DD'));
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

            }
        ]
    );