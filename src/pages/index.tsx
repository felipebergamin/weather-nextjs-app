import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

  return <h1>Loading...</h1>;
}

export default Index;
