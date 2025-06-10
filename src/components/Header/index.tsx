import { HeaderContainer } from "./styles";
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";
import igniteLogo from "../../assets/ignite-logo.svg";

export default function Header() {
  return (
    <HeaderContainer>
      <img src={igniteLogo} className="logo" />
      <nav>
        <NavLink to="/" title="Home">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
