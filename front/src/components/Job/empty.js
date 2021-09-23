import { Paper } from "@mui/material";

const Empty = ({ message = "No Jobs Found!" }) => (
  <Paper sx={{ textAlign: "center", padding: 5 }}>{message}</Paper>
);

export default Empty;
