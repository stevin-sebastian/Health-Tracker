import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  CommonAxisSettings,
  Grid,
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

  const [bmi, setBMI] = React.useState([]);

  React.useEffect(async () => {
    const d = await getBMI(props);
    var data = d.data;
    console.log(data);

    var i;
    var temp = [];
    for (i=0; i<data.length; i++) {
      temp[i] = {bmi: data[i].bmi, date: data[i].dateCreated.toString().substring(0, 10)};
    }
    setBMI(temp);
  },[props.bmiStatus]);

  return (
    <>
    <Paper style={{ margin: "0px 0px 16px 0px"}}>
      <Chart
          palette="Violet"
          dataSource={bmi}
          title="BMI Tracker"
        >
        <CommonSeriesSettings
            argumentField="date"
            type="spline"
          />
          <CommonAxisSettings>
            <Grid visible={true} />
          </CommonAxisSettings>
            <Series
              key="bmi"
              valueField= "bmi"
              name="BMI" />
          <Margin bottom={40}v left={40} right={40} top={40} />
          <ArgumentAxis
            allowDecimals={false}
            axisDivisionFactor={60}
          >
            <Label>
              <Format type="decimal" />
            </Label>
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
