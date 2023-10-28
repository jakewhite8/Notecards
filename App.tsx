import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createTheme, ThemeProvider } from '@rneui/themed';
import RootNavigator from './src/navigation/RootNavigator';
import { AppStateProvider } from './src/context/GlobalState';
import './i18n/config';

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
    tertiary: '#124789',
  },
  darkColors: {
    primary: '#000',
    tertiary: '#f1330a',
  },
  mode: 'dark',
});

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AppStateProvider>
          <RootNavigator />
        </AppStateProvider>
      </ThemeProvider >
    </SafeAreaProvider>
  )
}

export default App;
