import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Divider, Typography, styled, useTheme } from "@mui/material";
import Card from "./Card";
import ProgressCircular from "./ProgressCircular";
import ProgressVerticalLine from "./ProgressVerticalLine";
import ProgressLine from "./ProgressLine";

interface iDashboardCard {
    redThres?: number,
    yellowThres?: number,
    title: string,
    upperDescription?: string,
    trueCount: number,
    falseCount: number,
    lowerDescription?: string[],
    tipulCount: number,
    tipulHHCount: number,
    harigTipulCount: number,
    harigTipulHHCount: number,
    mizdamenetCount: number,
    mizdamenetHHCount: number, 
    
}
const DashboardCard: React.FC<iDashboardCard> = ({title, upperDescription, lowerDescription, redThres = 40, yellowThres = 80, trueCount, falseCount}) => {
    const theme = useTheme();
    const MainDataBox = styled(Box)(({theme}) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        gap: theme.spacing(1)
    }));


    const mainData = (
        <MainDataBox>
            <Typography fontWeight="bold" variant="h6">{title}</Typography>
            <Typography sx={{color: theme => theme.palette.text.secondary}}>{upperDescription}</Typography>
            <Box style={{display: "flex", height: "130px"}}>
                <ProgressCircular trueCount={trueCount} falseCount={falseCount} yellowThres={yellowThres} redThres={redThres} />
                <ProgressVerticalLine yellowThres={yellowThres} redThres={redThres} />
            </Box>
            <Box style={{display: "flex", gap: "10px"}}>
                {lowerDescription?.map(label => <Chip key={label} size="small" label={label}/>)}
            </Box>

        </MainDataBox>
    );

    const progressLineData = (
        <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
            <Typography variant="body2" textAlign="center" fontWeight="bold">נגמש בטיפול: 299
                <span style={{color: theme.palette.info.light}}>
                {" "}(חלקי חילוף: 30) 
                </span>
                </Typography>
            <ProgressLine value={10} redThres={redThres} yellowThres={yellowThres}/>
        </Box>
    );
    const OpenDataBox = styled(Box)(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        paddingTop: theme.spacing(2)
      }));

    const whenOpenData = (
        <OpenDataBox>
            <Divider />
            {progressLineData}
            {progressLineData}
            {progressLineData}
        </OpenDataBox>
    );

    return (
        <Accordion disableGutters component={(props) => <Card {...props}  />}>
            <AccordionSummary>
                {mainData}
            </AccordionSummary>
            <AccordionDetails>
                {whenOpenData}
            </AccordionDetails>
        </Accordion>
    
    );
};

export default DashboardCard;