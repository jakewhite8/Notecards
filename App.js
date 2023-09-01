import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, createTheme, ThemeProvider } from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'dark',
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <Text>Notecard 3</Text>
          <Button title="Button 3" />
          <StatusBar style="auto" />
        </View>
      </ThemeProvider >
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
