document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("reset").addEventListener("click", () => {
        chrome.storage.sync.set({ reloadCount: 0 }, () => {
            alert("Reload count reset!");
        });
    });
});
