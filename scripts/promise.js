define(['bluebird'], function(Promise) {
  var filesUrl = "http://584c3a2620f2751200e5d4ca.mockapi.io/files";
  var usersUrl = "http://584c3a2620f2751200e5d4ca.mockapi.io/users";
  var serverUrl = "http://fakeendpoint.com";

  function ajax(method, url, data) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.addEventListener('load', function() {
        if(this.status >= 200 && this.status < 300) {
          resolve(this.response);
        } else {
          reject({
            status: this.status,
            statusText: this.statusText
          });
        }
      });

      xhr.addEventListener('error', function() {
        reject({status: 0, statusText: "Unable to complete GET: on " + url});
      });

      xhr.send(data);
    });
  }

  Promise.all([ajax("GET", filesUrl), ajax("GET", usersUrl)])
    .then(function(data) {
      console.log(data);
      return ajax("POST", serverUrl, data);
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
});
