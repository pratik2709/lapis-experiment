galleryapp.factory("GalleryFactory", ["$resource", function ($resource) {
    return $resource('/newone/', {}, {
        save: {
            method: 'POST',
            url: '/newone/create/',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache"
            }
        },
        get: {
            method: 'GET'
        },
        query: {
            isArray: true
        }
    });
}]);

