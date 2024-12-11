import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ Height: 20 }}>
      <Typography gutterBottom variant="h3">
        Oops-Not Found
      </Typography>
      <Divider></Divider>
      <Button fullWidth component={Link} to='/catalog'>Go back to Shop</Button>
    </Container>
  )
}