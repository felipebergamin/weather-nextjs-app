import { memo, useMemo } from 'react';
import formatRelative from 'date-fns/formatRelative';

import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const IMG_BASE = process.env.NEXT_PUBLIC_ICONS_BASE_URL;

function ForecastDay({ data }) {
  const formattedDay = useMemo(() => {
    const timestamp = data.dt * 1000;

    return formatRelative(new Date(timestamp), new Date());
  }, [data.dt]);

  return (
    <Card style={{ margin: '0.25rem' }}>
      <CardContent>
        <CardMedia
          style={{
            width: '100%',
            height: 120,
            backgroundSize: 'contain',
          }}
          image={`${IMG_BASE}/${data.weather[0].icon}@4x.png`}
        />
        <Typography variant="body1">{formattedDay}</Typography>
      </CardContent>
    </Card>
  );
}

export default memo(ForecastDay);
