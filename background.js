chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({reloadTime:1,reloadCount:0});
});
chrome.alarms.onAlarm.addListener((alarm)=>{
    if(alarm.name == "reloadYouTube"){
        chrome.storage.sync.get(["reloadCount"],(data) => {
            if(data.reloadCount<5){
                chrome.tabs.query({
                    active:true,currentWindow:true},(tabs) => {
                    if(tabs.length >0 && tabs[0].url.includes("youtube.com/watch")){
                        chrome.tabs.reload(tabs[0].id);
                        chrome.storage.sync.set({reloadCount:data.reloadCount+1});
                    }
                });
            }else{
                chrome.alarms.clear("reloadYouTube");
            }
        });
    }
});
chrome.storage.sync.get(["reloadYouTube"],(data) => {
    chrome.alarms.create("reloadYouTube",{periodInMinutes: data.reloadTime/60});
});