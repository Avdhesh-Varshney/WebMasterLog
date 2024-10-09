chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    timerEndTime: 0,
    timerMinutes: 0,
    youtubeTabId: null,
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message);

  if (message.action === "startTimer") {
    chrome.storage.local.get(["timerMinutes"], (data) => {
      const timerMilliseconds = data.timerMinutes * 60000;
      const endTime = Date.now() + timerMilliseconds;

      chrome.storage.local.set({ timerEndTime: endTime }, () => {
        chrome.alarms.create("sessionAlarm", { when: endTime });
        console.log(
          "Timer started for",
          data.timerMinutes,
          "minutes. Alarm set for",
          new Date(endTime).toLocaleTimeString()
        );

        // Store the current tab ID as the YouTube tab ID
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
            chrome.storage.local.set({ youtubeTabId: tabs[0].id });
            console.log("YouTube tab ID stored:", tabs[0].id);
          }
        });
      });
    });
  } else if (message.action === "getRemainingTime") {
    chrome.storage.local.get(["timerEndTime"], (data) => {
      const remainingTime = Math.max(0, data.timerEndTime - Date.now());
      sendResponse({ remainingTime });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "sessionAlarm") {
    chrome.storage.local.get(["youtubeTabId"], (data) => {
      console.log("Attempting to close tab with ID:", data.youtubeTabId);
      if (data.youtubeTabId) {
        chrome.tabs.remove(data.youtubeTabId, () => {
          console.log("Tab closed");
          // Reset the youtubeTabId to null
          chrome.storage.local.set({ youtubeTabId: null });
        });
      } else {
        console.log("No YouTube tab ID found");
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "resetTimer") {
    chrome.alarms.clear("sessionAlarm"); // Clear the current timer
    chrome.storage.local.set({
      timerEndTime: 0,
      youtubeTabId: null,
    });
    console.log("Timer reset.");
  }
});