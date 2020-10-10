import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import { address } from 'faker';

import IndexPage from '~/pages';
import mockUseGeolocation from '~/hooks/useGeolocation';

describe('Index page testing', () => {
  it('should get location and navigate to dashboard', () => {
    const [latitude, longitude] = [address.latitude(), address.longitude()];
    const { push } = useRouter();

    (mockUseGeolocation as jest.Mock).mockReturnValue({
      isSupported: true,
      location: {
        coords: {
          latitude,
          longitude,
        },
      },
      isLoading: true,
      error: null,
    });

    render(<IndexPage />);

    expect(mockUseGeolocation).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith({
      pathname: '/dashboard/[lat]/[lon]/',
      query: {
        lat: latitude,
        lon: longitude,
      },
    });
  });

  it('should display error message to user', () => {
    (mockUseGeolocation as jest.Mock).mockReturnValue({
      isSupported: true,
      location: null,
      isLoading: false,
      error: 'Testing error with jest',
    });

    const { queryByText } = render(<IndexPage />);

    expect(queryByText('Testing error with jest')).toBeTruthy();
  });
});
