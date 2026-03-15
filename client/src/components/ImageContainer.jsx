import React from "react";
import styled from "styled-components";
import OptimizedImage from "./OptimizedImage";

export default function ImageContainer({
  width = 250,
  height = 250,
  src,
  alt,
  borderRadius,
  border,
  fallbackSrc = null,
  blur = true,
}) {
  return (
    <Container
      style={{
        width: width && typeof width === "number" ? `${width}px` : width,
        height: height && typeof height === "number" ? `${height}px` : height,
        border: border || "none",
        borderRadius: borderRadius || "0",
      }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={typeof width === "number" ? width : 250}
        height={typeof height === "number" ? height : 250}
        fallbackSrc={fallbackSrc}
        blur={blur}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
