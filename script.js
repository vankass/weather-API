const form = document.querySelector("[data-js-weather-form]");
const error = document.querySelector("[data-js-weather-error]");
const loading = document.querySelector("[data-js-weather-loading]");

const city = document.querySelector("[data-js-weather-city]");
const temp = document.querySelector("[data-js-weather-temp]");
const descText = document.querySelector("[data-js-weather-desc-text]");
const descIcon = document.querySelector("[data-js-weather-desc-icon]");
const wind = document.querySelector("[data-js-weather-wind]");
const info = document.querySelector("[data-js-weather-container]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputText = document
    .querySelector("[data-js-weather-input]")
    .value.trim();

  if (inputText === "") return;

  const data = await getWeather(inputText);
  showWeather(data);
});

async function getWeather(inputText) {
  info.classList.remove("loaded");
  loading.hidden = false;
  error.hidden = true;

  const apiKey = "99bb5e6bb43074fd151553d13571bd81";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("City not found!");
    }

    return await response.json();
  } catch (err) {
    error.hidden = false;
    loading.hidden = true;
  } finally {
    loading.hidden = true;
  }
}

async function showWeather(data) {
  info.hidden = true;
  loading.hidden = false;

  const iconCode = data.weather[0].icon;
  descIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  city.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  descText.textContent = data.weather[0].description;
  wind.textContent = `Wind: ${data.wind.speed} m/s`;

  descIcon.onload = () => {
    loading.hidden = true;
    info.hidden = false;
  };

  info.classList.add("loaded");
}
