console.log("timestamp/content.js");

(function () {
  const scriptButton = document.querySelector(
    'button[aria-label="스크립트 표시"]'
  );

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

    if (transcriptContainer) {
      // 자막 세그먼트가 로드될 때까지 기다리는 MutationObserver를 생성합니다.
      const observer = new MutationObserver((mutations, obs) => {
        const transcriptSegments = document.querySelectorAll(
          "ytd-transcript-segment-renderer"
        );
        if (transcriptSegments.length > 0) {
          let subtitles = Array.from(transcriptSegments).map((segment) => {
            const time = segment
              .querySelector(".segment-timestamp")
              .textContent.trim();
            const text = segment
              .querySelector(".segment-text")
              .textContent.trim();
            return { time, text };
          });

          console.log(subtitles);

          // 더 이상의 변화를 감시할 필요가 없으므로 observer를 해제합니다.
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
  } else {
    console.error("스크립트 표시 버튼을 찾을 수 없습니다.");
  }
})();

// (function () {
//   const scriptButton = document.querySelector(
//     'button[aria-label="스크립트 표시"]'
//   );

//   // 자막 세그먼트를 처리하는 함수입니다.
//   const processTranscriptSegments = () => {
//     const transcriptSegments = document.querySelectorAll(
//       "ytd-transcript-segment-renderer"
//     );
//     if (transcriptSegments.length > 0) {
//       let subtitles = Array.from(transcriptSegments).map((segment) => {
//         const time = segment
//           .querySelector(".segment-timestamp")
//           .textContent.trim();
//         const text = segment.querySelector(".segment-text").textContent.trim();
//         return { time, text };
//       });

//       console.log(subtitles);
//     }
//   };

//   // MutationObserver 인스턴스를 생성합니다.
//   const observer = new MutationObserver((mutations, obs) => {
//     processTranscriptSegments();
//   });

//   // '스크립트 표시' 버튼 클릭 이벤트 리스너를 추가합니다.
//   if (scriptButton) {
//     scriptButton.addEventListener("click", () => {
//       // XPath를 사용하여 자막 세그먼트가 포함된 컨테이너를 찾습니다.
//       const xpath =
//         '//*[@id="panels"]/ytd-engagement-panel-section-list-renderer[5]';
//       const transcriptContainer = document.evaluate(
//         xpath,
//         document,
//         null,
//         XPathResult.FIRST_ORDERED_NODE_TYPE,
//         null
//       ).singleNodeValue;

//       if (transcriptContainer) {
//         // 자막 세그먼트가 포함될 것으로 예상되는 요소를 관찰합니다.
//         observer.observe(transcriptContainer, {
//           childList: true,
//           subtree: true,
//         });
//       } else {
//         console.error("자막 세그먼트 컨테이너를 찾을 수 없습니다.");
//       }
//     });
//   } else {
//     console.error("스크립트 표시 버튼을 찾을 수 없습니다.");
//   }

//   // 페이지 로드 시 자막 세그먼트가 이미 있는지 확인하고, 있다면 즉시 처리합니다.
//   processTranscriptSegments();
// })();
