import { ThemeProvider } from "styled-components"

interface Theme {
  color: string;
  backgroundColor: string;
}

interface ThemeProps {
  children: React.ReactNode;
}

const themeLight: Theme = {
  color: '#000',
  backgroundColor: '#fff'
}

const themeDark: Theme = {
  color: '#fff',
  backgroundColor: '#000'
}

const ThemeX = ({children}: ThemeProps) => {
  const theme = "light";

  return (
    <ThemeProvider theme={theme === "light" ? themeLight : themeDark}>
     {children}
    </ThemeProvider>
  );
};

export default ThemeX;