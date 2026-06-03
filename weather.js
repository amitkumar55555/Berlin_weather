/**
 * Berlin Weather App
 * Uses Open-Meteo API (free, no API key required)
 * https://open-meteo.com/
 */

// ── Berlin coords (fixed)
const LAT = 52.52;
const LON = 13.4050;

// ── WMO weather code → condition map
// https://open-meteo.com/en/docs#weathervariables
const WMO = {
  0:  { label: 'Clear Sky',        scene: 'sunny',   icon: '☀️' },
  1:  { label: 'Mainly Clear',     scene: 'sunny',   icon: '🌤' },
  2:  { label: 'Partly Cloudy',    scene: 'cloudy',  icon: '⛅' },
  3:  { label: 'Overcast',         scene: 'cloudy',  icon: '☁️' },
  45: { label: 'Foggy',            scene: 'fog',     icon: '🌫' },
  48: { label: 'Rime Fog',         scene: 'fog',     icon: '🌫' },
  51: { label: 'Light Drizzle',    scene: 'rain',    icon: '🌦' },
  53: { label: 'Drizzle',          scene: 'rain',    icon: '🌦' },
  55: { label: 'Heavy Drizzle',    scene: 'rain',    icon: '🌧' },
  61: { label: 'Light Rain',       scene: 'rain',    icon: '🌧' },
  63: { label: 'Rain',             scene: 'rain',    icon: '🌧' },
  65: { label: 'Heavy Rain',       scene: 'rain',    icon: '🌧' },
  66: { label: 'Freezing Rain',    scene: 'rain',    icon: '🌨' },
  67: { label: 'Heavy Freezing Rain', scene: 'rain', icon: '🌨' },
  71: { label: 'Light Snow',       scene: 'snow',    icon: '🌨' },
  73: { label: 'Snow',             scene: 'snow',    icon: '❄️' },
  75: { label: 'Heavy Snow',       scene: 'snow',    icon: '❄️' },
  77: { label: 'Snow Grains',      scene: 'snow',    icon: '❄️' },
  80: { label: 'Rain Showers',     scene: 'rain',    icon: '🌧' },
  81: { label: 'Rain Showers',     scene: 'rain',    icon: '🌧' },
  82: { label: 'Violent Showers',  scene: 'rain',    icon: '⛈' },
  85: { label: 'Snow Showers',     scene: 'snow',    icon: '🌨' },
  86: { label: 'Heavy Snow Showers', scene: 'snow',  icon: '🌨' },
  95: { label: 'Thunderstorm',     scene: 'thunder', icon: '⛈' },
  96: { label: 'Thunderstorm + Hail', scene: 'thunder', icon: '⛈' },
  99: { label: 'Heavy Thunderstorm', scene: 'thunder', icon: '⛈' },
};

// DOM refs
const $  = id => document.getElementById(id);
const el = {
  loader:   $('loader'),
  content:  $('weatherContent'),
  error:    $('errorMsg'),
  temp:     $('temp'),
  feels:    $('feels'),
  hiLo:     $('hiLo'),
  condIcon: $('condIcon'),
  condText: $('condText'),
  humidity: $('humidity'),
  wind:     $('wind'),
  precip:   $('precip'),
  uv:       $('uv'),
  updated:  $('updated'),
};

// Fetch weather from Open-Meteo
async function fetchWeather() {
  showLoader();

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${LAT}&longitude=${LON}` +
    `&current=temperature_2m,apparent_temperature,precipitation,` +
    `weather_code,relative_humidity_2m,wind_speed_10m,uv_index` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=Europe%2FBerlin` +
    `&forecast_days=1`;

  try {
    const res  = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error('Weather fetch failed:', err);
    showError();
  }
}

// Render data into the UI
function render(data) {
  const c = data.current;
  const d = data.daily;

  const code  = c.weather_code;
  const cond  = WMO[code] || { label: 'Unknown', scene: 'cloudy', icon: '❓' };

  el.temp.textContent     = `${Math.round(c.temperature_2m)}°`;
  el.feels.textContent    = `Feels like ${Math.round(c.apparent_temperature)}°C`;
  el.hiLo.textContent     = `↑ ${Math.round(d.temperature_2m_max[0])}°  ↓ ${Math.round(d.temperature_2m_min[0])}°`;
  el.condIcon.textContent = cond.icon;
  el.condText.textContent = cond.label.toUpperCase();
  el.humidity.textContent = `${c.relative_humidity_2m}%`;
  el.wind.textContent     = `${Math.round(c.wind_speed_10m)} km/h`;
  el.precip.textContent   = `${c.precipitation} mm`;
  el.uv.textContent       = c.uv_index !== undefined ? c.uv_index : '—';

  const now = new Date();
  el.updated.textContent = `Last updated ${now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`;

  applyScene(cond.scene, code);
  showContent();
}

// Scene switcher 
const SCENES = ['rain', 'sunny', 'cloudy', 'snow', 'fog', 'thunder'];

function applyScene(scene, code) {
  // Remove existing scenes
  SCENES.forEach(s => document.body.classList.remove(s));
  document.body.classList.add(scene);

  // Rain intensity based on code
  if (scene === 'rain' || scene === 'thunder') buildRain(code);
  if (scene === 'snow')  buildSnow();
  if (scene === 'sunny') buildRays();
}

function buildRain(code) {
  const container = $('rainContainer');
  container.innerHTML = '';

  // More drops for heavier rain
  const count = code >= 82 ? 220 : code >= 63 ? 160 : 100;

  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left     = `${Math.random() * 110 - 5}vw`;
    drop.style.height   = `${12 + Math.random() * 20}px`;
    drop.style.opacity  = 0.3 + Math.random() * 0.6;
    drop.style.animationDuration  = `${0.5 + Math.random() * 0.6}s`;
    drop.style.animationDelay     = `${-Math.random() * 2}s`;
    container.appendChild(drop);
  }
}

function buildSnow() {
  const container = $('snowContainer');
  container.innerHTML = '';
  const flakes = ['❄', '❅', '❆', '✦', '·'];

  for (let i = 0; i < 80; i++) {
    const f = document.createElement('div');
    f.className   = 'snowflake';
    f.textContent = flakes[Math.floor(Math.random() * flakes.length)];
    f.style.left  = `${Math.random() * 100}vw`;
    f.style.fontSize = `${8 + Math.random() * 14}px`;
    f.style.opacity  = 0.4 + Math.random() * 0.5;
    f.style.animationDuration = `${4 + Math.random() * 8}s`;
    f.style.animationDelay    = `${-Math.random() * 10}s`;
    container.appendChild(f);
  }
}

function buildRays() {
  const raysEl = $('rays');
  raysEl.innerHTML = '';
  const count = 16;
  for (let i = 0; i < count; i++) {
    const ray = document.createElement('div');
    ray.className = 'ray';
    ray.style.transform = `rotate(${i * (360 / count)}deg) translateX(-50%)`;
    ray.style.opacity   = 0.5 + Math.random() * 0.4;
    raysEl.appendChild(ray);
  }
}

// UI state helpers
function showLoader() {
  el.loader.style.display  = 'flex';
  el.content.style.display = 'none';
  el.error.style.display   = 'none';
}
function showContent() {
  el.loader.style.display  = 'none';
  el.content.style.display = 'block';
  el.error.style.display   = 'none';
}
function showError() {
  el.loader.style.display  = 'none';
  el.content.style.display = 'none';
  el.error.style.display   = 'flex';
}

// Auto-refresh every 10 minutes
fetchWeather();
setInterval(fetchWeather, 10 * 60 * 1000);
