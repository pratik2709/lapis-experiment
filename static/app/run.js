galleryapp.run(["$http", "$location", function ($http, $location) {
    $http.defaults.xsrfCookieName = "csrftoken";
    $http.defaults.xsrfHeaderName = "X-CSRFToken";
}]);