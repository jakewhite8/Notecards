import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createTheme, ThemeProvider } from '@rneui/themed';
import RootNavigator from './src/navigation/RootNavigator';
import { AppStateProvider } from './src/context/GlobalState';
import './i18n/config';
import 'react-native-gesture-handler';

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
    primaryBackground: '#faebd7',
    secondaryBackground: '#ffcd94',
    tertiaryBackground: '#65737e',
    primaryText: '#3b444b',
    secondaryText: '#946b2d',
    primaryButton: '#f7a583',
    icon: '#3b444b'
  },
  darkColors: {
    primary: '#000',
    primaryBackground: '#3b444b',
    secondaryBackground: '#36454f',
    tertiaryBackground: '#c0c5ce',
    primaryText: '#faebd7',
    secondaryText: '#65737e',
    primaryButton: '#946b2d',
    icon: '#faebd7'
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
