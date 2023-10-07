import { useState } from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ListItem,
  ListItemProps,
  SearchBar,
  Button
} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient'
import { StackParamList, NotecardData } from '../types/DataTypes';
import SampleNotecards from '../helpers/SampleNotecards';
import TypeScriptNotecards from '../helpers/TypeScriptNotecards';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';

const styles = GlobalStyles;

const notecards = SampleNotecards;

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

// navigation and route prop is passed in to every screen component
function Home( { navigation }: HomeProps) {

  const [filterString, setFilterString] = useState('');
  const listItemProps = {};

  const { state, dispatch } = useAppState();

  const handleLogout = () => {
    // Dispatch an action to update the user state
    dispatch({ type: 'LOGOUT' });
  };
  const logJakeIn = () => {
    dispatch({type: 'SET_USER', payload: {name: 'jakewhite27', id: 1}})
  }

  const loadDetailsPage = (notecard: NotecardData) => {
    // Retrieve selected notecards - temporarily using TypeScriptNotecards

    // load selected notecard into Global State
    dispatch({
      type: 'UPDATE_CURRENT_NOTECARDSET',
      payload: {
        title: notecard.name,
        notecards: TypeScriptNotecards.notecards
      }
    })
    navigation.navigate('Details', {name: `${notecard.name} Notecard`, card: notecard})
  }

  return (
    <>
      <View>
        {state.user ? (
          <Text>Welcome, {state.user.name}!</Text>
        ) : (
          <Text>Please log in</Text>
        )}
        <Button title="LogIn" onPress={logJakeIn} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <View style={styles.container}>
        <Text>Current filter: {filterString}</Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <SearchBar
          value={filterString}
          onChangeText={setFilterString}
          placeholder="Filter by title"
        />
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
            onPress={() => loadDetailsPage(notecard)}
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