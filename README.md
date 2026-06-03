# 🌦 Berlin Weather App

A real-time weather website locked to **Berlin, Germany**. It fetches live conditions and renders a fully animated scene — rain, sunshine, snow, fog, or thunder — that matches the actual weather.

#######

## ✨ Features

- 🌍 **Berlin-only** — hardcoded to `52.52°N, 13.40°E`
- 📡 **Live data** via [Open-Meteo API](https://open-meteo.com/) — free, no API key required
- 🎨 **6 animated weather scenes**
  - ☀️ Sunny — glowing sun with rotating rays and heat shimmer
  - 🌧 Rain — animated raindrops (intensity scales with weather severity)
  - ☁️ Cloudy — slow-drifting layered clouds
  - ❄️ Snow — falling and rotating snowflakes
  - 🌫 Fog — gentle drifting fog banks
  - ⛈ Thunderstorm — heavy rain with lightning flash
- 🔄 **Auto-refresh** every 10 minutes
- 📱 **Responsive** — works on desktop and mobile
- 🚫 **No dependencies** — pure HTML, CSS, and JavaScript

######

## 📁 File Structure

```
berlin-weather/
├── index.html    # App structure and layout
├── style.css     # Animations and weather scene themes
├── weather.js    # API fetch, data rendering, scene logic
└── README.md     # This file
```

#######

## 🚀 Getting Started

### Run Locally

1. Clone or download this repository
2. Open `index.html` in any modern browser

> No build tools, no npm install, no server needed.

### Deploy to GitHub Pages

1. Push all files to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **branch: `main`**, folder: **`/ (root)`**
4. Click **Save**
5. Your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>
   ```

######

## 🌐 API Reference

**Provider:** [Open-Meteo](https://open-meteo.com/)  
**Cost:** Free — no API key, no sign-up  
**Endpoint used:**

```
https://api.open-meteo.com/v1/forecast
  ?latitude=52.52
  &longitude=13.4050
  &current=temperature_2m,apparent_temperature,precipitation,
           weather_code,relative_humidity_2m,wind_speed_10m,uv_index
  &daily=temperature_2m_max,temperature_2m_min
  &timezone=Europe/Berlin
  &forecast_days=1
```

**Data displayed:**

| Field | Description |
|---|---|
| Temperature | Current °C |
| Feels Like | Apparent temperature |
| High / Low | Daily max and min |
| Humidity | Relative humidity % |
| Wind | Speed in km/h |
| Precipitation | Current mm |
| UV Index | Current UV level |

######

## 🎨 Weather Scene Map

The app maps [WMO weather codes](https://open-meteo.com/en/docs#weathervariables) to visual scenes:

| WMO Code | Condition | Scene |
| 0 – 1 | Clear / Mainly Clear | ☀️ Sunny |
| 2 – 3 | Partly Cloudy / Overcast | ☁️ Cloudy |
| 45 – 48 | Fog / Rime Fog | 🌫 Fog |
| 51 – 67 | Drizzle / Rain / Freezing Rain | 🌧 Rain |
| 71 – 77 | Snow / Snow Grains | ❄️ Snow |
| 80 – 82 | Rain Showers | 🌧 Rain |
| 85 – 86 | Snow Showers | ❄️ Snow |
| 95 – 99 | Thunderstorm | ⛈ Thunder |

######

## 🛠 Tech Stack

- **HTML5** - semantic structure
- **CSS** — keyframe animations, CSS variables, backdrop-filter
- **Vanilla JavaScript** — fetch API, DOM manipulation
- **Google Fonts** — Bebas Neue (display) + DM Sans (body)

######

## 📄 License

MIT — free to use, modify, and distribute.
