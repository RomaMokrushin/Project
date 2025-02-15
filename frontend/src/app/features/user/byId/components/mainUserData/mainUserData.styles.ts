import styled from "styled-components";

export const StyledMainUserDataWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  img,
  picture,
  .avatar {
    border-radius: 90px;
    border: 2px solid #868282;
  }
`;

export const StyledMainUserNameAndEmail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledName = styled.h1`
  color: #000;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledCreationDate = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 0.5;
`;

export const StyledInputsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const StyledEditUserName = styled.input`
  width: 150px;
  height: 32px;
  padding: 0 8px;
  background-color: #f5f5f5;
  outline: none;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
  border-bottom: 2px solid #868282;
`;

export const StyledEditUserSurname = styled.input`
  width: 150px;
  height: 32px;
  padding: 0 8px;
  background-color: #f5f5f5;
  outline: none;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
  border-bottom: 2px solid #868282;
`;
