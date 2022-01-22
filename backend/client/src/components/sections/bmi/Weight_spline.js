import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  CommonAxisSettings,
  Grid,
  Tick,
  MinorTick,
  Export,
  Legend,
  Margin,
  Tooltip,
  Label,
  Format,
} from 'devextreme-react/chart';
import { Animation } from '@devexpress/dx-react-chart';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



function getBMI (props) {
    return props.getAllBMIs({email:props.auth.user.email, auth:props.auth.isAuthenticed}, props.history)
}

export default function Graphs(props) {

  const [weight, setWeight] = React.useState([]);

  React.useEffect(async () => {
    const d = await getBMI(props);
    var data = d.data;
    console.log(data);

    var i;
    var temp = [];
    for (i=0; i<data.length; i++) {
      temp[i] = {weight: data[i].weight, date: data[i].dateCreated.toString().substring(0, 10)};
    }
    setWeight(temp);
  },[props.weightStatus]);

  return (
    <>
    <Paper>
      <Chart
          palette="Green"
          dataSource={weight}
          title="Weight Tracker (kg)"
        >
        <CommonSeriesSettings
            argumentField="date"
            type="spline"
          />
          <CommonAxisSettings>
            <Grid visible={true} />
          </CommonAxisSettings>
            <Series
              key="weight"
              valueField= "weight"
              name="Weight" />
          <Margin bottom={40}v left={40} right={25} top={40} />
          <ArgumentAxis
            allowDecimals={true}
            axisDivisionFactor={60}
          >

          </ArgumentAxis>
          <Legend
            verticalAlignment="top"
            horizontalAlignment="right"
          />
          <Export enabled={true} />
          <Tooltip enabled={true} />
        </Chart>
      </Paper>
    </>
  );
}
