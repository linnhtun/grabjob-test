import { Grid } from "@mui/material";
import Empty from "./Job/empty";
import List from "./Job/list";

const NearbyJobs = ({ jobs }) => (
  <>
    {jobs?.length > 0 ? (
      <List
        jobs={jobs}
        width={200}
        Parent={({ children }) => (
          <Grid item xs={12} md={4}>
            {children}
          </Grid>
        )}
      />
    ) : (
      <Grid item xs={12} md={12}>
        <Empty />
      </Grid>
    )}
  </>
);

export default NearbyJobs;
