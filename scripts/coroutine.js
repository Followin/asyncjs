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

  var coroutine = Promise.coroutine(function * () {
    try {
      var values = yield Promise.all([ajax("GET", filesUrl), ajax("GET", usersUrl)]);
      console.log(values);
      var response = yield ajax("POST", serverUrl, values);
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  });

  coroutine();
});
