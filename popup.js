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

document.getElementById("copyTextOnlyButton").addEventListener("click", () => {
  console.log("copyTextOnlyButton clicked");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content_text_only.js"],
      },
      () => {
        console.log("content_text_only.js executed");
      }
    );
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.subtitles) {
    navigator.clipboard
      .writeText(message.subtitles)
      .then(() => {
        console.log("자막이 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("클립보드에 복사하는데 실패했습니다.", err);
      });
  }
});
