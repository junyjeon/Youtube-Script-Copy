console.log("timestamp/content.js");

(function () {
  const scriptButton = document.querySelector(
    "button.yt-spec-button-shape-next"
  );

  console.log(scriptButton);
  if (scriptButton) {
    scriptButton.click();

    // XPath를 사용하여 자막 세그먼트가 포함된 컨테이너를 찾습니다.
    const xpath =
      '//*[@id="panels"]/ytd-engagement-panel-section-list-renderer[5]';
    const transcriptContainer = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    console.log(transcriptContainer);
    if (transcriptContainer) {
      // 이미 로드된 자막 세그먼트가 있는지 확인하고 처리합니다.
      const transcriptSegments = document.querySelectorAll(
        "ytd-transcript-segment-renderer"
      );
      if (transcriptSegments.length > 0) {
        processTranscriptSegments(transcriptSegments);
      }

      // 자막 세그먼트가 로드될 때까지 기다리는 MutationObserver를 생성합니다.
      const observer = new MutationObserver((mutations, obs) => {
        const transcriptSegments = document.querySelectorAll(
          "ytd-transcript-segment-renderer"
        );
        if (transcriptSegments.length > 0) {
          processTranscriptSegments(transcriptSegments);
          obs.disconnect();
        }
      });

      // 자막 세그먼트가 포함될 것으로 예상되는 요소를 관찰합니다.
      observer.observe(transcriptContainer, {
        childList: true,
        subtree: true,
      });
    } else {
      console.error("자막 세그먼트 컨테이너를 찾을 수 없습니다.");
    }
  }
})();

function processTranscriptSegments(transcriptSegments) {
  let subtitles = Array.from(transcriptSegments).map((segment) => {
    const time = segment.querySelector(".segment-timestamp").textContent.trim();
    const text = segment.querySelector(".segment-text").textContent.trim();
    return { time, text };
  });

  // 자막 데이터를 문자열로 변환합니다.
  let subtitlesText = subtitles
    .map((sub) => `${sub.time} ${sub.text}`)
    .join("\n");

  // console.log(subtitles);
  console.log(subtitlesText);
  chrome.runtime.sendMessage({ subtitles: subtitlesText, textOnly: textOnly });
}
