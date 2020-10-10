import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Grid, Typography } from '~/components';
import useGeolocation from '../hooks/useGeolocation';

function Index() {
  const { isLoading, error, location } = useGeolocation();
  const router = useRouter();

  useEffect(() => {
    if (location?.coords) {
      router.push({
        pathname: '/dashboard/[lat]/[lon]/',
        query: {
          lat: String(location.coords.latitude),
          lon: String(location.coords.longitude),
        },
      });
    }
  }, [location, router]);

  return (
    <Grid
      style={{ height: '100%' }}
      container
      alignContent="center"
      justify="center"
    >
      <Grid item container alignContent="center" justify="center">
        {isLoading && <Typography variant="h3">Loading...</Typography>}
        {error && <Typography variant="body1">{error}</Typography>}
      </Grid>
    </Grid>
  );
}

export default Index;
