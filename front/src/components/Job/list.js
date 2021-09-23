import { Paper } from "@mui/material";
import { Fragment } from "react";

const List = ({ jobs, width, Parent = Fragment }) => (
  <>
    {jobs?.map(({ title }, key) => (
      <Parent key={key}>
        <Paper
          elevation={3}
          sx={{ textAlign: "center", padding: 2, marginBottom: 1, width }}
        >
          {title}
        </Paper>
      </Parent>
    ))}
  </>
);

export default List;
