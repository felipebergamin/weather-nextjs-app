import { GetServerSideProps } from 'next';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';

import api from '~/services/api';
import { CarouselButtonNext, CarouselButtonBack } from '~/styles/Dashboard';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
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

      <Container maxWidth="md" style={{ paddingTop: '1.5rem', height: '100%' }}>
        <Typography variant="h5">
          Current weather at {cityName}, {country}
        </Typography>

        <Grid container>
          <Grid
            item
            container
            xs={12}
            md={6}
            alignItems="center"
            justify="center"
          >
            <img
              draggable="false"
              src={`${IMG_BASE}/${weather[0].icon}@4x.png`}
              alt="ilustrating weather state"
            />

            <div>
              <Typography variant="h6">{weather[0].main}</Typography>
              <Typography variant="body1">{weather[0].description}</Typography>
              <Typography variant="caption">
                Humidity {main.humidity}%
              </Typography>
            </div>
          </Grid>

          <Grid
            item
            container
            xs={12}
            md={6}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Typography variant="h3">{main.temp} &#8457;</Typography>
            <Typography variant="body2">
              Min: {main.temp_min} &#8457; / Max: {main.temp_max} &#8457;
            </Typography>
            <Typography variant="caption">
              Feels like {main.feels_like} &#8457;
            </Typography>
          </Grid>
        </Grid>

        <CarouselProvider
          naturalSlideHeight={240}
          naturalSlideWidth={200}
          totalSlides={forecast.list.length}
          visibleSlides={3}
          infinite={false}
        >
          <Grid container direction="row">
            <Grid item container xs={1} alignItems="center" justify="center">
              <CarouselButtonBack>
                <NavigateBefore />
              </CarouselButtonBack>
            </Grid>

            <Grid item xs={10}>
              <Slider>
                {forecast.list.map((data, index) => (
                  <Slide index={index} key={String(data.dt)}>
                    <ForecastDay data={data} />
                  </Slide>
                ))}
              </Slider>
            </Grid>

            <Grid item container xs={1} alignItems="center" justify="center">
              <CarouselButtonNext>
                <NavigateNext />
              </CarouselButtonNext>
            </Grid>
          </Grid>
        </CarouselProvider>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lat, lon } = context.query;

  const [{ data: currentData }, { data: forecastData }] = await Promise.all([
    api.get('weather', {
      params: {
        lat,
        lon,
        appid: process.env.API_KEY,
        units: 'imperial',
      },
    }),
    api.get('forecast', {
      params: {
        lat,
        lon,
        appid: process.env.API_KEY,
        units: 'imperial',
      },
    }),
  ]);

  return {
    props: {
      current: currentData,
      forecast: forecastData,
    },
  };
};

export default CurrentWeather;
