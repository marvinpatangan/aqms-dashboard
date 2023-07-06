import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is an air quality monitoring system?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            An air quality monitoring system is a set of devices, sensors, and technologies used to measure and assess the 
            quality of the air in a particular environment. The main purpose of an air quality monitoring system is to provide real-time or near real-time information about the air pollution levels in a specific area. By continuously monitoring and collecting data, these systems can help identify pollution sources, evaluate the effectiveness of pollution control measures, and raise awareness about the quality of the air people breathe.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Why is air quality monitoring important?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Air quality monitoring systems play a crucial role in environmental monitoring, public health protection, and pollution control. They are employed in various settings, including urban areas, industrial sites, residential neighborhoods, and indoor environments, to ensure the air quality meets regulatory standards and to promote a healthier and safer living environment.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How does an Air Quality Monitoring System work?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            An air quality monitoring system uses sensors to measure pollutant concentrations in the air. The data is collected and transmitted to a central database for analysis. The analysis involves comparing the data with air quality standards and generating reports and visualizations. Alerts can be issued for significant changes or breaches in air quality. This information helps policymakers, researchers, and the public make informed decisions and take necessary actions to protect public health and the environment.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What are the components of Air Quality Monitoring System?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            An air quality monitoring system consists of sensors to detect pollutants, a data collection and transmission system, data analysis tools, and reporting/visualization capabilities. The sensors measure pollutants in the air, and the data is collected and transmitted to a central database. Analysis is performed on the data, comparing it to air quality standards, and reports or visualizations are generated. This system helps monitor air quality, identify pollution sources, and make informed decisions for environmental and public health protection.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What are the benefits of using an Air Quality Monitoring System?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Air quality monitoring systems offer numerous benefits. They provide real-time or near real-time information on pollutant levels, allowing swift responses to changing air quality conditions. By monitoring air quality, these systems help identify and assess health risks associated with pollution, enabling preventive measures to protect public health. Additionally, they raise environmental awareness by visualizing and reporting air quality data, fostering support for pollution control and sustainable practices. These systems aid in identifying pollution sources, facilitating targeted mitigation strategies and accountability. Accurate data from monitoring systems supports evidence-based policy development, environmental management, and evaluation of pollution control initiatives. Moreover, the data contributes to scientific research and innovation, advancing understanding and technological solutions for air quality and its impact on human health.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
