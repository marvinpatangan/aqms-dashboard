import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchAQMSData = async () => {
      try {
        const response = await fetch(
          "https://air-quality-monitoring-s-88dae-default-rtdb.asia-southeast1.firebasedatabase.app/AQMSData.json"
        );
        const data = await response.json();
        if (data) {
          const latestKey = Object.keys(data).pop();
          const latestAQMSData = data[latestKey];
          const { GasValue, Humidity, Pressure, Temperature } = latestAQMSData;
          const chartData = [
            {
              country: "Gas Value",
              value: parseFloat(GasValue) || 0,
            },
            {
              country: "Humidity",
              value: parseFloat(Humidity) || 0,
            },
            {
              country: "Pressure",
              value: parseFloat(Pressure) || 0,
            },
            {
              country: "Temperature",
              value: parseFloat(Temperature) || 0,
            },
          ];
          setChartData(chartData);
          console.log(chartData);
        } else {
          console.log("Failed to fetch AQMSData");
        }
      } catch (error) {
        console.error("Error fetching AQMSData:", error);
      }
    };

    fetchAQMSData();
  }, []);

  const customColors = [
    colors.barChart.gasValue,
    colors.barChart.humidity,
    colors.barChart.pressure,
    colors.barChart.temperature,
  ];

  return (
    <ResponsiveBar
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["value"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{scheme: "nivo"}}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Air Quality Data",
        legendPosition: "middle",
        legendOffset: 32,
      }}
     axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Value",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;