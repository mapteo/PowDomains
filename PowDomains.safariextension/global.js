/*
var qPattern = /^.*q=(.*)&ie.*$/;
var q = qPattern.exec(window.location.search);

if(q && q[1] && q[1].indexOf('.dev') > -1) {
  newurl = "http://" + unescape(q[1]);
  window.location.href = newurl;  
}*/

safari.application.addEventListener("beforeSearch", function(event) {

  if (event.query && event.query.indexOf('.dev') > -1) {
    // Prevent Safari from search
    event.preventDefault();

    var newurl = "http://" + event.query;
    event.target.url = newurl;
  }
}, true);

