galleryapp.controller('GalleryController', GalleryController);

GalleryController.$inject = ['$scope', 'GalleryFactory'];

function GalleryController($scope, GalleryFactory) {
    var grid = document.querySelector('.grid');

    var msnry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    imagesLoaded(grid).on('progress', function () {
        // layout Masonry after each image loads
        msnry.layout();
    });

    var ctrl = this;
    var q = GalleryFactory.query();
    console.log(q);
    $scope.images = q;
}

