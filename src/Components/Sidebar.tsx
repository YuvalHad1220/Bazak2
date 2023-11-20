
import BazakIcon from "../assets/bazak_logo.svg?react";
import { iNavItem, iNavSection } from "../interfaces";
import { Box, Button, Divider, SvgIcon, Typography } from "@mui/material";
import Card from "./Card";
import React from "react";
import AddUserIcon from "../assets/add_user.svg?react";
import ToTeneTableIcon from "../assets/to_tene_table.svg?react";
interface iSidebar {
  navSections: iNavSection[],
}

const Sidebar: React.FC<iSidebar> = ({navSections}) => {

  const SidebarFooter = () => (
    <Box sx={{display: "flex", flexDirection: "column", gap: 1.5, mt: "auto"}}>
      <Button variant="contained">
        <AddUserIcon fill="white" />
        <Typography sx={{textAlign: "center", mr: "auto", ml: "auto"}}>רשום משתמש</Typography>
      </Button>

      <Button variant="outlined">
        <ToTeneTableIcon />
        <Typography sx={{textAlign: "center", mr: "auto", ml: "auto"}}>חזרה לשולחן טנא</Typography>
      </Button>
    </Box>
  )


  const NavItem = ({item} : {item: iNavItem}) => (
    <Button>
      <item.Icon />
      <Typography color="text.primary" sx={{textAlign: "center", mr: "auto", ml: "auto"}}>{item.text}</Typography>
    </Button>
  );

  const MainNavSection = ({navSections} : {navSections: iNavSection[]}) => (
    navSections.map(section => (
      <Box key={section.text} sx={{display: "flex", flexDirection: "column", gap: 1.5}}>
        <Divider>{section.text}</Divider>
        {section.items.map(navItem => <NavItem key={navItem.text} item={navItem} />)}
      </Box>
    ))
  );

      const BazakHeader = () => (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", p:0, gap:1}}>
            <Typography sx={{fontWeight: "bold", fontSize: 40, display: {
                xs: "none",
                md: "inline"
            }}}>מערכת בזכ</Typography>
            <SvgIcon component={BazakIcon} />
        </Box>
      )


      return (
        <Card sx={{height: "100%", display: "flex", flexDirection:"column", gap: 2}}>
            <BazakHeader />
            <MainNavSection navSections={navSections} />
            <SidebarFooter />
        </Card>
      )
    
};

export default Sidebar;