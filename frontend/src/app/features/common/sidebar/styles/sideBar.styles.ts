import styled from "styled-components";

export const LogoWrapper = styled.a`
  padding: 30px 24px;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid #007aff;

  svg {
    min-height: 48px;
    min-width: 48px;
  }
`;

export const AppName = styled.h1`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 91.667% */
`;

export const MenuWrapper = styled.div`
  padding: 0 24px;
  padding-bottom: 32px;

  border-bottom: 1px solid #e9ebf0;
  height: 100%;
  margin-bottom: 32px;
`;

export const UserWrapper = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 0;
  border-bottom: 1px solid #e9ebf0;
`;

export const NavTextWrapper = styled.div`
  position: relative;
  white-space: nowrap;
  &:after {
    content: "";
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    background: black;
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
`;

export const StyledLogOut = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  margin-bottom: 32px;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  &:hover {
    ${NavTextWrapper}:after {
      width: 100%;
      left: 0;
    }
  }
  svg {
    max-width: 20px;
    max-height: 20px;
  }
`;

export const StyledUserName = styled.span`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;

  /* Bold/12 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
`;

export const StyledNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 24px;
`;

export const MenuItem = styled.a<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 16px;

  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  height: 20px;
  &:hover {
    ${NavTextWrapper}:after {
      width: 100%;
      left: 0;
    }
  }

  svg {
    max-width: 20px;
    max-height: 20px;
    min-width: 20px;
    min-height: 20px;
  }
`;

export const Notification = styled.span`
  margin-left: auto;
  display: grid;
  place-content: center;
  height: 24px;
  padding: 5px 8.5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background: rgba(0, 122, 255, 0.1);
  color: #007aff;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;

  /* Extra Bold/10 */
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 800;
  line-height: 12px; /* 160% */
`;

export const StyledSideBarWrapper = styled.div`
  cursor: pointer;
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 232px;
  top: 0;
  left: 0;
  background-color: #fff;
  transition: width 0.3s ease 0s;
  overflow: hidden;
  border-right: 1px solid #e9ebf0;
  box-shadow: 4px 0px 18px 5px rgba(0, 0, 0, 0.05);
  z-index: 1000;

  @media (max-width: 1840px) {
    width: 90px;
    ${MenuItem},
    ${StyledLogOut} {
      justify-content: center;
    }
    ${AppName},
    ${NavTextWrapper},
    ${StyledUserName},
    ${Notification} {
      display: none;
    }
    &:hover {
      width: 232px;
      ${AppName},
      ${StyledUserName},
      ${NavTextWrapper},
      ${Notification} {
        display: block;
      }
      ${MenuItem},
      ${StyledLogOut} {
        justify-content: unset;
      }
    }
  }
`;
