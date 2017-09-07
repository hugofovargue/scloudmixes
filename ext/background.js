// query API, then use data


function listen(){
  chrome.runtime.onMessage.addListener(
    function(message, sender, senderResponse) {
      updatePopup(message);
    }
  );
}

function updatePopup(msg){
  // perform query
  chrome.runtime.sendMessage()
}

function isSoundcloudUrl(url) {
  let scloudurl = "https://soundcloud.com/"
  return url.startsWith(scloudurl);
}

listen();
