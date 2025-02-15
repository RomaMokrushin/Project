import styled from "styled-components";

export const NavBarWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9ebf0;
`;

export const NotificationsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const RightSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-left: auto;
`;

export const BellWrapper = styled.div`
  position: relative;
  height: fit-content;
  cursor: pointer;
  svg,
  path {
    transition: fill 0.3s ease;
  }

  &:hover {
    svg,
    path {
      fill: #007aff !important;
    }
  }
`;

export const NotificationDot = styled.div`
  position: absolute;
  display: grid;
  place-content: center;
  top: -8px;
  right: -6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #007aff;
  color: #fff;
  text-align: center;
  font-size: 8px;
  font-family: Inter;
  font-weight: 700;
`;

export const ThemeSwitcher = styled.div`
  cursor: pointer;
  border-radius: 8px;
  padding: 8px;
  border: 1px solid #e7e7e7;
  background: #fff;
  display: grid;
  place-content: center;

  /* Shadows/Gray/1 Level */
  box-shadow: 0px 1px 3px 0px rgba(96, 108, 128, 0.05);
  transition: all 0.3s ease;
  svg,
  path {
    transition: fill 0.3s ease;
  }

  &:hover {
    border: 1px solid #007aff;

    svg,
    path {
      fill: #007aff !important;
    }
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0px auto;
`;

export const Link = styled.a`
  color: #98a2b2;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #007aff;
  }
`;

export const ActiveLink = styled.div`
  cursor: default;
  color: #007aff;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
