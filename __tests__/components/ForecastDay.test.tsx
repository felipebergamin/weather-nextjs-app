import { render } from '@testing-library/react';

import App from '../../src/components/ForecastDay';

describe('testing app', () => {
  it('should match snapshot', () => {
    const { baseElement } = render(
      <App
        data={{
          dt: 1602354646,
          main: {
            feels_like: 65.7,
            temp: 60.1,
          },
          weather: [
            {
              icon: '123',
            },
          ],
        }}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
