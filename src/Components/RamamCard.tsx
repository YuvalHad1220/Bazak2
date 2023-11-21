import { Fab, Typography } from "@mui/material";
import Card from "./Card";
import logo from "../assets/tzahal_logo.png";
import EditIcon from '@mui/icons-material/Edit';

interface iRamamCard {
    title: string,
    lastUpdated: Date, 
    downloadLink: string,
    onClick: () => void
}

const RamamCard: React.FC<iRamamCard> = ({title, lastUpdated, onClick, downloadLink}) => {

    const formattedDate = lastUpdated.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      });



    return (
        <Card sx={{bgcolor: "black", display: "flex", position: "relative", flexDirection: "column", alignItems: "center", py: 2, gap: 1.5}}>
            <Fab onClick={onClick} color="primary" size="small" sx={{ position: 'absolute', top: 0, left: 0, marginTop: 1, marginLeft: 1 }}><EditIcon /></Fab>
            <a href={downloadLink} target="_blank">
                <img src={logo} width={150} height={150} />
            </a>
            <Typography>עדכון אחרון: {formattedDate}</Typography>
            <Typography fontWeight="bold" variant="h5">{title}</Typography>
        </Card>
    )
};

export default RamamCard;