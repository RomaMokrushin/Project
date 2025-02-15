import type { ReactNode } from "react";
import Card from "./Card";
import Clock from "./Clock";
import GridView from "./GridView";
import Invites from "./Invites";
import ListView from "./ListView";
import Lock from "./Lock";
import Settings from "./Settings";
import Spyglass from "./Spyglass";
import Statistics from "./Statistics";
import Transactions from "./Transactions";
import Logo from "./Logo";
import { Icon } from "../enums/Icon.enum";
import Bell from "./Bell";
import ThemePick from "./ThemePick";
import Plus from "./Plus";
import UnderConstruction from "./UnderConstruction";
import Logout from "./Logout";
import AddGroup from "./AddGroupPlus";
import SadFace from "./SadFace";
import Roupor from "./Roupor";
import Track from "./Track";
import Email from "./Email";
import Phone from "./Phone";
import CloseIcon from "./Close";
import Home from "./Home";
import WavingHand from "./WavingHand";
import ChevronDown from "./ChevronDown";
import EditInvite from "./EditInvite";
import Tick from "./Tick";
import Cross from "./Cross";
import Delete from "./Delete";
import Checkmark from "./Checkmark";
import Crossmark from "./Crossmark";
import ArrowLeft from "./ArrowLeft";
import Eye from "./Eye";

const iconMap: Record<Icon, ReactNode> = {
  [Icon.AddGroup]: <AddGroup />,
  [Icon.ArrowLeft]: <ArrowLeft />,
  [Icon.Bell]: <Bell />,
  [Icon.Card]: <Card />,
  [Icon.Clock]: <Clock />,
  [Icon.GridView]: <GridView />,
  [Icon.Invites]: <Invites />,
  [Icon.ListView]: <ListView />,
  [Icon.Lock]: <Lock />,
  [Icon.Settings]: <Settings />,
  [Icon.Spyglass]: <Spyglass />,
  [Icon.Statistics]: <Statistics />,
  [Icon.Transactions]: <Transactions />,
  [Icon.Logo]: <Logo />,
  [Icon.Logout]: <Logout />,
  [Icon.ThemeSwitcher]: <ThemePick />,
  [Icon.Plus]: <Plus />,
  [Icon.UnderConstruction]: <UnderConstruction />,
  [Icon.SadFace]: <SadFace />,
  [Icon.Roupor]: <Roupor />,
  [Icon.Track]: <Track />,
  [Icon.Email]: <Email />,
  [Icon.Phone]: <Phone />,
  [Icon.Close]: <CloseIcon />,
  [Icon.Home]: <Home />,
  [Icon.WavingHand]: <WavingHand />,
  [Icon.ChevronDown]: <ChevronDown />,
  [Icon.EditInvite]: <EditInvite />,
  [Icon.Tick]: <Tick />,
  [Icon.Cross]: <Cross />,
  [Icon.Delete]: <Delete />,
  [Icon.CheckMark]: <Checkmark />,
  [Icon.Crossmark]: <Crossmark />,
  [Icon.Eye]: <Eye />,
};

export function IconHandler(icon: Icon): ReactNode {
  return iconMap[icon] || null;
}
