import styled, { keyframes } from "styled-components";

// Keyframes
const swinging = keyframes`
  0% { transform: rotate(10deg); }
  50% { transform: rotate(-5deg); }
  100% { transform: rotate(10deg); }
`;

const sleeping = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

// Styled Component
export const UnderConstructionWrapper = styled.div`
  #swinger {
    transform-origin: top center;
    transform-box: fill-box;
    animation: ${swinging} 3.5s ease-in-out forwards infinite;
  }

  #zone {
    opacity: 0;
    animation: ${sleeping} 3.5s ease-in-out forwards infinite;
  }

  #ztwo {
    opacity: 0;
    animation: ${sleeping} 3.5s ease-in-out forwards infinite;
    animation-delay: 0.4s;
  }

  #zthree {
    opacity: 0;
    animation: ${sleeping} 3.5s ease-in-out forwards infinite;
    animation-delay: 0.7s;
  }

  #zfour {
    opacity: 0;
    animation: ${sleeping} 3.5s ease-in-out forwards infinite;
    animation-delay: 1s;
  }

  #zfive {
    opacity: 0;
    animation: ${sleeping} 3.5s ease-in-out forwards infinite;
    animation-delay: 1.3s;
  }

  .container {
    text-align: center;
    height: 100vh;
    display: grid;
    place-items: center;
  }

  svg {
    max-width: 1000px;
  }
`;
