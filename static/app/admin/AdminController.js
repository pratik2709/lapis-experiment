galleryapp.controller('AdminController', AdminController);

AdminController.$inject = ['$scope', 'GalleryFactory'];

function AdminController($scope, GalleryFactory) {
    var ctrl = this;

    $scope.add = function () {
        var file = document.getElementById('file').files[0];
        console.log("document.getElementById('file').files");
        console.log(document.getElementById('file').files);
        var file_reader = new FileReader();

        file_reader.onloadend = function (readerEvent) {

            var file_data = create_form_data(file, function (file_dat) {
                upload_to_s3('https://s3.ap-south-1.amazonaws.com/pallavi-images/', file_dat)
            });
            //post data to backend
            console.log(file.name);
            // GalleryFactory.save({
            //     name: Math.random().toString(36).substring(7),
            //     description: Math.random().toString(36).substring(7),
            //     url: 'https://s3.ap-south-1.amazonaws.com/pallavi-images/' + file.name},
            //     function () {
            //     console.log("inside success of gallery save");
            // });


            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://127.0.0.1:8080/newone/create/",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache"
                },
                "data": {
                    name: Math.random().toString(36).substring(7),
                    description: Math.random().toString(36).substring(7),
                    url: file.name
                }
            }).done(function (response) {
                console.log("success");
                console.log(response);
            });

            var image = new Image();
            image.onload = function (imageEvent) {
                resize_image(image, file.name);
            };
            image.src = readerEvent.target.result;
        };

        file_reader.readAsDataURL(file);
    }
    ;

    function create_form_data(file, callback) {
        var form_data = new FormData();
        form_data.append('key', file.name);
        form_data.append('acl', 'bucket-owner-full-control');
        form_data.append('Content-Type', file.type);
        form_data.append("file", file);
        callback(form_data);
    }

    function upload_to_s3(url, fd) {
        $.ajax({
            type: 'POST',
            url: url,
            data: fd,
            processData: false,
            contentType: false,
            success: function (json) {
                console.log('Upload complete!');

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('Upload error: ' + XMLHttpRequest.responseText);
            }
        });
    }

    function resize_image(image, filename) {
        // Resize the image
        var canvas = document.createElement('canvas'),
            max_size = 300,// TODO : pull max size from a site config
            width = image.width,
            height = image.height;
        if (width > height) {
            if (width > max_size) {
                height *= max_size / width;
                width = max_size;
            }
        } else {
            if (height > max_size) {
                width *= max_size / height;
                height = max_size;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        var resizedImage = dataURLToBlob(dataUrl);


        construct_form_data_again(dataURLToBlob(dataUrl), filename, function (file_dat) {
            upload_to_s3('https://s3.ap-south-1.amazonaws.com/pallavi-images/', file_dat)
        });
    }

    function construct_form_data_again(resized_file, filename, callback) {
        var form_data = new FormData();
        form_data.append('key', "thumbnails/" + filename);
        form_data.append('acl', 'bucket-owner-full-control');
        form_data.append('Content-Type', resized_file.type);
        form_data.append("file", resized_file);
        callback(form_data);
    }

    /* Utility function to convert a canvas to a BLOB */
    var dataURLToBlob = function (dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) === -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = parts[1];

            return new Blob([raw], {type: contentType});
        }

        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
    }

}
