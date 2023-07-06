import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineGraph from "../../components/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="AQMS Data" />
      <Box height="80vh">
        <LineGraph />
      </Box>
    </Box>
  );
};

export default Line;
