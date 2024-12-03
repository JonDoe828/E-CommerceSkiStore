import { AppBar, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">
          SKI-STORE
        </Typography>
      </Toolbar>
    </AppBar>
  )
}