### Table of contents

- [Foweather 💡](#foweather-)
  - [How to access](#how-to-access)
  - [Running app ✨](#running-app-)
  - [Running tests](#running-tests)
  - [Development 💻](#development-)

# Foweather 💡

This project was created for a job test at Fohat ⚡

It's a Next.JS application that uses [OpenWeather][openweather] to show current and forecast weather data.

The app uses the `navigator.geolocation` service to get user aproximate coordinates and use it to get weather data from [OpenWeather API][openweather].

The free plan of this API only provides forecast data for next 5 days, with 3 hours interval. All this data is shown at a carousel that can be dragged with mouse or fingers (when using touch screen devices).

Due to NextJS SSR capacity, the weather data is loaded and rendered at backend. This protect the API key from leak, since they is never sent to client, and the OpenWeather doesn't provide any way to restrict key usage from unauthorized entities.

**_The browser's geolocation can use the location based on the IP address. Because of this, another city near you may be displayed._**

## How to access

[Click here](https://foweather.vercel.app/) 😁

## Running app ✨

1. Clone this repo
2. Run `npm i` or `yarn` to install dependencies
3. Create a file called `.env.local` at project root and add the content:

```
API_KEY=PASTE YOUR API KEY HERE
```

4. Run `npm run dev` or `yarn dev`
5. Open http://localhost:3000 with your browser

## Running tests

```sh
npm run test
# or using yarn
yarn test
```

## Development 💻

Libs used:

- @material-ui
- axios
- date-fns
- nextjs
- pure-react-carousel
- styled-components

Tools:

- Visual Studio Code
- Firefox browser
- OhMyZsh
- Insomnia
- KDE Neon 20.04
- Windows 10 (because a software update broken my KDE 😅)

Computer:

- Notebook
  - CPU: Intel i5-7200U
  - Memory: 16GB
  - SSD 240 GB
  - Dualboot: KDE Neon 20.04 / Windows 10
  - NVidia 920mx / Intel Graphics

[openweather]: https://openweathermap.org/
