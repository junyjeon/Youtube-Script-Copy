console.log("timestamp/content.js");

(function () {
  // '스크립트 표시' 버튼을 찾습니다.
  const scriptButton = document.querySelector(
    'button[aria-label="스크립트 표시"]'
  );

  // 버튼이 존재하면 클릭 이벤트를 발생시킵니다.
  if (scriptButton) {
    scriptButton.click();
    // 버튼 클릭 후 자막이 로드될 시간을 기다립니다.
    setTimeout(() => {
      let transcriptSegments = document.querySelectorAll(
        "ytd-transcript-segment-renderer"
      );
      let subtitles = Array.from(transcriptSegments).map((segment) => {
        const time = segment
          .querySelector(".segment-timestamp")
          .textContent.trim();
        const text = segment.querySelector(".segment-text").textContent.trim();
        return { time, text };
      });

      // 콘솔에 결과를 출력합니다.
      console.log(subtitles);
    }, 1000); // 1초 후에 자막 데이터를 처리합니다. 필요에 따라 시간을 조정하세요.
  } else {
    console.error("스크립트 표시 버튼을 찾을 수 없습니다.");
  }
})();
