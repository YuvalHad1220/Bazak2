import { useState } from "react";
import Card from "./Card"
import { Breadcrumbs, Link, ToggleButton, ToggleButtonGroup, Typography, styled } from "@mui/material";
import { iSelectable } from "../interfaces";

const StyledCard = styled(Card)(({theme}) => ({
    height: 78,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    marginX: theme.spacing(3)
}));



// will just include title and zminot\kshirot
export const DefaultNavbar = ({title} : {title: string}) => {
    const [alignment, setAlignment] = useState("zminot");
    return (
        <StyledCard>
            <Typography variant="h6">{title}</Typography>
            <ToggleButtonGroup size="small" value={alignment} exclusive onChange={console.log} style={{marginRight: "auto"}}>
                <ToggleButton value="zminot">זמינות</ToggleButton>
                <ToggleButton value="kshirot">כשירות</ToggleButton>
            </ToggleButtonGroup>            
        </StyledCard>
    )
};


// will include column hiding, global filtering, expand to column filter
export const DataGridNavbar = () => {
    return (
        <StyledCard>
            <Typography>טבלת זמינות - כלל צהל</Typography>
        </StyledCard>
    )
};


// will include breadcrumbs to menu. the last item in depth is always current menu
export const DashboardNavbar = ({depth} : {depth: iSelectable[]}) => {
    const [alignment, setAlignment] = useState("zminot");
    return (
        <StyledCard>
            <Breadcrumbs>
            {
                depth.slice(0, depth.length - 1).map(item => (
                    <Link key={item.id} underline="hover" color="inherit" href={item.id}>
                    {item.value}
                    </Link>
                ))
            }
            <Typography>
                {depth[depth.length - 1].value}
            </Typography>
            </Breadcrumbs>
            <ToggleButtonGroup size="small" value={alignment} exclusive onChange={console.log} style={{marginRight: "auto"}}>
                <ToggleButton value="zminot">זמינות</ToggleButton>
                <ToggleButton value="kshirot">כשירות</ToggleButton>
            </ToggleButtonGroup>            
        </StyledCard>
    )
}