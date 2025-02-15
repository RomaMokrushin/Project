"use client";

import { IconHandler } from "@/core/images/IconHandler";
import { UnderConstructionWrapper } from "./underConstruction.styles";
import { Icon } from "@/core/enums/Icon.enum";

export default function UnderConstructionClient() {
  return (
    <UnderConstructionWrapper>
      {IconHandler(Icon.UnderConstruction)}
    </UnderConstructionWrapper>
  );
}
