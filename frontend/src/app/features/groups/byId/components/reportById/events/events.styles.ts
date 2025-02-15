import styled from "styled-components";

export const EventsWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-direction: column;
`;

export const StyledEvent = styled.div`
  border-radius: 12px;
  border: 2px solid #007aff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const AllEventsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  flex-wrap: wrap;
`;

export const BlockTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const StyledEventTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const EventData = styled.div`
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  justify-content: space-around;
  gap: 16px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Divider = styled.div`
  height: 100%;
  min-height: 10px;
  width: 2px;
  background-color: #007aff;
`;

export const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const ItemContent = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ItemContentItem = styled.li`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const UserWrapper = styled.a`
  display: flex;
  width: 20%;
  align-items: center;
  gap: 8px;
  position: relative;
  &:after {
    content: "";
    background: none repeat scroll 0 0 transparent;
    bottom: -6px;
    background: #7a8699;
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  &:hover:after {
    width: 100%;
    left: 0;
  }
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const PaindText = styled.div`
  width: 20%;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const IsParticipantWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IsParticipantText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const IconWrapper = styled.div`
  max-width: 16px;
  max-height: 16px;
`;

export const ParticipantsWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

export const ParticipantWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 12px;
  border: 2px solid #007aff;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007aff;
    ${UserName} {
      color: white;
    }
  }
`;

export const StyledTotal = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TotalItem = styled.li`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const TotalTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const TotalMoney = styled(TotalTitle)`
  font-style: italic;
  font-weight: 700;
`;
