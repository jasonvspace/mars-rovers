import React, { useCallback, useEffect, useState } from "react";
import { PhotoModel } from "../data/PhotoModel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar } from "notistack";
import axios from "axios";
import RoverPhoto from "./RoverPhoto";
import EmptyResult from "./EmptyResult";

export default function RoverPhotos() {
  // params: rover's name
  const { name } = useParams();
  const navigate = useNavigate();
  // notification snackbar
  const { enqueueSnackbar } = useSnackbar();
  // photos data
  const [photos, setPhotos] = useState<PhotoModel[]>([]);

  // selected date, type is Dayjs, the initial value is today
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  // the state of loading data
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      // if the date is not selected, return
      if (date == null) return;
      setLoading(true);
      try {
        // set loading state
        // fake URL
        // const url = "/photos.json";
        // get the formatted date string
        const dateStr = date.format("YYYY-M-D");
        // server url
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${dateStr}&api_key=${process.env.REACT_APP_API_KEY}`;
        const res = await axios.get(url);
        if (res?.status === 200) {
          setPhotos(res?.data?.photos || []);
        } else {
          enqueueSnackbar(res.statusText || "Request failed", {
            variant: "error",
          });
        }
      } catch (e: any) {
        console.error(e);
        enqueueSnackbar(e?.message || "Error occurs", { variant: "error" });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [date, name, enqueueSnackbar]);

  const handleDate = useCallback((date: Dayjs | null) => {
    setDate(date);
  }, []);
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <Box>
      <CssBaseline />

      <Backdrop open={loading}>
        <CircularProgress size="80px" />
      </Backdrop>
      <AppBar position="fixed" color="transparent">
        <Toolbar sx={{ bgcolor: "white" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: { sm: 1, md: 2 } }}
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={date}
                onChange={handleDate}
                slotProps={{
                  textField: { size: "small" },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Toolbar>
      </AppBar>

      <Box component="main">
        <Toolbar />
        {Boolean(photos.length) && (
          <Grid
            container
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={1}
            sx={{ p: 1 }}
          >
            {photos?.map((photo) => (
              <Grid item key={photo.id} xs={1}>
                <RoverPhoto photo={photo} />
              </Grid>
            ))}
          </Grid>
        )}
        {!loading && !photos.length && <EmptyResult />}
      </Box>
    </Box>
  );
}
