// Colors.ts

export type ThemeColors = {
    primary: string;
    primaryMuted: string;
    background: string;
    gray: string;
    lightGray: string;
  };
  
  export const lightTheme: ThemeColors = {
    primary: '#3D38ED',
    primaryMuted: '#C9C8FA',
    background: '#F5F5F5',
    gray: '#626D77',
    lightGray: '#D8DCE2',
  };
  
  export const darkTheme: ThemeColors = {
    primary: '#141518',
    primaryMuted: '#626D77',
    background: '#F5F5F5',
    gray: '#626D77',
    lightGray: '#D8DCE2',
  };
  
  export const Colors = {
    light: lightTheme,
    dark: darkTheme,
  };