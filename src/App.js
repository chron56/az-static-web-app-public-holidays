import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [countries, setCountries] = useState(null);
    const [country, setCountry] = useState(null);
    const [year, setYear] = useState("");
    const [holidays, setHolidays] = useState(null);

    const handleYearSubmission = (event) => {
        event.preventDefault();

        async function fetchHolidays() {
            try {
                const response = await axios.get(
                    "https://date.nager.at/api/v3/PublicHolidays/" +
                    year +
                    "/" +
                    country.countryCode
                );
                console.log(response.data);
                setHolidays(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchHolidays();
    };

    useEffect(() => {
        async function fetchCountries() {
            try {
                const response = await axios.get(
                    "https://date.nager.at/api/v3/AvailableCountries"
                );
                setCountries(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCountries();
    }, []);

    const handleCountrySelection = (e) => {
        let x = e.target.value;
        e.preventDefault();
        console.log("The Country was clicked.");

        async function fetchCountryDetails() {
            try {
                const response = await axios.get(
                    "https://date.nager.at/api/v3/CountryInfo/" + x
                );
                console.log(response.data);
                setCountry(response.data);
                console.log(country);
                setHolidays(null);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCountryDetails();
    };

    return (
        <div>
            <div>
                <h2>List of Countries</h2>
                {countries ? (
                    <div>
                        <select onChange={handleCountrySelection}>
                            {countries.map((item) => {
                                return (
                                    <option key={item.countryCode} value={item.countryCode}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div>
                {country ? (
                    <div>
                        <div>
                            <h2>Country : {country.commonName}</h2>
                            <h3>Details</h3>
                            <ul>
                                <li style={{ "list-style-type": "circle" }}>
                                    Official Name : {country.officialName}
                                </li>
                                <li style={{ "list-style-type": "circle" }}>
                                    Region : {country.region}
                                </li>
                                <li style={{ "list-style-type": "circle" }}>
                                    Code Country : {country.countryCode}
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p>No country Clicked</p>
                )}
            </div>
            <div>
                <form onSubmit={handleYearSubmission}>
                    <label>
                        <b>Enter the year for the public holidays:</b>
                        <input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </label>
                    <input type="submit" />
                </form>

                {holidays ? (
                    <div>
                        {holidays.map((item) => {
                            return (
                                <div>
                                    <ul>
                                        <li key={item.date} style={{ "list-style-type": "square" }}>
                                            {item.date} - {item.name} - {item.localName}{" "}
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>Loading2...</p>
                )}
            </div>
        </div>
    );
}

export default App;
