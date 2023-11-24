import { Box, SxProps, styled,  } from "@mui/material";
import { ReactNode } from "react";

interface iCard {
    children: ReactNode,
    sx?: SxProps
}

const StyledCard = styled(Box)(({theme}) => ({
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4],
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper
}))

const Card: React.FC<iCard> = ({children, sx}) => {
    return (
        <StyledCard sx={sx}>
            {children}
        </StyledCard>
    )
};

export default Card;