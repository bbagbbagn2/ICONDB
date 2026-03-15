/**
 * 성능 모니터링 유틸리티
 * Web Vitals를 측정하여 이미지 최적화 효과 추적
 */

export const measureWebVitals = () => {
  // LCP (Largest Contentful Paint) - 로드 성능
  if ("PerformanceObserver" in window) {
    const observer = new PerformanceObserver((list) => {
      const latestEntry = list.getEntries().pop();
      console.log("LCP:", latestEntry.renderTime || latestEntry.loadTime);
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  }

  // CLS (Cumulative Layout Shift) - 레이아웃 안정성
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log("CLS:", clsValue);
      }
    });
  });
  clsObserver.observe({ type: "layout-shift", buffered: true });

  // FID (First Input Delay) - 상호작용 반응성
  const fidObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log("FID:", entry.processingDuration);
    });
  });
  fidObserver.observe({ type: "first-input", buffered: true });
};

/**
 * 이미지 로딩 성능 측정
 */
export const measureImageLoading = (imageSrc) => {
  const startTime = performance.now();

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      console.log(`Image load time (${imageSrc}): ${loadTime.toFixed(2)}ms`);
      resolve(loadTime);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${imageSrc}`);
      resolve(-1);
    };
    img.src = imageSrc;
  });
};

/**
 * 메모리 사용량 추적 (Chrome DevTools)
 */
export const trackMemoryUsage = () => {
  if ("memory" in performance) {
    const memory = performance.memory;
    console.log({
      totalJSHeapSize: `${(memory.totalJSHeapSize / 1048576).toFixed(2)}MB`,
      usedJSHeapSize: `${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB`,
      jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)}MB`,
    });
  }
};
