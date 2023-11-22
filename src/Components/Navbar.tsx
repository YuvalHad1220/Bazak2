import { ReactNode } from "react";
import Card from "./Card"

const Navbar = ({children} : {children:ReactNode}) => {

    return (
        <Card sx={{height: 78}}>
            navbar
        </Card>
    )

};

export default Navbar;

// will just include title and zminot\kshirot
const DefaultNavbar = () => {

};


// will include column hiding, global filtering, expand to column filter
const DataGridNavbar = () => {

};


// will include breadcrumbs to menu
const DashboardNavbar = () => {

}