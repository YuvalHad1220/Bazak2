import { Box, Chip, Divider, Typography, useTheme } from "@mui/material";
import Card from "./Card";
import { useState } from "react";
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
    lowerDescription?: string[]
}
const DashboardCard: React.FC<iDashboardCard> = ({title, upperDescription, lowerDescription, redThres = 40, yellowThres = 80, trueCount, falseCount}) => {
    const [isOpen, setOpen] = useState(false);
    const theme = useTheme();

    const mainData = (
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", alignItems: "center", gap: 1.3}}>
            <Typography fontWeight="bold" variant="h6">{title}</Typography>
            <Typography sx={{color: theme => theme.palette.text.secondary}}>{upperDescription}</Typography>
            <Box sx={{display: "flex", height: "130px"}} onClick={() => setOpen(prev => !prev)}>
                <ProgressCircular trueCount={trueCount} falseCount={falseCount} yellowThres={yellowThres} redThres={redThres} />
                <ProgressVerticalLine yellowThres={yellowThres} redThres={redThres} />
            </Box>
            <Box sx={{display: "flex", gap: 2}} onClick={() => setOpen(prev => !prev)}>
                {lowerDescription?.map(label => <Chip key={label} size="small" label={label}/>)}
            </Box>

        </Box>
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
    const whenOpenData = (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, pt: 2}}>
            <Divider />
            {progressLineData}
            {progressLineData}
            {progressLineData}
        </Box>
    );



    return (
        <Card sx={{bgcolor: theme.palette.background.default}}>
            {mainData}
            {isOpen && (
                whenOpenData
            )}
        </Card>
    );
};

export default DashboardCard;