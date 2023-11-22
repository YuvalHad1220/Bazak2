import { Box, Chip, CircularProgress, Typography, styled, useTheme } from "@mui/material";
import Card from "./Card";

const StyledCircularProgress = styled(CircularProgress)(() => ({
    position: 'relative',
    display: 'inline-flex',
    '& svg': {
      transform: 'rotate(-90deg)',
    },
    '& .MuiCircularProgress-svg': {
      transform: 'rotate(90deg)',
      
    },
    '& .MuiCircularProgress-circle': {
      strokeLinecap: 'round',
    },
  }));
  
const CustomCircularChart = ({value, color} : {value: number, color: string}) => (
    <Box position="relative">
        <StyledCircularProgress variant="determinate" sx={{color: theme => theme.palette.background.default}} value={100} thickness={3} size={130}/>
        <StyledCircularProgress variant="determinate" sx={{position: "absolute", left: 0, color: color}} value={value} thickness={3} size={130}/>
    </Box>
);

const CustomProgressVerticalLine = ({redThres, yellowThres, redColor, yellowColor, greenColor}: {redThres: number, yellowThres: number, redColor: string, yellowColor: string, greenColor: string}) => {
    return (
        <Box sx={{height: "100%", ml: 2,}}>
            {/* green line */}
            <Box sx={{display: "flex", height: `${100 - yellowThres}%`}}>
                <Box sx={{bgcolor: greenColor, width: "10px", borderTopLeftRadius: 6, borderTopRightRadius: 6}} />
                <Box sx={{display: "flex", flexDirection: "column", pl: 1, m: 0, justifyContent: "space-between", height: "100%"}}>
                    <Typography sx={{transform: "translateY(-20%)"}} variant="caption">100%</Typography>
                    <Typography sx={{transform: "translateY(50%)"}}  variant="caption">{yellowThres}%</Typography>
                </Box>
            </Box>
            {/* yellow line */}
            <Box sx={{display: "flex", height: `${yellowThres - redThres}%`}}>
                <Box sx={{bgcolor: yellowColor, width: "10px"}} />
            </Box>
            {/* red line */}
            <Box sx={{display: "flex", height: `${redThres}%`}}>
                <Box sx={{bgcolor: redColor, width: "10px", borderBottomLeftRadius: 6, borderBottomRightRadius: 6}} />
                <Box sx={{display: "flex", flexDirection: "column", pl: 1, m: 0, justifyContent: "space-between", height: "100%"}}>
                    <Typography variant="caption" sx={{transform: "translateY(-50%)"}}>{redThres}%</Typography>
                    <Typography variant="caption">0%</Typography>
                </Box>
            </Box>

        </Box>
    );
}


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
    const theme = useTheme();
    const asPrecentage = (trueCount / (falseCount + trueCount)) * 100;
    const color = asPrecentage > yellowThres ? theme.palette.success.main : asPrecentage > redThres ? theme.palette.warning.light : theme.palette.error.main;
    console.log("rerender");
    return (
        <Card sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1.3}}>
            <Typography fontWeight="bold" variant="h6">{title}</Typography>
            <Typography sx={{color: theme.palette.text.secondary}}>{upperDescription}</Typography>
            <Box sx={{display: "flex", height: "130px"}}>
                <CustomCircularChart value={asPrecentage} color={color}/>
                <CustomProgressVerticalLine yellowThres={yellowThres} redThres={redThres} redColor={theme.palette.error.main} yellowColor={theme.palette.warning.light} greenColor={theme.palette.success.main}/>
            </Box>
            <Box sx={{display: "flex", gap: 2}}>
                {lowerDescription?.map(label => <Chip key={label} size="small" label={label}/>)}
            </Box>
        </Card>
    );
};

export default DashboardCard;