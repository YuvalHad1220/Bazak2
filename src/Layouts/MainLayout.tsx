import { Box, Grid } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import Card from "../Components/Card";
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

const MainLayout = () => {

    const generalNavItems: iNavItem[] = [
        {
          text: "מסך בית",
          to: "",
          Icon: HomepageIcon
        },
        {
          text: "המסכים שלי",
          to: "",
          Icon: ScreensIcon
        },
        {
          text: "זמינות תת יחידות",
          to: "",
          Icon: ZminotTatYehidotIcon
        }
      ];
    
      const tableNavItems: iNavItem[] = [
        {
          text: "דיווח זמינות",
          to: "",
          Icon: DivoahZminotIcon
        },
        {
          text: "עץ יחידות",
          to: "",
          Icon: UnitTreeIcon
        },
        {
          text: "מרכז המצגות",
          to: "",
          Icon: SlidesCenterIcon
        }
      ];
    
      const adminNavItems: iNavItem[] = [
        {
          text: "תקינות הזנות",
          to: "",
          Icon: PermissionIcon
        },
        {
          text: "ניהול מערכת",
          to: "",
          Icon: SettingsIcon
        },
        {
          text: "אודות המערכת",
          to: "",
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
          <Box height="100%" sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <Card sx={{height: 78}}>
              navbar
            </Card>
            <Card sx={{flexGrow: 1}}>
              content
            </Card>
            <Card sx={{height: 70}}>
              footer
            </Card>
          </Box>
        </Grid>
  
      </Grid>
    )
};

export default MainLayout;