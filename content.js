// chrome.storage.sync.get(["reloadTime", "reloadCount"], (data) => {
//     if (data.reloadCount < 5) {
//         setTimeout(() => {
//             location.reload();
//             chrome.storage.sync.set({ reloadCount: data.reloadCount + 1 });
//         }, data.reloadTime * 1000);
//     } else {
//         console.log("Reload limit reached, stopping.");
//     }
// });
chrome.storage.sync.get(["reloadCount"], (data) => {
    let count = data.reloadCount || 0;

    if (count < 5) {
        setTimeout(() => {
            location.reload();
            chrome.storage.sync.set({ reloadCount: count + 1 });
        }, 200);
    } else {
        console.log("Reload limit reached, stopping.");
    }
});
