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
import { StackParamList, NotecardData } from '../types/DataTypes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const notecards: Required<NotecardData>[] = [
  {
    name: 'Computer Science',
    cardId: 1234,
    linearGradientColors: ['#FF9800', '#F44336'],
  },
  {
    name: 'Carpentry',
    cardId: 1235,
    linearGradientColors: ['#3F51B5', '#2196F3'],
  },
  {
    name: 'French',
    cardId: 1236,
    linearGradientColors: ['#FFD600', '#FF9800'],
  },
  {
    name: 'CSL',
    cardId: 1237,
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
            onPress={() =>
              navigation.navigate('Details', {name: notecard.name + ' Notecards', card: notecard})
            }
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