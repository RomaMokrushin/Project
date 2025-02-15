import styled from "styled-components";

export const StyledEmailAndEditDataWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

export const StyledEmailPhoneWrapperData = styled.a`
  text-decoration: none;
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const SvgWrapper = styled.div`
  display: grid;
  place-items: center;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background-color: #4182f910;
  svg {
    width: 24px;
    height: 24px;
  }
`;
export const StyledEmailPhoneBlock = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

export const StyledBlockTitle = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledEmailPhoneText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const LeftBlocksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const RightBlocksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const CheckBoxWrapper = styled.label<{ $isEditable: boolean }>`
  .knob,
  .btn-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .btn {
    position: relative;

    min-width: 74px;
    width: 74px;
    height: 36px;
    overflow: hidden;
  }

  .btn.btn-pill,
  .btn.btn-pill > .btn-bg {
    border-radius: 100px;
  }

  .btn.btn-rect {
    border-radius: 2px;
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knob {
    z-index: 2;
  }

  .btn-bg {
    width: 100%;
    background-color: #4182f950;
    border: 2px solid #4182f9;
    transition: 0.3s ease all;
    z-index: 1;
  }

  /* Button 1 */
  #button-1 .knob:before {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #4182f9;
    border-radius: 50%;
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
  }

  #button-1 .checkbox:checked + .knob:before {
    content: "";
    left: 42px;
    background-color: #f44336;
  }

  #button-1 .checkbox:checked ~ .btn-bg {
    background-color: #fcebeb;
    border-color: #f44336;
  }

  #button-1 .knob,
  #button-1 .knob:before,
  #button-1 .btn-bg {
    transition: 0.3s ease all;
  }

  display: flex;
  cursor: not-allowed;
  gap: 16px;
  opacity: 0.5;
  align-items: center;
  user-select: none;

  ${({ $isEditable }) =>
    $isEditable &&
    `
    cursor: pointer;
    opacity: 1;
  `}
`;

export const StyledCheckboxDescription = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  max-width: 120px;
`;
