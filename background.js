// Listen for when the extension is first installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Create a recurring alarm named "eyeReminder" that fires every 20 minutes
  chrome.alarms.create("eyeReminder", { periodInMinutes: 20 });
});

// Listen for alarms created by chrome.alarms API
chrome.alarms.onAlarm.addListener(() => {
  // Get the currently active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    for (let tab of tabs) {
      // Make sure the tab has a valid ID
      if (tab.id) {
        // Inject and execute a script in the active tab
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            // Send a postMessage to the webpage to trigger the eye break overlay
            window.postMessage({ type: "EYE_STRIKE" }, "*");
          }
        });
      }
    }
  });
});
