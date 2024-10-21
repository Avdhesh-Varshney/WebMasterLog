"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

function getCurrentDate() {
  const currentDate = new Date();
  const options = { month: "long" };
  const monthName = currentDate.toLocaleString("en-US", options);
  const date = new Date().getDate() + ", " + monthName;
  return date;
}

const Home = () => {
  const date = getCurrentDate();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState("Ghaziabad");
  const [time, setTime] = useState<string>("");

  // Fetch Weather Data by City
  async function fetchData(cityName: string) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fetch Weather Data by Coordinates
  async function fetchDataByCoordinates(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Mapping for weather conditions to icons
  const weatherIconMapping = {
    clear: "wi-day-sunny",
    rain: "wi-rain",
    thunderstorm: "wi-thunderstorm",
    snow: "wi-snow",
    mist: "wi-fog",
    clouds: "wi-cloudy",
    fog: "wi-fog",
  };

  // Update Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get user coordinates for weather data
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  // Determine weather icon based on the description
  const weatherDescription = weatherData?.weather[0]?.main?.toLowerCase();
  const weatherIconClass =
    weatherIconMapping[weatherDescription] || "wi-day-cloudy";

  return (
    <main className={styles.main}>
      <article className={styles.widget}>
        <form
          className={styles.weatherLocation}
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(city);
          }}
        >
          <input
            className={styles.input_field}
            placeholder="Enter city name"
            type="text"
            id="cityName"
            name="cityName"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className={styles.search_button} type="submit">
            Search
          </button>
        </form>
        <div className={styles.time}>Current Time: {time}</div>
        {weatherData && weatherData.weather && weatherData.weather[0] ? (
          <>
            <div className={styles.icon_and_weatherInfo}>
              <div className={styles.weatherIcon}>
                <i className={`wi ${weatherIconClass}`}></i>
              </div>
              <div className={styles.weatherInfo}>
                <div className={styles.temperature}>
                  <span>
                    {(weatherData?.main?.temp - 273.5).toFixed(2) +
                      String.fromCharCode(176)}
                  </span>
                </div>
                <div className={styles.weatherCondition}>
                  {weatherData?.weather[0]?.description?.toUpperCase()}
                </div>
              </div>
            </div>
            <div className={styles.place}>{weatherData?.name}</div>
            <div className={styles.date}>{date}</div>
          </>
        ) : (
          <div className={styles.place}>Loading...</div>
        )}
      </article>
    </main>
  );
};

export default Home;
