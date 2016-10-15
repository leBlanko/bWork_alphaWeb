angular.module('bWork_alphaWeb')
    .service(
        'templateData', [
            '$http',
            '$q',
            function(
                $http,
                $q
            ) {
                this.getTemplates = function() {
                    var promise = $http.get('/templates/');
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



                this.getTemplateById = function(id) {
                    var promise = $http.get('/template/' + id + '/');
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

                this.create = function(template) {
                    var promise = $http.post('/template/', template);
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
                    var promise = $http.delete('/template/' + id + '/');
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