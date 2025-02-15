"use client";

import { PartialUser } from "@/core/types";
import {
  BoldedText,
  Description,
  ExtraUsers,
  NameBubble,
  StyledListRow,
  Title,
  UserGroupWrapper,
  UserWrapper,
} from "./list-row.styles";
import Avatar, { genConfig } from "react-nice-avatar";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  members: PartialUser[];
  description: string;
  link: string;
};

export default function ListRow({ title, members, description, link }: Props) {
  const router = useRouter();

  return (
    <StyledListRow
      onClick={() => {
        router.push(link);
      }}
    >
      <UserGroupWrapper>
        {members.slice(0, 4).map((member, index) => (
          <UserWrapper
            key={member.user_id}
            $n={index + 1}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/user/${member.user_id}`);
            }}
          >
            <NameBubble>{member.name}</NameBubble>
            <Avatar
              {...genConfig(member.avatar)}
              style={{
                width: "32px",
                height: "32px",
                minHeight: "32px",
                minWidth: "32px",
              }}
            />
          </UserWrapper>
        ))}
        {members.length > 4 && (
          <UserWrapper $n={members.slice(0, 4).length + 1} $noHover>
            <ExtraUsers>+{members.length - 4}</ExtraUsers>
          </UserWrapper>
        )}
      </UserGroupWrapper>
      <Title>{title}</Title>
      <Description>
        <BoldedText>О группе: </BoldedText>
        {description}
      </Description>
    </StyledListRow>
  );
}
