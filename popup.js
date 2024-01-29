document.getElementById("copyButton").addEventListener("click", () => {
  console.log("copyButton clicked");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"],
      },
      () => {
        console.log("content.js executed");
      }
    );
  });
});
