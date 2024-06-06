import { useState, useEffect } from 'react';
import { InfluxDB } from "@influxdata/influxdb-client";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import AnalyticTextField from '../components/analyticTextField';
import SampleActivityData from '../helpers/SampleActivityData';
import influxDB from '../services/influxDB';

const styles = GlobalStyles;
const sampleData = SampleActivityData;

type ActivityProps = NativeStackScreenProps<StackParamList, 'Activity'>;

function Activity( { navigation, route }: ActivityProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();
  const [influxData, setInfluxData] = useState([]);
  const [influxLoading, setInfluxLoading] = useState(false)

  useEffect(() => {
    let res = [];
    setInfluxLoading(true)
    const influxQuery = async () => {
      const token = influxDB.TOKEN;
      const org = influxDB.ORG
      const bucket = influxDB.BUCKET
      const url = influxDB.URL
      const userId = state.user.id;

      // Query notecard activity data for the current user
      // from the past 30 days
      let query = `from(bucket: "activity")
        |> range(start: -720h)
        |> filter(fn: (r) => r["_measurement"] == "notecard")
        |> filter(fn: (r) => r["_field"] == "userId")
        |> filter(fn: (r) => r["_value"] == ${userId})`;
      //create InfluxDB client
      const queryApi = await new InfluxDB({ url, token }).getQueryApi(org);
      //make query
      await queryApi.queryRows(query, {
        next(row, tableMeta) {

          const o = tableMeta.toObject(row);
          //push rows from query into an array object
          res.push(o);
        },
        complete() {
          setInfluxData(res)
          setInfluxLoading(false)
        },
        error(error) {
          setInfluxLoading(false)
          console.log("query failed- ", error);
        }
      });

    };
    influxQuery().catch(console.error);
  }, []);

  return (
    <View style={{backgroundColor: theme.colors.secondaryBackground, flex: 1}}>
        <View style={{ flexDirection:'row'} }>
          <View style={{flex: 0.33}}>
            <AnalyticTextField title="Total Cards Viewed" value={influxData.length} loading={influxLoading} />
          </View>
          <View style={{flex: 0.33}}>
            <AnalyticTextField title="Current View Streak" value={sampleData.currentViewStreak} loading={false} />
          </View>
          <View style={{flex: 0.33}}>
            <AnalyticTextField title="Longest View Streak" value={sampleData.longestViewSteak} loading={false} />
          </View>
        </View>
    </View> 
  )
}

export default Activity;