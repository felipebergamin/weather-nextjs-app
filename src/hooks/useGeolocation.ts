import { useEffect, useState } from 'react';

export default function useGeolocation() {
  const [isSupported, setIsSupported] = useState(true);
  const [location, setLocation] = useState<Position | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setIsSupported(false);
      setIsLoading(false);
      setError("Your browser doesn't support geolocation");
    } else {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'prompt' || result.state === 'granted') {
          navigator.geolocation.getCurrentPosition((position) => {
            setLocation(position);
            setIsLoading(false);
          });
        }
      });
    }
  }, []);

  return {
    isSupported,
    location,
    isLoading,
    error,
  };
}
