import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View } from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'
import {
  Button,
  useTheme,
} from '@rneui/themed';

type SettingProps = NativeStackScreenProps<StackParamList, 'Settings'>;

const styles = GlobalStyles;

function Settings ({ navigation, route }: SettingProps) {
  const { theme, updateTheme } = useTheme();

  const toggleTheme = () => {
    const newMode = theme.mode == 'dark' ? 'light' : 'dark'
    updateTheme({ mode: newMode })    
  }

  return (
    <View style={styles.container}>
      <Text>Settings page</Text>
      <Button title="Theme" containerStyle={styles.button} onPress={() => toggleTheme()} />
    </View>
  )
}

export default Settings;