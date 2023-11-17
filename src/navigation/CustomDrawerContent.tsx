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

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme, updateTheme } = useTheme();
  const {t, i18n} = useTranslation();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerSwitchContainer}>
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
      <Divider/>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;