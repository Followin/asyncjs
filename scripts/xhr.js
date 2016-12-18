define([], function() { 
  var filesUrl = "http://584c3a2620f2751200e5d4ca.mockapi.io/files";
  var usersUrl = "http://584c3a2620f2751200e5d4ca.mockapi.io/users";
  var serverUrl = "http://fakeendpoint.com";

  // create 2 xhr requests
  var filesXhr = new XMLHttpRequest();
  filesXhr.open("GET", filesUrl);

  var usersXhr = new XMLHttpRequest();
  usersXhr.open("GET", usersUrl);

  // get both results into array
  var requests = [filesXhr, usersXhr];
  var result = [];
  var doneNumber = 0;

  requests.forEach(function(request, i) {
    request.onload = function() {
      if(this.status >= 200 && this.status < 300) {
        result[i] = this.response;
        if(++doneNumber == requests.length) {
          console.dir(result);

          var xhr = new XMLHttpRequest();
          xhr.open("POST", serverUrl);

          xhr.addEventListener('load', function() {
            console.log(this.response);
          });

          xhr.addEventListener('error', function() {
            console.log("error occured");
          });

          xhr.send();

        }

      } else {
        console.log("fail occured");
      }
    };

    request.onerror = function() {
      console.log("fail occured");
    };

    request.send();
  });
});
