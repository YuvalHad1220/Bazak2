import { Grid } from "@mui/material";
import Card from "../Components/Card";
import DashboardCard from "../Components/DashboardCard";

const DashboardView = () => {
    return (
        <Card sx={{height: "100%"}}>
            <Grid container spacing={3}>
            {Array.from({length: 12}).map((_, index) => (
                <Grid item key={index} xs={4} xl={2} sm={3}>
                    <DashboardCard 
                    redThres={30} 
                    yellowThres={70} 
                    title="מרכבה 4" 
                    upperDescription="טנק \ מרכבה \ 4 \ מקט 3324" 
                    lowerDescription={["סדיר", "הכן", "אחי"]} 
                    trueCount={400} 
                    falseCount={200}/>
                </Grid>
            ))}
            </Grid>
        </Card>
    )
};

export default DashboardView;