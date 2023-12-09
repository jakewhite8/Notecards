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
import { useTranslation } from 'react-i18next';
const styles = GlobalStyles;

type CustomDrawerProps = DrawerContentComponentProps & NativeStackScreenProps<StackParamList, 'CustomDrawer'>;

function CustomDrawerContent({ navigation, ...props }: CustomDrawerProps ) {
  const { theme, updateTheme } = useTheme();
  const {t, i18n} = useTranslation();

  const logout = () => {
    navigation.navigate('Login')
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
            onValueChange={() => {
              updateTheme((myTheme) => ({
                mode: myTheme.mode === 'dark' ? 'light' : 'dark',
              }));
            }}
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