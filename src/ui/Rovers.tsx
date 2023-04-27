import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { RoverModel } from "../data/RoverModel";
import { useSnackbar } from "notistack";
import axios from "axios";
import Rover from "./Rover";
import logo from "./../images/logo.png";
import EmptyResult from "./EmptyResult";
export default function Rovers() {
  // notification snackbar
  const { enqueueSnackbar } = useSnackbar();
  // rovers data
  const [rovers, setRovers] = useState<RoverModel[]>([]);
  // the state of loading data
  const [loading, setLoading] = useState<boolean>(false);
  // load data when start
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // fake url
        // const url = "rovers.json";
        // server url
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${process.env.REACT_APP_API_KEY}`;
        const res = await axios.get(url);
        if (res.status === 200) {
          setRovers(res?.data?.rovers);
        } else {
          console.log(res);
          enqueueSnackbar(res.statusText || "Request failed");
        }
      } catch (e: any) {
        console.error(e);
        enqueueSnackbar(e?.message || "Error occurs", { variant: "error" });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [enqueueSnackbar]);
  return (
    <Box>
      <CssBaseline />

      <Backdrop open={loading}>
        <CircularProgress size="80px" />
      </Backdrop>
      <AppBar position="fixed" color="transparent">
        <Toolbar sx={{ bgcolor: "white" }}>
          <img src={logo} alt="logo" />
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ ml: 2 }}
          >
            Mars Rovers
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Toolbar />
        {Boolean(rovers.length) && (
          <Grid
            container
            direction="row"
            alignItems="stretch"
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={1}
            rowSpacing={1}
            sx={{ p: 1 }}
          >
            {rovers?.map((rover) => (
              <Grid item key={rover.id} xs={1}>
                <Rover rover={rover} />
              </Grid>
            ))}
          </Grid>
        )}
        {!loading && !rovers.length && <EmptyResult />}
      </Box>
    </Box>
  );
}
