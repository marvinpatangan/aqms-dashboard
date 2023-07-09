import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';

const LineGraph = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Function to fetch the AQMSData values from Firebase
    const fetchAQMSData = async () => {
      try {
        const response = await fetch('https://air-quality-monitoring-s-88dae-default-rtdb.asia-southeast1.firebasedatabase.app/LatestAQMSData.json');
        const data = await response.json();
        if (data) {
          // Get the keys of the data object
          const keys = Object.keys(data);
          // Map the AQMSData values to the required format
          const lineData = keys.map(key => ({
            Time: data[key].Time,
            GasValue: parseFloat(data[key].GasValue),
            Humidity: parseFloat(data[key].Humidity),
            Pressure: parseFloat(data[key].Pressure),
            Temperature: parseFloat(data[key].Temperature),
          })).filter(point => (
            !isNaN(point.GasValue) &&
            !isNaN(point.Humidity) &&
            !isNaN(point.Pressure) &&
            !isNaN(point.Temperature)
          ));

          setChartData(lineData);
          console.log(lineData);
        } else {
          console.log('Failed to fetch AQMSData');
        }
      } catch (error) {
        console.error('Error fetching AQMSData:', error);
      }
    };

    fetchAQMSData();
  }, []);

  const renderLegendText = (value, entry) => {
    const { color } = entry;
    let label = '';
    switch (value) {
      case 'Pressure':
        label = 'Atmospheric Pressure';
        break;
      case 'GasValue':
        label = 'Gas Value';
        break;
      case 'Humidity':
        label = 'Humidity';
        break;
      case 'Temperature':
        label = 'Temperature';
        break;
      default:
        break;
    }
    return (
      <Box display="flex" alignItems="center">
        <Typography>{label}</Typography>
      </Box>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      >
        <defs>
          <linearGradient id="gradientPressure" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.redAccent[500]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.redAccent[500]} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradientGasValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.blueAccent[100]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.blueAccent[100]} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradientHumidity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.blueAccent[500]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.blueAccent[500]} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradientTemperature" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.greenAccent[500]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.greenAccent[500]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={colors.grey[100]} />
        <XAxis dataKey="Time" tick={{ fill: colors.grey[100] }} interval={'preserveStartEnd'}/>
        <YAxis tick={{ fill: colors.grey[100] }} />
        <Tooltip containerStyle={{ color: colors.primary[500] }} />
        <Legend formatter={renderLegendText} />
        <Area
          type="monotone"
          dataKey="Pressure"
          stroke={colors.redAccent[500]}
          strokeWidth={2}
          fill="url(#gradientPressure)"
          dot={{ stroke: colors.background }}
        />
        <Area
          type="monotone"
          dataKey="GasValue"
          stroke={colors.blueAccent[100]}
          strokeWidth={2}
          fill="url(#gradientGasValue)"
          dot={{ stroke: colors.background }}
        />
        <Area
          type="monotone"
          dataKey="Humidity"
          stroke={colors.blueAccent[500]}
          strokeWidth={2}
          fill="url(#gradientHumidity)"
          dot={{ stroke: colors.background }}
        />
        <Area
          type="monotone"
          dataKey="Temperature"
          stroke={colors.greenAccent[500]}
          strokeWidth={2}
          fill="url(#gradientTemperature)"
          dot={{ stroke: colors.background }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
