import { createDrawerNavigator } from '@react-navigation/drawer'
import { StackParamList } from '../types/DataTypes'
import { useTheme } from '@rneui/themed';
import Home from '../views/home';
import Settings from '../views/settings';
import AddButton from '../components/addButton';

function DrawerNavigator() {

  const Drawer = createDrawerNavigator<StackParamList>();
  const { theme, updateTheme } = useTheme();

  return (
    <Drawer.Navigator
       initialRouteName="Home"
       screenOptions={{
         headerStyle: {
           backgroundColor: theme.colors.primaryBackground,
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
           fontWeight: 'bold',
           color: theme.colors.primaryText
         },
       }} >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={ ({ navigation }) => ({
          title: 'Home',
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
          title: "Settings",
        }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator