// themed.d.ts
import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    primaryBackground: string;
    secondaryBackground: string;
    tertiaryBackground: string;
    primaryText: string;
    primaryButton: string;
    icon: string;
  }
}