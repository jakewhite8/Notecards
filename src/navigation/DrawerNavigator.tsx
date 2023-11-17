import { createDrawerNavigator } from '@react-navigation/drawer'
import { StackParamList } from '../types/DataTypes'
import { useTheme } from '@rneui/themed';
import Home from '../views/home';
import Settings from '../views/settings';
import AddButton from '../components/addButton';
import CustomDrawerContent from './CustomDrawerContent';
import { useTranslation } from 'react-i18next';

function DrawerNavigator() {

  const Drawer = createDrawerNavigator<StackParamList>();
  const { theme, updateTheme } = useTheme();
  const {t, i18n} = useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primaryBackground,
        },
        headerTintColor: theme.colors.primaryText,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.colors.primaryText
        },
        drawerStyle:{
          backgroundColor: theme.colors.primaryBackground,
          width: '50%'
        },
        drawerLabelStyle: {
          fontWeight: 'bold',
          color: theme.colors.primaryText,
        },
        drawerActiveTintColor: theme.colors.tertiaryBackground,
      }} >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={ ({ navigation }) => ({
          title: t('home'),
          headerRight: () => (
            <AddButton 
              onClick={() => navigation.navigate('CreateTitle')}
            />
          )
        }) } />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t('settings'),
        }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator