import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  // This interface extends the theme type to be used with styled-components

  export interface DefaultTheme extends ThemeType {}
}
