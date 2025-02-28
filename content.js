chrome.storage.sync.get(["reloadTime","reloadCount"],(data) => {
    if(data.reloadCount < 5 ){
        setTimeout(() => {
            location.reload();
            chrome.storage.sync.set({reloadCount: data.reloadCount+1});
        },data.reloadTime*1000);
    }
});