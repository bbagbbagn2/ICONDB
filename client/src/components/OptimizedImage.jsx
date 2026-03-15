import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

/**
 * OptimizedImage Component
 * 이미지 최적화 기능:
 * - Lazy loading (Intersection Observer)
 * - WebP 형식 지원 + Fallback
 * - 이미지 크기별 srcSet 생성
 * - 로딩 중 블러 플레이스홀더
 * - 이미지 로딩 에러 처리
 */

const supportsWebP = (() => {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  return canvas.toDataURL("image/webp").startsWith("data:image/webp");
})();

const buildSrcSet = (url, widths = [400, 800, 1200]) => {
  const withoutExt = url.replace(/\.[^/.]+$/, "");
  const ext = url.match(/\.[^/.]+$/)?.[0] ?? "";
  return widths.map((w) => `${withoutExt}-${w}w${ext} ${w}w`).join(", ");
};

const buildWebPSrcSet = (url, widths = [400, 800, 1200]) => {
  const withoutExt = url.replace(/\.[^/.]+$/, "");
  return widths.map((w) => `${withoutExt}-${w}w.webp ${w}w`).join(", ");
};

const OptimizedImage = React.forwardRef(
  (
    {
      src,
      alt = "",
      width = 250,
      height = 250,
      blur = true,
      fallbackSrc = null,
      srcSetWidths = [400, 800, 1200],
      sizes = "100vw",
      onLoad,
      onError,
      ...props
    },
    ref,
  ) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const wrapperRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
      const target = wrapperRef.current;
      if (!target) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(target);
          }
        },
        {
          rootMargin: "50px",
          threshold: 0.01,
        },
      );

      observer.observe(target);
      return () => observer.disconnect();
    }, [src]);

    const handleImageLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleImageError = () => {
      if (fallbackSrc && imageSrc !== fallbackSrc) {
        setImageSrc(fallbackSrc);
      } else {
        setHasError(true);
      }
      onError?.();
      console.error(`Failed to load image: ${src}`);
    };

    return (
      <ImageWrapper ref={ref} {...props}>
        {imageSrc && !hasError ? (
          <picture>
            {supportsWebP && (
              <source
                srcSet={buildWebPSrcSet(imageSrc, srcSetWidths)}
                sizes={sizes}
                type="image/webp"
              />
            )}
            <StyledImg
              ref={imgRef}
              src={imageSrc}
              srcSet={buildSrcSet(imageSrc, srcSetWidths)}
              sizes={sizes}
              alt={alt}
              onLoad={handleImageLoad}
              onError={handleImageError}
              $isLoaded={isLoaded}
              $blur={blur && !isLoaded}
              loading="lazy"
              width={width}
              height={height}
            />
          </picture>
        ) : !hasError ? (
          <BlurPlaceholder $blur={blur} width={width} height={height} />
        ) : null}

        {/* 에러 상태 */}
        {hasError && (
          <ErrorFallback width={width} height={height}>
            <p>이미지 로드 실패</p>
          </ErrorFallback>
        )}
      </ImageWrapper>
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background: #f0f0f0;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  filter: ${(props) => (props.$blur ? "blur(10px)" : "blur(0px)")};
  transition: filter 0.3s ease-out;

  opacity: ${(props) => (props.$isLoaded ? 1 : 0.7)};
  transition: opacity 0.3s ease-out;
`;

const BlurPlaceholder = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ErrorFallback = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 12px;
  text-align: center;
  padding: 1rem;
`;

export default OptimizedImage;
