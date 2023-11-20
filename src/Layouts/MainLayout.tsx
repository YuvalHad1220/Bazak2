import {Grid } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import HomepageIcon from "../assets/homepage.svg?react";
import ZminotTatYehidotIcon from "../assets/zminot_tat_yehidot.svg?react";
import ScreensIcon from "../assets/screens.svg?react";
import UnitTreeIcon from "../assets/unit_tree.svg?react";
import SlidesCenterIcon from "../assets/slides_center.svg?react";
import DivoahZminotIcon from "../assets/divoah_zminot.svg?react";
import PermissionIcon from "../assets/permission_validation.svg?react";
import SettingsIcon from "../assets/settings.svg?react";
import AboutIcon from "../assets/about.svg?react";
import { iNavItem, iNavSection } from "../interfaces";
import { Outlet } from "react-router-dom";
import PATHS from "../paths";

const MainLayout = () => {

    const generalNavItems: iNavItem[] = [
        {
          text: "מסך בית",
          to: PATHS.DASHBOARD,
          Icon: HomepageIcon
        },
        {
          text: "המסכים שלי",
          to: "/lol",
          Icon: ScreensIcon
        },
        {
          text: "זמינות תת יחידות",
          to: PATHS.SUB_UNIT_ZMINOT,
          Icon: ZminotTatYehidotIcon
        }
      ];
    
      const tableNavItems: iNavItem[] = [
        {
          text: "דיווח זמינות",
          to: PATHS.ZMINOT_TABLE,
          Icon: DivoahZminotIcon
        },
        {
          text: "עץ יחידות",
          to: PATHS.UNIT_TREE,
          Icon: UnitTreeIcon
        },
        {
          text: "מרכז המצגות",
          to: PATHS.RAMAM_TABLE,
          Icon: SlidesCenterIcon
        }
      ];
    
      const adminNavItems: iNavItem[] = [
        {
          text: "תקינות הזנות",
          to: PATHS.TKINOT_HAZANOT,
          Icon: PermissionIcon
        },
        {
          text: "ניהול מערכת",
          to: PATHS.SYSTEM_MANAGEMENT,
          Icon: SettingsIcon
        },
        {
          text: "אודות המערכת",
          to: PATHS.ABOUT,
          Icon: AboutIcon
        }
      ];
    
      const generalNavSection: iNavSection = {
        text: "כללי",
        items: generalNavItems
      };
    
      const tableNavSection: iNavSection = {
        text: "טבלאות",
        items: tableNavItems
      };
    
      const adminNavSection: iNavSection = {
        text: "ניהול",
        items: adminNavItems
      };
    const navSections = [generalNavSection, tableNavSection, adminNavSection];
    

    return (
        <Grid container height="100vh" columnSpacing={2} padding={2}>
        <Grid item xs={1} md={1.5}>
          <Sidebar navSections={navSections} />
        </Grid>
  
        <Grid item xs={11} md={10.5}>
          {/* <Box height="100%" sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <Card sx={{height: 78}}>
              navbar
            </Card>
            <Card sx={{flexGrow: 1}}>
              content
            </Card>
            <Card sx={{height: 70}}>
              footer
            </Card>
          </Box> */}
          <Outlet />
        </Grid>
  
      </Grid>
    )
};

export default MainLayout;