var tracklist = ["0:05", "0:08", "0:18", "0:21"];

var observer = new MutationObserver(function(mutations){
  mutations.forEach(function(mutation){
    var time = mutation.addedNodes[1].innerText;
    console.log(time);
      if (tracklist.includes(time)){
      console.log('match');
      chrome.runtime.sendMessage(time);
    }
  });
});

var observerConfig = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
};

// Declare nodes to watch
var targetUrl = document.getElementsByClassName('playbackSoundBadge__title')[0].firstElementChild.href;
var targetText = document.getElementsByClassName('playbackSoundBadge__title')[0].firstElementChild.title;

var timePassed = document.getElementsByClassName('playbackTimeline__timePassed')[0];
var timeDuration = document.getElementsByClassName('playbackTimeline__duration')[0].lastChild.innerText;

observer.observe(timePassed, observerConfig);
