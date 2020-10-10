import { render, act, screen } from '@testing-library/react';

const useGeolocation = jest.requireActual('~/hooks/useGeolocation').default;

const mockGetCurrentPosition = jest.fn();
const mockQueryPermission = jest.fn();

Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: mockGetCurrentPosition,
  },
  writable: true,
});

Object.defineProperty(global.navigator, 'permissions', {
  value: {
    query: mockQueryPermission,
  },
  writable: true,
});

describe('useGeolocation hook', () => {
  it('should check for permission', async () => {
    mockQueryPermission.mockResolvedValue({
      state: 'denied',
    });

    function Component() {
      useGeolocation();

      return null;
    }

    await act(async () => {
      render(<Component />);
    });

    expect(mockQueryPermission).toHaveBeenCalledWith({ name: 'geolocation' });
  });

  it('should request for location when have permission', async () => {
    mockQueryPermission.mockResolvedValue({
      state: 'granted',
    });
    mockGetCurrentPosition.mockImplementation((cbk) =>
      cbk({
        coords: {
          latitude: 56.78,
          longitude: 87.65,
        },
      }),
    );

    function Component() {
      useGeolocation();

      return null;
    }

    await act(async () => {
      render(<Component />);
    });

    expect(mockGetCurrentPosition).toHaveBeenCalled();
  });

  it('should show error message when permission is denied', async () => {
    mockQueryPermission.mockResolvedValue({
      state: 'denied',
    });

    function Component() {
      const { error } = useGeolocation();

      return <p>{error}</p>;
    }

    await act(async () => {
      render(<Component />);
    });

    const text = screen.queryByText(/we need to access your location/i);

    expect(text).toBeTruthy();
  });

  it('should show error message about permission when geolocation callback receives error code 1', async () => {
    mockQueryPermission.mockResolvedValue({
      state: 'granted',
    });
    mockGetCurrentPosition.mockImplementation((onSuccess, onError) =>
      onError({
        code: 1,
      }),
    );

    function Component() {
      const { error } = useGeolocation();

      return <p>{error}</p>;
    }

    await act(async () => {
      render(<Component />);
    });

    const text = screen.queryByText(/you denied location access/i);

    expect(text).toBeTruthy();
  });

  it('should show error message about unavailable position when geolocation callback receives error code !== 1', async () => {
    mockQueryPermission.mockResolvedValue({
      state: 'granted',
    });
    mockGetCurrentPosition.mockImplementation((onSuccess, onError) =>
      onError({
        code: -1,
      }),
    );

    function Component() {
      const { error } = useGeolocation();
      return <p>{error}</p>;
    }

    await act(async () => {
      render(<Component />);
    });

    const text = screen.queryByText(/your position is not available/i);
    expect(text).toBeTruthy();
  });
});
