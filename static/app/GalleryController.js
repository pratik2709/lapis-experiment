galleryapp.controller('GalleryController', GalleryController);

GalleryController.$inject = ['$scope', 'GalleryFactory'];

function GalleryController($scope, GalleryFactory) {
    var ctrl = this;
    var q = GalleryFactory.query();
    console.log(q);
    $scope.images = q;
}

