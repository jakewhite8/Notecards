import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { Text, View } from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'
import { useAppState } from '../context/GlobalState';
import {
  Button,
  useTheme,
} from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/primaryButton';

type SettingProps = NativeStackScreenProps<StackParamList, 'Settings'>;

const styles = GlobalStyles;

function Settings ({ navigation, route }: SettingProps) {
  const { theme, updateTheme } = useTheme();
  const { state, dispatch } = useAppState();

  const toggleTheme = () => {
    const newMode = theme.mode == 'dark' ? 'light' : 'dark'
    updateTheme({ mode: newMode })    
  }

  const {t, i18n} = useTranslation();

  const logJakeIn = () => {
    dispatch({type: 'SET_USER', payload: {name: 'jakewhite27', id: 1}})
  }
  const handleLogout = () => {
    // Dispatch an action to update the user state
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <View style={styles.container}>
        {state.user ? (
          <Text>Welcome, {state.user.name}!</Text>
        ) : (
          <Text>Please log in</Text>
        )}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Log In"
            onPressFunction={logJakeIn}>
          </PrimaryButton>
          <PrimaryButton
            title="Logout"
            onPressFunction={handleLogout}>
          </PrimaryButton>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={{fontSize: 20, marginBottom: 20}}>{t('hello')}</Text>
        <PrimaryButton
          title={t('change')}
          onPressFunction={() =>
            i18n.changeLanguage(i18n.language === 'sv' ? 'en' : 'sv')} >
        </PrimaryButton>
      </View>
      <View style={styles.container}>
        <Text>Settings page</Text>
        <PrimaryButton
          title="Theme"
          onPressFunction={() => toggleTheme()}>
        </PrimaryButton>
      </View>
    </View>
  )
}

export default Settings;