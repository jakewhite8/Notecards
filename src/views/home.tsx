import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { 
  Button,
  ListItem,
  ListItemProps,
} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient'
import { useContext } from 'react';
import { UsernameReducerContext } from '../helpers/UsernameReducer';

// Define a route and their params types
type StackParamList = {
  Home: undefined;
  Details: {name: string};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type NotecardData = {
  name: string;
  linearGradientColors: string[];
};

const notecards: Partial<NotecardData>[] = [
  {
    name: 'Computer Science',
    linearGradientColors: ['#FF9800', '#F44336'],
  },
  {
    name: 'Carpentry',
    linearGradientColors: ['#3F51B5', '#2196F3'],
  },
  {
    name: 'French',
    linearGradientColors: ['#FFD600', '#FF9800'],
  },
  {
    name: 'CSL',
    linearGradientColors: ['#4CAF50', '#8BC34A'],
  },
];

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

// navigation and route prop is passed in to every screen component
function Home( { navigation }: HomeProps) {

  const { UsernameState } = useContext(UsernameReducerContext);
  const listItemProps = {};

  return (
    <>
      <View style={styles.container}>
        <Text>Hello {UsernameState.username}</Text>
        <Button
          title="Details Page"
          onPress={() =>
            navigation.navigate('Details', {name: 'Custom Details header'})
          } />
      </View>
      <View style={{ paddingVertical: 8 }}>
        {notecards.map((notecard, i) => (
          <ListItem
            {...(listItemProps as ListItemProps)}
            key={i}
            linearGradientProps={{
              colors: notecard.linearGradientColors,
              start: [1, 0],
              end: [0.2, 0],
            }}
            ViewComponent={LinearGradient}
            containerStyle={{
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 8,
            }}
          >
            <ListItem.Content>
              <ListItem.Title
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                {notecard.name}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
          </ListItem>
        ))}
      </View>
    </>
  )
}

export default Home;