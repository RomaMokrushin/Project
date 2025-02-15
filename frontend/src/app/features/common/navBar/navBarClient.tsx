"use client";

import { useState } from "react";
import {
  ActiveLink,
  BellWrapper,
  Link,
  LinksWrapper,
  NavBarWrapper,
  NotificationDot,
  RightSideWrapper,
  ThemeSwitcher,
} from "./styles/navBar.styles";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import GlobalSearchClient from "./components/GlobalSearch/globalSearchClient";

type Props = {
  notifications?: number;
  links?: {
    name: string;
    url: string;
    active: boolean;
  }[];
};

export default function NavBarClient({ notifications, links }: Props) {
  const [isSeanNotification, setIsSeanNotification] = useState(false);

  return (
    <NavBarWrapper>
      <GlobalSearchClient />
      <LinksWrapper>
        {links &&
          links.map((link) => {
            if (link.active) {
              return <ActiveLink key={link.name}>{link.name}</ActiveLink>;
            }
            return (
              <Link key={link.name} href={link.url}>
                {link.name}
              </Link>
            );
          })}
      </LinksWrapper>
      <RightSideWrapper>
        <BellWrapper onClick={() => setIsSeanNotification(true)}>
          {IconHandler(Icon.Bell)}
          {!isSeanNotification && notifications && notifications > 0 && (
            <NotificationDot>{notifications}</NotificationDot>
          )}
        </BellWrapper>
        <ThemeSwitcher>{IconHandler(Icon.ThemeSwitcher)}</ThemeSwitcher>
      </RightSideWrapper>
    </NavBarWrapper>
  );
}
