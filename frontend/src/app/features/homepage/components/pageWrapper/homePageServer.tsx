import { StyledHomepage } from "../../styles/homePage.styles";
import NavBarServer from "../../../common/navBar/navBarServer";

export default async function HomePageServer() {
  return (
    <StyledHomepage>
      <NavBarServer />
    </StyledHomepage>
  );
}
