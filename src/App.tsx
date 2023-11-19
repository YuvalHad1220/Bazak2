import { Box, Grid, Typography } from "@mui/material"
import Card from "./Components/Card"

function App() {

  const sidebar = (
    <Card sx={{height: "100%"}}>
      SideBar
    </Card>
  );

  return (
    <Grid container height="100vh" columnSpacing={2} padding={2}>
      <Grid item xs={1} xl={1.5}>
        {sidebar}
      </Grid>

      <Grid item xs={11} xl={10.5}>
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
}

export default App
