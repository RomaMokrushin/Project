import styled from "styled-components";

export const StyledListRow = styled.div`
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  height: 100px;
  border-radius: 12px;
  background: #fff;
  display: grid;
  justify-content: space-between;
  grid-template-columns: 0.8fr 1fr 3fr;
  padding: 16px;
  align-items: center;
  gap: 16px;
  transition: box-shadow 0.3s ease;
  /* Shadows/Gray/1 Level */
  box-shadow: 0px 1px 3px 0px rgba(96, 108, 128, 0.05);

  &:hover {
    /* Shadows/Gray/2 Level */
    box-shadow: 0px 4px 12px rgb(0 122 255 / 30%);
  }
`;

export const Title = styled.h2`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
  max-width: 30%;
`;

export const NameBubble = styled.div`
  position: absolute;
  white-space: nowrap;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 10px;
  border-radius: 13px;
  color: #7a8699;
  text-decoration: none;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  background-color: #f3f4f6;
  border: 1px solid #7a8699;
  opacity: 0;
`;

export const UserGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: translateX(30px);
`;

export const UserWrapper = styled.div<{ $n: number; $noHover?: boolean }>`
  position: relative;
  width: 32px;
  height: 32px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border: 2px solid #f3f4f6;
  border-radius: 50%;

  transition: transform 0.3s ease;
  &:hover {
    ${NameBubble} {
      opacity: 1;
    }
  }

  ${({ $n }) =>
    $n &&
    `
  transform: translateX(calc(-10px * (${$n} - 1)));
      &:hover {
      transform: translateX(calc(-10px * (${$n} - 1))) translateY(-6px);
      z-index: 2;
      }
  `}

  ${({ $noHover }) =>
    $noHover &&
    `
     &:hover {
      transform: translateX(calc(-13.6px * 3));
      }
  `}
`;

export const ExtraUsers = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  display: grid;
  place-content: center;
  color: #606c80;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;

  /* Extra Bold/12 */
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px; /* 166.667% */
  border: 2px solid #606c80;
`;

export const Description = styled.p`
  color: #000205;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  flex-grow: 1;
  overflow: hidden; /* Prevent content overflow */

  display: -webkit-box; /* Necessary for line clamping */
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical; /* Set box orientation for clamping */
`;

export const BoldedText = styled.span`
  font-weight: 700;
`;
