import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View } from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'

type SettingProps = NativeStackScreenProps<StackParamList, 'Settings'>;

const styles = GlobalStyles;

function Settings ({ navigation, route }: SettingProps) {

  return (
    <View style={styles.container}>
      <Text>Settings page</Text>
    </View>
  )
}

export default Settings;