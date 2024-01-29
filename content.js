console.log("timestamp/content.js");

// 모든 자막 세그먼트 요소를 선택합니다.
const transcriptSegmentsList = document.querySelectorAll(
  "ytd-transcript-segment-renderer"
);

// 각 세그먼트의 정보를 추출합니다.
const subtitles = Array.from(transcriptSegmentsList).map((segment) => {
  // 시간 정보를 찾습니다.
  const time = segment.querySelector(".segment-timestamp").textContent.trim();
  // 자막 텍스트를 찾습니다.
  const text = segment.querySelector(".segment-text").textContent.trim();
  // 시간 정보와 자막 텍스트를 객체로 반환합니다.
  return { time, text };
});

// 콘솔에 결과를 출력합니다.
console.log(subtitles);
