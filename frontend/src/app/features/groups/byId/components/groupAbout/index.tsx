import type { Group } from "@/core/types";
import { GroupDescriptionText } from "../../styles/groupsById.styles";
import GroupOwner from "../groupOwner";
import {
  StyledGroupDescription,
  GroupDescriptionAndTitleWrapper,
  StyledGroupTitle,
  GroupDescription,
  BoldedGroupDescription,
  StyledGroupTitleWrapper,
} from "./groupAbout.styles";
type Props = {
  group: Group;
  isOwner: boolean;
};

export default function GroupAbout({ group, isOwner }: Props) {
  return (
    <StyledGroupDescription>
      <GroupDescriptionAndTitleWrapper>
        <StyledGroupTitleWrapper $isOwner={isOwner}>
          <StyledGroupTitle>{group?.name}</StyledGroupTitle>
        </StyledGroupTitleWrapper>
        <GroupDescription>
          <BoldedGroupDescription>О группе:</BoldedGroupDescription>
          <GroupDescriptionText>{group?.about}</GroupDescriptionText>
        </GroupDescription>
      </GroupDescriptionAndTitleWrapper>
      <GroupOwner owner={group?.owner} />
    </StyledGroupDescription>
  );
}
