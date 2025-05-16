// File to only define types
import "styled-components";
import { defaultTheme } from "styled-components";

// Inherit default theme
type ThemeType = typeof defaultTheme;

//Ovewrite
declare module "styled-components" {
  export interface defaultTheme extends ThemeType {}
  // export interface defaultTheme {}
}
