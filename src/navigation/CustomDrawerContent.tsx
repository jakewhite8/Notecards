import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import {
  Divider,
  Switch,
  useTheme
} from '@rneui/themed';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store'

const styles = GlobalStyles;

type CustomDrawerProps = DrawerContentComponentProps & NativeStackScreenProps<StackParamList, 'CustomDrawer'>;

function CustomDrawerContent({ navigation, ...props }: CustomDrawerProps ) {
  const { theme, updateTheme } = useTheme();
  const {t, i18n} = useTranslation();
  const { state, dispatch } = useAppState();

  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value)
  }

  const logout = () => {
    save('user', '')
    save('theme', '')
    save('language', '')
    dispatch({ type: 'LOGOUT' });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  const changeTheme = () => {
    const newTheme = theme.mode === 'dark' ? 'light' : 'dark';
    updateTheme({
      mode: newTheme,
    })
    save('theme', newTheme)
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerSectionContainer}>
        <View style={styles.drawerSwitch}>
          <Text style={[
            styles.drawerSwitchText,
            {color: theme.colors.primaryText}]}>{t('darkMode')}</Text>
        </View>
        <View style={styles.drawerSwitch}>
          <Switch
            value={theme.mode === 'dark'}
            onValueChange={changeTheme}
          />
        </View>
      </View>
      <View style={[styles.drawerSectionContainer, styles.drawerLogoutSection]}>
        <Text
          onPress={logout}
          style={[
            styles.drawerSwitchText,
            {color: theme.colors.primaryText}]}
          >{t("logout")}</Text>
      </View>
      <Divider/>
      <DrawerItemList {...props} navigation={navigation}/>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;