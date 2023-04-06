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
  { region: 'Magazines', val: 35 },
  { region: 'Toothpaste', val: 20 },
  { region: 'Shampoo', val: 15 },
  { region: 'Water bottles', val: 5 },
  { region: 'Footwear', val: 10 },
  { region: 'Bread', val: 5 },
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
          text="The Products by Quantities"
          sx={{ marginBottom: '80px' }}
        />
        <Legend />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default Dashboard;
