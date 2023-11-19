import { Paper, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface iCard {
    children: ReactNode,
    sx?: SxProps
}

const Card: React.FC<iCard> = ({children, sx}) => {
    const cardSX: SxProps = {
        borderRadius: 4,
        boxShadow: 4,
        padding: 1.5,
        ...sx
    }
    return (
        <Paper sx={cardSX}>
            {children}
        </Paper>
    )
};

export default Card;