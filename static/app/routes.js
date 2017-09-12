galleryapp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            name: 'Gallery home',
            controller: "GalleryController",
            templateUrl: "static/app/gallery.html"
        })
        .when("/aboutme", {
            name: 'New',
            controller: "NewController1",
            templateUrl: "static/app/new.html"
        })
        .when("/admin", {
            name: 'Admin',
            controller: "AdminController",
            templateUrl: "static/app/admin/admin.html"
        })
}]);
