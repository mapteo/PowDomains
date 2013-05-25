var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();


var trailing = function (question_mark_pos, url) {
  if ((question_mark_pos == -1) && (url.substring(url.length-1) != "/") ) {
    return 1;
  } else if ((question_mark_pos != -1) && (url.charAt(question_mark_pos-1) != "/")) {
    return 2;
  } else {
    return 0;
  }
}
var newurl;

var domain = document.domain.split('.');
var url = document.URL;

if (QueryString.q == undefined) {
  var google = "null"
} else {
  var google = QueryString.q;
}

var question_mark_pos = url.indexOf("?");
var trail = trailing (question_mark_pos, url);

if (( domain[domain.length-1] == 'dev')  && ( trail == 1 ))// if it matches pow url without slash char
{
  newurl = url + "/";
  chrome.extension.sendRequest({redirect: newurl});
}  else if (( domain[domain.length-1] == 'dev')  && ( trail == 2 )) {
  newurl = url.replace("?", "/?")
  chrome.extension.sendRequest({redirect: newurl});  
}  else if  (google.indexOf('.dev') > -1)  {
  newurl = "http://" + unescape(google);
  chrome.extension.sendRequest({redirect: newurl});
}
