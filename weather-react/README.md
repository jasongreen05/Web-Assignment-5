# Weather Dashboard (React)
## Install and run

You need Node.js installed. In the project folder:


npm install
npm run dev


Then open the link shown in the terminal 

## Components

Each component is in its own file in `src/components/`.

- **App** (`src/App.jsx`): holds the state and fetches the weather with `useEffect`
- **SearchBar**: the form with the city input, sends the city up with `onSearch`
- **WeatherCard**: shows the weather for the city
- **Loading**: shown while the data is loading
- **ErrorMessage**: shown when the city is not found or the request fails

`src/api.js` has the fetch functions from Assignment 4 (`getJSON`, `loadWeather`, `friendly`).

## State and props

- `city`, `weather`, `status` and `error` are in App, because SearchBar changes the city and the other components show the result (lifting state up).
- SearchBar keeps its own `text` for the input.
- `useEffect(..., [city])` runs again every time a new city is searched.
- `status` decides what is shown: loading, error, or the weather card.
- Props only go one level down (App to each child), so there is no prop drilling.
