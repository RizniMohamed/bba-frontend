import React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import '../../Theme/pieChart.css';

const data = [
  { region: 'Asia', val: 35 },
  { region: 'Africa', val: 20 },
  { region: 'Northern America', val: 15 },
  { region: 'South America', val: 5 },
  { region: 'Europe', val: 10 },
  { region: 'Oceania', val: 5 },
];

const Dashboard = () => {
  const [chartData] = React.useState(data);

  return (
    <Paper sx={{
      border: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      boxShadow: 'none'
    }}>
      <Chart
        data={chartData}
        height={300}
        width={600}
      >
        <PieSeries
          valueField="val"
          argumentField="region"
          innerRadius={0.6}
        />
        <Title
          text="The Population of Continents and Regions"
          sx={{ marginBottom: '80px' }}
        />
        <Legend />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default Dashboard;
