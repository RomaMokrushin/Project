import styled from "styled-components";

export const StyledInnerEmptyCard = styled.div`
  opacity: 0.7;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 5px dashed #007aff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;

export const StyledAddGroupText = styled.p`
  margin-top: 36px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #007aff;
`;

export const ModalRadioWrapper = styled.div`
  display: flex;
  user-select: none;
  flex-direction: column;
  gap: 10px;
`;

export const ModalRadioLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ModalRadioText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;

export const ModalRadio = styled.div<{ $isActive?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 8px solid #007aff;
  transition: border 0.3s;
  background: transparent;
  border-width: ${({ $isActive }) => ($isActive ? "8px" : "2px")};
`;
