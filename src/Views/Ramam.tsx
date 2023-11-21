import { Grid } from "@mui/material";
import Card from "../Components/Card"
import RamamCard from "../Components/RamamCard"

const RamamView = () => {
    return (
        <Card>
            <Grid container spacing={3}>
            {Array.from({ length: 12 }, (_, index) => (
                <Grid item xs={3} xl={2} key={index}>
                    <RamamCard downloadLink="test" title="אוגדה 3" lastUpdated={new Date()} onClick={() => console.log("clickecd on edit")} />
                </Grid>
            ))}
            </Grid>
        </Card>
    )
};

export default RamamView;
