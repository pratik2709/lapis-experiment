galleryapp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            name: 'Gallery home',
            controller: "GalleryController",
            templateUrl: "static/app/gallery.html"
        })
        .when("/red", {
            name: 'New',
            controller: "NewController1",
            templateUrl: "static/app/new.html"
        })
}]);
