chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("eyeReminder", { periodInMinutes: 20 }); 
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    for (let tab of tabs) {
      if (tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            window.postMessage({ type: "EYE_STRIKE" }, "*");
          }
        });
      }
    }
  });
});
