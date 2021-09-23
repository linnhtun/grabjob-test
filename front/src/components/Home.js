import { useState, useEffect } from "react";
import { Box, Grid, Paper, FormLabel } from "@mui/material";
import Map from "./Map";
import Search from "./Search";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useQueries } from "react-query";
import findNearByJobs from "../actions/job/findNearByJobs";
import NearbyJobs from "./NearbyJobs";

const Home = () => {
  // const { lat, lng } = useGeoLocation();
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(0);
  const [jobs, setJobs] = useState([]);

  const [{ data }, { data: nearbyData }] = useQueries(
    [
      {
        queryKey: ["nearbyjobs", { title, page }],
        queryFn: async () => {
          return findNearByJobs(latLng.lat, latLng.lng, title, page, 0);
        },
      },
      {
        queryKey: ["nearbyjobs5km", title],
        queryFn: async () => {
          return findNearByJobs(latLng.lat, latLng.lng, title, 0, 5);
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

  // useEffect(() => {
  //   if (lat) {
  //     setLatLng({ lat: lat, lng: lng });
  //   }
  // }, [lat]);

  useEffect(() => {
    if (data?.lat) {
      setLatLng({ lat: data?.lat, lng: data?.lng });
    }
  }, [data?.lat]);

  return (
    <Box sx={{ flexGrow: 1, minHeight: "98vh" }}>
      <Grid container spacing={2} sx={{ minHeight: "98vh" }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ minHeight: "40vh" }}>
            <Search
              onSearch={onSearch}
              jobs={jobs}
              onNextPage={onNextPage}
              hasMore={data?.hasMore}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ minHeight: "80vh", marginBottom: 1 }}>
            <Map
              lat={latLng.lat}
              lng={latLng.lng}
              jobs={jobs}
              nearbyJobs={nearbyData?.jobs}
            />
          </Paper>
          <FormLabel>Nearby jobs within 5km radius</FormLabel>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2}
            sx={{ marginTop: 1, minHeight: "15vh" }}
          >
            <NearbyJobs jobs={nearbyData?.jobs} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
