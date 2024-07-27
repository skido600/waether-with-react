import React, { useState } from "react";
import search from "../assets/image/search.png";
import star from "../assets/image/clear.png";
import humidity from "../assets/image/humidity.png";
import wind from "../assets/image/wind.png";
import clouds from "../assets/image/cloud.png";
import clear from "../assets/image/clear.png";
import rain from "../assets/image/rain.png";
import drizzle from "../assets/image/drizzle.png";
import mist from "../assets/image/snow.png";

function Weather() {
  const [Data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: clouds,
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handle = async () => {
    if (name !== "") {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=613538416208b5ea9741e673dbc3f938&units=metric`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError("Invalid city. Please try again.");
            setData({
              celcius: 0,
              name: "",
              humidity: 0,
              speed: 0,
              image: "",
            });
          } else {
            setError("An error occurred. Please try again later.");
          }
          return;
        }

        const data = await response.json();
        let image = clouds;
        switch (data.weather[0].main.toLowerCase()) {
          case "clouds":
            image = clouds;
            break;
          case "clear":
            image = clear;
            break;
          case "rain":
            image = rain;
            break;
          case "drizzle":
            image = drizzle;
            break;
          case "mist":
            image = mist;
            break;
          default:
            image = clouds;
            break;
        }

        setData({
          celcius: data.main.temp,
          name: data.name,
          humidity: data.main.humidity,
          speed: data.wind.speed,
          image: image,
        });
        setError(""); // Clear any previous error messages
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("An error occurred while fetching the data.");
      }
    }
  };

  return (
    <div className="bg-main p-4 w-[300px] rounded-sm shadow-xl">
      <div className="flex justify-around items-center mt-2">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="search..."
          className="pl-2 border-none p-1 outline-none focus:border-none rounded-full placeholder:pl-1 placeholder:font-thin"
        />
        <img
          onClick={handle}
          src={search}
          className="bg-white rounded-full w-[30px] h-[30px] p-2"
          alt="search"
        />
      </div>
      {error ? (
        <p className="text-[14px] ml-4 mt-2 text-red-400">{error}</p>
      ) : (
        name && (
          <div>
            <section className="flex justify-center items-center mt-5">
              <main className="text-center">
                <img src={Data.image} width={100} alt="weather" />
                <p className="text-5xl text-white">
                  {Math.round(Data.celcius)}
                  <sup>o</sup>C
                </p>
                <p className="text-xl text-white mt-2">{Data.name}</p>
              </main>
            </section>
            <footer className="flex justify-between items-center mt-[4rem]">
              <div className="flex gap-2">
                <img
                  src={humidity}
                  className="w-[30px] h-[20px]"
                  alt="humidity"
                />
                <div className="text-white">
                  <p>{Math.round(Data.humidity)}%</p>
                  <p>humidity</p>
                </div>
              </div>
              <div className="flex gap-2">
                <img src={wind} className="w-[30px] h-[20px]" alt="wind" />
                <div className="text-white">
                  <p>{Data.speed}km/h</p>
                  <p>wind speed</p>
                </div>
              </div>
            </footer>
          </div>
        )
      )}
    </div>
  );
}

export default Weather;
