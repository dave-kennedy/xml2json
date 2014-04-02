var jLoader = (function () {
    // ECMAScript 5 strict mode
    'use strict';

    var jloader = {
        // The options parameter is an object that can have any of the following members:
        // url: The location of the file on the server; REQUIRED
        // success: The function to perform if the request is a success; REQUIRED
        // failure: The function to perform if the request is a failure; default: none
        // method: The type of request; default: GET
        // allowCache: True to allow caching or false to disallow; default: false
        // images: An object of objects - one for each image to display at each phase phase of the AJAX request.
        //         Each object in the images object must have the following members:
        //         path: The file path to the image
        //         attach: The id of an element to attach the image to
        ajax: function (options) {
            if (!options.url) {
                console.error('No url parameter supplied for jLoader.ajax');

                return false;
            }

            if (!options.success) {
                console.error('No success parameter supplied for jLoader.ajax');

                return false;
            }

            if (!options.failure) {
                options.failure = function () {};
            }

            if (!options.method) {
                options.method = 'GET';
            }

            if (!options.allowCache) {
                options.url = options.url + '?t=' + Math.random();
            }

            function attachImage(readyState) {
                if (!options.images) {
                    return false;
                }

                if (!options.images[readyState]) {
                    return false;
                }

                document.getElementById(options.images[readyState].attach).innerHTML += '<img src="' + options.images[readyState].path + '" />';
            }

            var httpRequest;

            try {
                httpRequest = new XMLHttpRequest();
                attachImage('unsent');

                httpRequest.open(options.method, options.url, true);
                attachImage('opened');

                httpRequest.send();
            } catch (err) {
                options.failure(err);
                attachImage('failure');

                return false;
            }

            httpRequest.onreadystatechange = function () {
                if (httpRequest.status === 404) {
                    options.failure('The requested URI was not found: ' + options.url);
                    attachImage('failure');

                    this.onreadystatechange = null;

                    return false;
                }

                if (httpRequest.readyState === 2) {
                    attachImage('received');
                } else if (httpRequest.readyState === 3) {
                    attachImage('loading');
                } else if (httpRequest.readyState === 4) {
                    options.success(httpRequest.responseText);
                    attachImage('success');

                    return true;
                }
            };
        }
    };

    return jloader;
}());
