import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { NotecardActivityObject, StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import AnalyticTextField from '../components/analyticTextField';
import Loading from '../components/loading';
import SampleActivityData from '../helpers/SampleActivityData';
import influxDB from '../services/influxDB';
import { CalendarList } from 'react-native-calendars';

const styles = GlobalStyles;
const sampleData = SampleActivityData;

type ActivityProps = NativeStackScreenProps<StackParamList, 'Activity'>;

function Activity( { navigation, route }: ActivityProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();
  const [influxData, setInfluxData] = useState([]);
  const [influxLoading, setInfluxLoading] = useState(false)
  const [calendarRange, setCalendarRange] = useState(0)
  const [marked, setMarked] = useState({})

  useEffect(() => {
    let res = [];
    setInfluxLoading(true)

    function queryRows() {
      const token = influxDB.TOKEN;
      const org = influxDB.ORG
      const bucket = influxDB.BUCKET
      const url = influxDB.URL
      const userId = state.user.id;

      const formatNativeCalendarsDateString = (dateString) => {
        const date = new Date(dateString);
        // Extract the year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        // Format the date as YYYY-MM-DD
        return `${year}-${month}-${day}`;
      }

      // Function used to create the object that is provided to the react-native-calendar
      // that displays the days a User viewed notecards
      const createMarkedObject = (activityArray: Array<NotecardActivityObject>) => {
        interface MarkedObject { 
          [date: string] : { marked: boolean; }
        }
        let markedObject: MarkedObject = {}
        for (let i = 0; i < activityArray.length; i++) {
          let notecardActivityDate = activityArray[i]._time
          markedObject[formatNativeCalendarsDateString(notecardActivityDate)] = {marked: true}
        }
        return markedObject
      }

      const calculateCalenderMonthRange = (firstDate: Date) => {
        const today = new Date()
        const yearsDifference = today.getFullYear() - firstDate.getFullYear();
        const monthsDifference = today.getMonth() - firstDate.getMonth();
        return yearsDifference * 12 + monthsDifference;
      }

      // Query notecard activity data for the current user
      // from the past 30 days
      // One table with userId and notecardCount combined where userId = state.user.id
      const query = `from(bucket:"${bucket}")
              |> range(start: -720h)
              |> filter(fn: (r) => r._measurement == "notecard")
              |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
              |> filter(fn: (r) => r.userId == ${userId})
              |> sort(columns: ["_time"], desc: false)`;

      const queryApi = new InfluxDB({url, token}).getQueryApi(org)
      let influxResponse: Array<NotecardActivityObject> = []
      queryApi.queryRows(query, {
        next: (row: string[], tableMeta: FluxTableMetaData) => {
          // create an object for each row
          const o = tableMeta.toObject(row)
          influxResponse.push(o)
        },
        error: (error: Error) => {
          setInfluxLoading(false)
          console.log("query failed- ", error);
        },
        complete: () => {
          setInfluxData(influxResponse)
          if (influxResponse.length) { 
            setMarked(createMarkedObject(influxResponse))
            setCalendarRange(calculateCalenderMonthRange(new Date(influxResponse[0]._time)))
          }
          setInfluxLoading(false)
        },
      })
    }
    queryRows()
  }, []);

  const calculateNotecardsViewed = (data: array) => {
    if (data.length) {
      return data.reduce((sum, current) => sum + current.notecardCount, 0);
    }
    return 0
  }

  return (
    <View style={{backgroundColor: theme.colors.secondaryBackground, flex: 1}}>
      <View style={{ flexDirection:'column'} }>
        <View>
          <AnalyticTextField title={t('activityTotalNotecardsViewed')} value={calculateNotecardsViewed(influxData)} loading={influxLoading} />
        </View>
        <View>
          <AnalyticTextField title={t('activityCurrentViewStreak')} value={sampleData.currentViewStreak} loading={false} />
        </View>
        <View>
          <AnalyticTextField title={t('activityLongestViewStreak')} value={sampleData.longestViewSteak} loading={false} />
        </View>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent: 'center',
      }}>
      { influxLoading
         ? <Loading />
         : 
        <View style={{
          flex: 1,
        }}>
          <CalendarList
            futureScrollRange={0}
            pastScrollRange={calendarRange}
            displayLoadingIndicator={influxLoading}
            showScrollIndicator={true}
            markedDates={marked}
            dayComponent={({date, state, marking}) => {
              return (
                <View style={{
                  backgroundColor: marking ? 'green' : theme.colors.primaryBackground,
                  borderWidth: 5,
                  borderRadius: 5,
                }}>
                  <Text>{'     '}</Text>
                </View>
              );
            }}
            hideDayNames={true}
            style={{
              marginTop: 20,
              marginBottom: 20,
            }}
            theme={{
              calendarBackground: theme.colors.primaryBackground,
              monthTextColor: theme.colors.primaryText,
              indicatorColor: theme.colors.primaryText,
              textMonthFontSize: 16,
            }}
            horizontal={true}
            calendarWidth={320}
          />
        </View>
      }
      </View>
    </View> 
  )
}

export default Activity;