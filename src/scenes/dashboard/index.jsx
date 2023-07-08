import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [latestData, setLatestData] = useState(null);

  useEffect(() => {
    // Function to fetch the latest AQMSData values from Firebase
    const fetchLatestAQMSData = async () => {
      try {
        const response = await fetch(
          "https://air-quality-monitoring-s-88dae-default-rtdb.asia-southeast1.firebasedatabase.app/LatestAQMSData.json"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Log the entire data object
        if (data) {
          // Get the latest data object
          const latestKey = Object.keys(data).pop();
          const latestAQMSData = data[latestKey];
          setLatestData(latestAQMSData);
          console.log("Latest AQMSData:", latestAQMSData); // Log the latestAQMSData
        } else {
          console.log("Failed to fetch AQMSData");
        }
      } catch (error) {
        console.error("Error fetching AQMSData:", error);
      }
    };
    
  
    fetchLatestAQMSData();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="AQMS Dashboard" subtitle="Welcome to AQMS Dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={5}
        >
          <StatBox
            title={latestData && latestData.GasValue ? latestData.GasValue : "XXX"}
            subtitle="Gas Value"
            progress="1"
            increase=""
            icon={<StackedLineChartIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={5}
        >
          <StatBox
            title={latestData && latestData.Humidity ? latestData.Humidity : "XXX"}
            subtitle="Humidity"
            progress="1"
            increase=""
            icon={<StackedLineChartIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
          {console.log("GasValue:", latestData && latestData.GasValue ? latestData.GasValue : "XXX")}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={5}
        >
          <StatBox
            title={latestData && latestData.Pressure ? latestData.Pressure : "XXX"}
            subtitle="Pressure"
            progress="1"
            increase=""
            icon={<StackedLineChartIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={5}
        >
          <StatBox
            title={latestData && latestData.Temperature ? latestData.Temperature : "XXX"}
            subtitle="Temperature"
            progress="1"
            increase=""
            icon={<StackedLineChartIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 12" gridRow="span 2" backgroundColor={colors.primary[400]} height={600} borderRadius={5}>
          <Box mt="25px" p="0 30px" display="flex " justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Air Quality Data
              </Typography>
            </Box>
          </Box>
          <Box height="100%" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;