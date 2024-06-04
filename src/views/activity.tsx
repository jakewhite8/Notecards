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

const styles = GlobalStyles;
const sampleData = SampleActivityData;

const token = '6yJdxuHo-1oVqhVoXAEhdaUdfZzCZQsJfFERX-fCgMjBIycV0ZbEvmQR8Uk_6e1odqTyapxVC_CpFLzEpFqe1A==';
const org = "Notecards";
const bucket = "activity";
const url = "https://us-east-1-1.aws.cloud2.influxdata.com/";
const userId = 2;

// Query all notecard activity data for the current user 
let query = `from(bucket: "activity")
  |> range(start: -720h)
  |> filter(fn: (r) => r["_measurement"] == "notecard")
  |> filter(fn: (r) => r["_field"] == "userId")
  |> filter(fn: (r) => r["_value"] == ${userId})`;

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