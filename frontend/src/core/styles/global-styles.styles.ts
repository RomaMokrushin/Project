"use client";

import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  position: relative;
  background: #f2f2f7;
  width: 100%;
  padding-left: 90px;
  min-height: 100vh;
`;

export const SignInContainer = styled.div`
  position: relative;
  background: #f2f2f7;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export function SkeletonStyles() {
  return css`
    background-color: ${({ theme }) => theme.colors.grey20};

    transform: translateY(-50%);
    animation: ${skeletonKeyframes} 3s ease-in-out infinite;
    background-image: linear-gradient(
      90deg,
      rgba(220, 220, 220, 0.2),
      rgba(200, 200, 200, 0.6),
      rgba(220, 220, 220, 0.2)
    );
  `;
}

export const darkSkeletonAnimation = css`
  background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0.5),
    rgba(200, 200, 200, 0.6),
    rgba(236, 236, 236, 0.5)
  );
  animation: ${skeletonKeyframes} 6s ease-in-out infinite;
`;
