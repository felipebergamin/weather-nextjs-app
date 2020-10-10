import { GetServerSideProps } from 'next';
import { Grow } from '@material-ui/core';

import { CenterContent } from '@styles/Dashboard';
import api from '~/services/api';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CardContent,
  CardMedia,
  Card,
  Grid,
  ForecastDay,
} from '~/components';

const IMG_BASE = process.env.NEXT_PUBLIC_ICONS_BASE_URL;

function CurrentWeather({ current, forecast }) {
  const {
    name: cityName,
    sys: { country },
    weather,
    main,
  } = current;

  return (
    <>
      <AppBar title="Weather now" position="static">
        <Toolbar>
          <Typography variant="h6">FoWeather</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={{ paddingTop: '1.5rem' }}>
        <Typography variant="h5">
          Current weather at {cityName}, {country}
        </Typography>

        <Grid container>
          <Grid item container xs={12} md={6} alignItems="center">
            <img
              draggable="false"
              src={`${IMG_BASE}/${weather[0].icon}@4x.png`}
              alt="ilustrating weather state"
            />

            <div>
              <Typography variant="h6">{weather[0].main}</Typography>
              <Typography variant="body1">{weather[0].description}</Typography>
            </div>
          </Grid>

          <Grid
            item
            container
            xs={12}
            md={6}
            direction="column"
            justify="center"
          >
            <Typography variant="h3">{main.temp} &#8457;</Typography>
            <Typography variant="body2">
              Min: {main.temp_min} &#8457; / Max: {main.temp_max} &#8457;
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          {forecast.list.map((data) => (
            <ForecastDay key={String(data.dt)} data={data} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lat, lon } = context.query;

  const { data: currentData } = await api.get('weather', {
    params: {
      lat,
      lon,
      appid: process.env.API_KEY,
      units: 'imperial',
    },
  });

  const { data: forecastData } = await api.get('forecast', {
    params: {
      lat,
      lon,
      appid: process.env.API_KEY,
      units: 'imperial',
    },
  });

  return {
    props: {
      current: currentData,
      forecast: forecastData,
    },
  };
};

export default CurrentWeather;
