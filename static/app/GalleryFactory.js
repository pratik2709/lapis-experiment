galleryapp.factory("GalleryFactory", ["$resource", function ($resource) {
    return $resource('/newone/', {}, {
        save: {
            method: 'POST'
        },
        get: {
            method: 'GET'
        },
        query: {
            isArray: true
        }
    });
}]);

