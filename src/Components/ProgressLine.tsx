import { Box, LinearProgress, Typography, linearProgressClasses, styled } from "@mui/material";

interface iProgressLine {
    value: number,
    yellowThres: number;
    redThres: number;
  }

  const RoundedCapProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 8,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.background.default,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 8,
      
    },
  }));
const ProgressLine: React.FC<iProgressLine> = ({value, yellowThres, redThres}) => {
    return (
        <Box position="relative">
            <RoundedCapProgress
            variant="determinate" 
            value={value} 
            sx={{'.MuiLinearProgress-bar': {backgroundColor:theme => value > yellowThres ? theme.palette.success.main : value > redThres ? theme.palette.warning.light : theme.palette.error.main}}} />
            
            <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
            position: "absolute",
            top: "-10%",
            right: "50%",
            transform: "translateX(50%)"
            }}>
                {value.toFixed(2)}%
            </Typography>
        </Box>
    )
};

export default ProgressLine;