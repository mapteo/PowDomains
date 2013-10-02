chrome.webRequest.onBeforeRequest.addListener(
  function(info) {  
    var vars = [], hash;
    var href = info.url;
    var hashes = href.slice(href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }  
    newurl = "http://" + unescape(vars.q);
    if (newurl != undefined) {
      return {redirectUrl: newurl};
    }
  },
  // filters
  {
    urls: [
      "*://*/search?*q=*.dev*"
    ]
  },
  // extraInfoSpec
  ["blocking"]);