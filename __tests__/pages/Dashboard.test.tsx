import { render } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import { address } from 'faker';

import Dashboard, { getServerSideProps } from '~/pages/dashboard/[lat]/[lon]';
import api from '~/services/api';

const mockAdapter = new AxiosMock(api);

describe('Dashboard screen', () => {
  it('rendered component should match snapshot', () => {
    const { baseElement } = render(
      <Dashboard
        current={{
          name: 'City Name',
          sys: {
            country: 'COUNTRY',
          },
          weather: [
            {
              id: 803,
              main: 'Clouds',
              description: 'broken clouds',
              icon: '04n',
            },
          ],
          main: {
            temp: 69.8,
            feels_like: 64.26,
            temp_min: 69.8,
            temp_max: 69.8,
            pressure: 1013,
            humidity: 36,
            sea_level: 1013,
            grnd_level: 934,
          },
        }}
        forecast={{
          list: [
            {
              dt: 1602374400,
              main: {
                temp: 71.42,
                feels_like: 68.68,
                temp_min: 68.68,
                temp_max: 71.42,
                pressure: 1011,
                sea_level: 1011,
                grnd_level: 933,
                humidity: 53,
                temp_kf: 1.52,
              },
              weather: [
                {
                  id: 803,
                  main: 'Clouds',
                  description: 'broken clouds',
                  icon: '04n',
                },
              ],
              clouds: {
                all: 78,
              },
              wind: {
                speed: 6.73,
                deg: 140,
              },
              visibility: 10000,
              pop: 0,
              sys: {
                pod: 'n',
              },
              dt_txt: '2020-10-11 00:00:00',
            },
            {
              dt: 1602385200,
              main: {
                temp: 66.54,
                feels_like: 61.32,
                temp_min: 64.47,
                temp_max: 66.54,
                pressure: 1013,
                sea_level: 1013,
                grnd_level: 934,
                humidity: 60,
                temp_kf: 1.15,
              },
              weather: [
                {
                  id: 801,
                  main: 'Clouds',
                  description: 'few clouds',
                  icon: '02n',
                },
              ],
              clouds: {
                all: 22,
              },
              wind: {
                speed: 10.51,
                deg: 139,
              },
              visibility: 10000,
              pop: 0,
              sys: {
                pod: 'n',
              },
              dt_txt: '2020-10-11 03:00:00',
            },
          ],
        }}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('getServerSideProps should fetch data', async () => {
    mockAdapter.onGet().reply(200, {});
    const [lat, lon] = [address.latitude(), address.longitude()];

    const response = await getServerSideProps({
      query: {
        lat,
        lon,
      },
      resolvedUrl: '',
      req: null,
      res: null,
    });

    expect(
      mockAdapter.history.get.map(({ url, params }) => ({
        url,
        params,
      })),
    ).toMatchObject([
      {
        url: 'weather',
        params: {
          lat,
          lon,
        },
      },
      {
        url: 'forecast',
        params: {
          lat,
          lon,
        },
      },
    ]);
    expect(response).toMatchSnapshot({
      props: {
        current: {},
        forecast: {},
      },
    });
  });
});
