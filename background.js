// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.set({ reloadTime: 10, reloadCount: 0 }, () => {
//         console.log("Extension installed, default values set.");
//     });
// });

// chrome.storage.sync.get(["reloadTime"], (data) => {
//     let reloadTime = data.reloadTime || 10; // Default to 10 if not set
//     if (!isNaN(reloadTime) && reloadTime > 0) {
//         chrome.alarms.create("reloadYouTube", { periodInMinutes: reloadTime / 60 });
//     } else {
//         console.error("Invalid reload time:", reloadTime);
//     }
// });

// chrome.alarms.onAlarm.addListener((alarm) => {
//     if (alarm.name === "reloadYouTube") {
//         chrome.storage.sync.get(["reloadCount"], (data) => {
//             if (data.reloadCount < 5) {
//                 chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//                     if (tabs.length > 0 && tabs[0].url.includes("youtube.com/watch")) {
//                         chrome.tabs.reload(tabs[0].id);
//                         chrome.storage.sync.set({ reloadCount: data.reloadCount + 1 });
//                     }
//                 });
//             } else {
//                 chrome.alarms.clear("reloadYouTube");
//                 console.log("Reload limit reached, stopping auto-reload.");
//             }
//         });
//     }
// });
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ reloadCount: 0 }, () => {
        console.log("Extension installed, reload count reset.");
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"]
        });
    }
});
