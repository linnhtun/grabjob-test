import { useState, useEffect } from "react";
import { Box, Grid, Paper, FormLabel } from "@mui/material";
import Map from "./Map";
import Search from "./Search";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useQueries } from "react-query";
import findNearByJobs from "../actions/job/findNearByJobs";
import NearbyJobs from "./NearbyJobs";

const Home = () => {
  const { lat, lng } = useGeoLocation();
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(0);
  const [jobs, setJobs] = useState([]);

  const [{ data }, { data: nearbyData }] = useQueries(
    [
      {
        queryKey: ["nearbyjobs", { lat, lng, title, page }],
        queryFn: async () => {
          if (lat && lng) {
            return findNearByJobs(lat, lng, title, page, 0);
          }
        },
      },
      {
        queryKey: ["nearbyjobs5km", { lat, lng, title }],
        queryFn: async () => {
          if (lat && lng) {
            return findNearByJobs(lat, lng, title, 0, 5);
          }
        },
      },
    ],
    {
      keepPreviousData: true,
    }
  );

  const onNextPage = () => {
    setPage(page + 1);
  };

  const onSearch = (title) => {
    setJobs([]);
    setPage(0);
    setTitle(title);
  };

  useEffect(() => {
    setJobs([...jobs, ...(data?.jobs ?? [])]);
  }, [data?.jobs]);

  return (
    <Box sx={{ flexGrow: 1, height: "98vh" }}>
      <Grid container spacing={2} sx={{ height: "98vh" }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: "96vh" }}>
            <Search
              onSearch={onSearch}
              jobs={jobs}
              onNextPage={onNextPage}
              hasMore={data?.hasMore}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: "80vh", marginBottom: 1 }}>
            <Map
              lat={lat}
              lng={lng}
              jobs={jobs}
              nearbyJobs={nearbyData?.jobs}
            />
          </Paper>
          <FormLabel>Nearby jobs within 5km radius</FormLabel>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2}
            sx={{ marginTop: 1, height: "15vh" }}
          >
            <NearbyJobs jobs={nearbyData?.jobs} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
