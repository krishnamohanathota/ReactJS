// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CityContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [travelDate, setTravelDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { createCity, isLoading } = useCities();

  //Custom Hook
  const { lat: cityLat, lng: cityLng } = useUrlPosition();

  const navigate = useNavigate();

  //console.log("Form : " + cityLat + "," + cityLng);

  useEffect(() => {
    async function getCityDetails() {
      try {
        if (!cityLat || !cityLng) return;

        setErrorMessage("");
        setIsLoadingGeoCoading(true);
        const res = await fetch(
          `${BASE_URL}?latitude=${cityLat}&longitude=${cityLng}`
        );
        if (!res.ok)
          throw new Error("Unable to get city details based on lat long");

        const data = await res.json();
        //console.log(data);
        if (!data.countryCode) {
          throw new Error(
            "That doesn't seems to be a city. Click somewhere else 😊"
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (e) {
        console.log("getCityDetails error:" + e);
        setErrorMessage(e.message);
      } finally {
        setIsLoadingGeoCoading(false);
      }
    }

    getCityDetails();
  }, [cityLat, cityLng]);

  if (isLoadingGeoCoding) {
    return <Spinner />;
  }

  if (!cityLat || !cityLng)
    return <Message message="Please select correct location on the Map" />;

  if (errorMessage) {
    return <Message message={errorMessage} />;
  }

  //Form Submit - Add new city
  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !travelDate) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date: travelDate,
      notes,
      position: { lat: cityLat, lng: cityLng },
    };

    //console.log(newCity);
    await createCity(newCity);
    navigate("/app/cities");
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="travelDate">When did you go to {cityName}?</label>
        {/*<input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
  />*/}
        <DatePicker
          id="travelDate"
          selected={travelDate}
          onChange={(date) => setTravelDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
