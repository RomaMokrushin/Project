"use client";

import SquigglyLine from "@/core/images/SquigglyLine";
import {
  AuthorWrapper,
  AuthorDescription,
  AuthorDescriber,
  AuthorNameWrapper,
  AuthorAvatarWrapper,
  AuthorName,
  AuthorSurname,
  AuthorNominalWrapper,
} from "./groupOwner.styles";
import { Group } from "@/core/types";
import Avatar, { genConfig } from "react-nice-avatar";
import SquigglyLineReversed from "@/core/images/SquigglyLineReversed";

type Props = {
  owner: Group["owner"];
};

export default function GroupOwner({ owner }: Props) {
  const firstName = owner?.name.split(" ")[0];
  const lastName = owner?.name.split(" ")?.[1];

  return (
    <AuthorWrapper>
      <AuthorDescription>
        <AuthorDescriber>Автор:</AuthorDescriber>
        <AuthorAvatarWrapper>
          <Avatar
            key={owner?.user_id}
            style={{
              width: "90px",
              height: "90px",
              minHeight: "90px",
              minWidth: "90px",
            }}
            {...genConfig(owner?.avatar)}
          />
        </AuthorAvatarWrapper>
      </AuthorDescription>
      <AuthorNameWrapper>
        <AuthorNominalWrapper>
          <AuthorName>{firstName}</AuthorName>
          <SquigglyLine />
        </AuthorNominalWrapper>
        <AuthorNominalWrapper $isSecond>
          <SquigglyLineReversed />
          <AuthorSurname>{lastName}</AuthorSurname>
        </AuthorNominalWrapper>
      </AuthorNameWrapper>
    </AuthorWrapper>
  );
}
