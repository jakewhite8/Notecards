import { useState, useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ListItem,
  ListItemProps,
  SearchBar,
  Button,
  useTheme,
} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient'
import { StackParamList, NotecardData } from '../types/DataTypes';
import TypeScriptNotecards from '../helpers/TypeScriptNotecards';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/primaryButton';
import Welcome from '../components/welcomeHeader';
import NotecardService from '../services/notecard';
import { AxiosResponse } from 'axios';

const styles = GlobalStyles;

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

// navigation and route prop is passed in to every screen component
function Home( { navigation }: HomeProps) {
  const { theme, updateTheme } = useTheme();

  const [filterString, setFilterString] = useState('');
  const [activeNotecards, setActiveNotecards] = useState([]);
  const [notecards, setNotecards] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const listItemProps = {};

  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();

  useEffect(() => {
    NotecardService.getNotecardSets(state.user)
      .then((response: AxiosResponse) => {
        setNotecards(response.data.notecardSets)
        setActiveNotecards(response.data.notecardSets)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(`getNotecardSets error: ${error}`)
        setIsLoading(false)
      })
  }, [])

  const loadDetailsPage = (notecard: NotecardData) => {
    // Retrieve selected notecards - temporarily using TypeScriptNotecards

    // load selected notecard into Global State
    dispatch({
      type: 'UPDATE_CURRENT_NOTECARDSET',
      payload: {
        title: notecard.title,
        notecards: TypeScriptNotecards.notecards
      }
    })
    navigation.navigate('Details', {name: `${notecard.title} ${t('notecardSet')}`, card: notecard})
    setFilterString('')
    setActiveNotecards(notecards)
  }

  const filterNotecards = ( value: string ) => {
    setFilterString(value)
    setActiveNotecards(
      notecards.filter((notecard)=> notecard.title.toLowerCase().includes(value.toLowerCase()))
    )
  }

  if (isLoading) {
    return (
      <View style={[styles.container, {
              backgroundColor: theme.colors.secondaryBackground 
            }]}
        >
        <Text style={{color:theme.colors.primaryText}}>{t('loading')}</Text>
        <ActivityIndicator size="large" color={theme.colors.primaryText}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.homePageNotecardSection, {
        paddingVertical: 8,
        backgroundColor: theme.colors.secondaryBackground }]}>
        <Welcome />
        <SearchBar
          value={filterString}
          onChangeText={(value) => filterNotecards(value)}
          placeholder={t('filterByTitle')}
          containerStyle={{
            backgroundColor:theme.colors.primaryBackground,
            borderColor:theme.colors.primaryBackground,
            elevation: 10}}
        />
        { activeNotecards && activeNotecards.length ?
          activeNotecards.map((notecard, i) => (
          <ListItem
            {...(listItemProps as ListItemProps)}
            key={i}
            linearGradientProps={{
              colors: notecard.linearGradientColors || ['#FF9800', '#F44336'],
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
                style={{ color: theme.colors.primaryText, fontWeight: 'bold' }}
              >
                {notecard.title}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color={theme.colors.primaryText} />
          </ListItem>
        ))
        : 
          <View style={styles.container}>
            <Text style={{color: theme.colors.primaryText}}>No Notecards</Text>
            <PrimaryButton
              title={t('createNotecard')}
              onPressFunction={() => navigation.navigate('CreateTitle')}
              >
            </PrimaryButton>
          </View>
        }
      </ScrollView>
    </View>
  )
}

export default Home;