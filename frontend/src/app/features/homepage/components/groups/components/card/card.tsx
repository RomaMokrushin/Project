"use client";

import { PartialUser } from "@/core/types";
import {
  AddUserWrapper,
  BoldedText,
  CardWrapper,
  Description,
  ExtraUsers,
  MoveWrapper,
  NameBubble,
  Title,
  TitleAndOwnerWrapper,
  UserGroupWrapper,
  UsersGroupTitle,
  UsersWrapper,
  UserWrapper,
} from "./card.styles";
import Avatar, { genConfig } from "react-nice-avatar";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  owner: PartialUser;
  admins: PartialUser[];
  members: PartialUser[];
  description: string;
  link: string;
};

export default function Card({
  title,
  owner,
  admins,
  link,
  members,
  description,
}: Props) {
  const calculatedTransformMembers = members.slice(0, 4).length;
  const router = useRouter();
  return (
    <CardWrapper
      onClick={() => {
        router.push(link);
      }}
    >
      <TitleAndOwnerWrapper>
        <Title>{title}</Title>
        <UserWrapper
          $n={0}
          onClick={(e) => {
            e.stopPropagation(); // Prevent CardWrapper click
            router.push(`/user/${owner.user_id}`);
          }}
        >
          <NameBubble>{owner.name}</NameBubble>
          <Avatar
            {...genConfig(owner.avatar)}
            style={{
              width: "46px",
              height: "46px",
              minHeight: "46px",
              minWidth: "46px",
            }}
          />
        </UserWrapper>
      </TitleAndOwnerWrapper>
      {admins.length > 0 && (
        <UserGroupWrapper>
          <UsersWrapper>
            {admins.slice(0, 4).map((admin, index) => (
              <UserWrapper
                key={admin.user_id}
                $n={index + 1}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent CardWrapper click
                  router.push(`/user/${admin.user_id}`);
                }}
              >
                <NameBubble>{admin.name}</NameBubble>
                <Avatar
                  {...genConfig(admin.avatar)}
                  style={{
                    width: "32px",
                    height: "32px",
                    minHeight: "32px",
                    minWidth: "32px",
                  }}
                />
              </UserWrapper>
            ))}
            {admins.length > 4 && (
              <UserWrapper $n={admins.slice(0, 4).length + 1} $noHover>
                <ExtraUsers>+{admins.length - 4}</ExtraUsers>
              </UserWrapper>
            )}
          </UsersWrapper>
          <MoveWrapper $n={admins.length}>
            <UsersGroupTitle>Администраторы</UsersGroupTitle>
          </MoveWrapper>
        </UserGroupWrapper>
      )}
      <UserGroupWrapper>
        <UsersWrapper>
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
        </UsersWrapper>
        <MoveWrapper $n={calculatedTransformMembers + 1}>
          <AddUserWrapper>{IconHandler(Icon.Plus)}</AddUserWrapper>
        </MoveWrapper>
        <MoveWrapper $n={calculatedTransformMembers + 1}>
          <UsersGroupTitle>Участники</UsersGroupTitle>
        </MoveWrapper>
      </UserGroupWrapper>
      <Description>
        <BoldedText>О группе: </BoldedText>
        {description}
      </Description>
    </CardWrapper>
  );
}
