import { memo, useMemo } from 'react';
import formatRelative from 'date-fns/formatRelative';

import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const IMG_BASE = process.env.NEXT_PUBLIC_ICONS_BASE_URL;

type WeatherInfo = {
  icon: string;
};

type ForecastDayProps = {
  data: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
    };
    weather: WeatherInfo[];
  };
};

function ForecastDay({ data }: ForecastDayProps) {
  const formattedDay = useMemo(() => {
    const timestamp = data.dt * 1000;

    return formatRelative(new Date(timestamp), new Date());
  }, [data.dt]);

  return (
    <Card style={{ margin: '0.25rem' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          style={{
            width: '100%',
            height: 120,
            backgroundSize: 'contain',
          }}
          image={`${IMG_BASE}/${data.weather[0].icon}@4x.png`}
        />
        <Typography variant="body1">
          <strong>{formattedDay}</strong>
        </Typography>
        <Typography variant="caption">
          Temperature: {data.main.temp} &#8457;
        </Typography>
        <Typography variant="caption">
          Feels like: {data.main.feels_like} &#8457;
        </Typography>
        <Typography variant="caption">Humidity: {data.main.temp}%</Typography>
      </CardContent>
    </Card>
  );
}

export default memo(ForecastDay);
