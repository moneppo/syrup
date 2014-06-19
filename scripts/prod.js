var static = require('node-static');

var fileServer = new static.Server('./build');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) { // There was an error serving the file
                console.log("Error serving " + request.url + " - " + err.message);

                // Respond to the client
                response.writeHead(err.status, err.headers);
                response.write("Not found");
                response.end();
            }
        });
    }).resume();
}).listen(8080);

console.log("Server now running on http://localhost:8080");

