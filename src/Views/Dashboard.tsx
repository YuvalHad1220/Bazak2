import { Box, Grid } from "@mui/material";
import Card from "../Components/Card";
import DashboardCard from "../Components/DashboardCard";
import { DashboardFooter } from "../Components/Footer";
import { DashboardNavbar } from "../Components/Navbar";

const DashboardView = () => {
    return (
        <Box style={{height: "100%", display: "flex", flexDirection: "column", gap: 16}}>
            <DashboardNavbar depth={[{id: "magadal6", value: "טנק"}, {id: "magad2", value:"סימן"}, {id: "mkabaz5", value: "מרכבה 4"}]}/>
                <Card style={{height: "100%", display: "flex", flexDirection: "column"}}>
                    <Grid container spacing={3} >
                    {Array.from({length: 12}).map((_, index) => (
                        <Grid item key={index} xs={4} xl={2} sm={3}>
                            <DashboardCard 
                            redThres={30} 
                            yellowThres={70} 
                            title="מרכבה 4" 
                            upperDescription="מקט 3324" 
                            lowerDescription={["סדיר", "הכן", "אחי"]} 
                            trueCount={400} 
                            falseCount={200}/>
                        </Grid>
                    ))}
                    </Grid>
                </Card>
            <DashboardFooter />

        </Box>
    )
};

export default DashboardView;