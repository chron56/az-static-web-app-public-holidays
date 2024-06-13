import React, { useEffect, useState} from "react";
import axios from "axios";
import "./App.css";
import { CalendarMonthRegular } from "@fluentui/react-icons";
import {
    Dropdown,
    Input,
    Label,
    Button,
    Divider,
    Option,
} from "@fluentui/react-components";
import {HolidaysTable} from "./HolidaysTable";
import {CountryCard} from "./CountryCard";

function App() {
    const [countries, setCountries] = useState(null);
    const [country, setCountry] = useState(null);
    const [year, setYear] = useState("");
    const [holidays, setHolidays] = useState(null);

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

    const handleCountrySelection = (countryCode) => {
        setHolidays(null);

        async function fetchCountryDetails() {
            try {
                const response = await axios.get(
                    "https://date.nager.at/api/v3/CountryInfo/" + countryCode
                );
                setCountry(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCountryDetails();
    };

    const handleFindHolidaysClick = () => {
        async function fetchHolidays() {
            try {
                const response = await axios.get(
                    "https://date.nager.at/api/v3/PublicHolidays/" +
                    year +
                    "/" +
                    country.countryCode
                );
                setHolidays(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchHolidays();
    };

    return (
        <div>

            <div className="div-center" style={{ backgroundColor: "lightgrey" }}>
                <h1>Worldwide Holidays</h1>
            </div>

            <Divider />

            <div className="div-1of3">
                <Label>
                    <b>Country : </b>
                </Label>
                {countries ? (
                    <Dropdown
                        placeholder="Select Country"
                        onOptionSelect={(_, data) =>
                            handleCountrySelection(data.optionValue)
                        }
                    >
                        {countries.map((item) => (
                            <Option key={item.countryCode} value={item.countryCode}>
                                {item.name}
                            </Option>
                        ))}
                    </Dropdown>
                ) : (
                    <p style={{ color: "#FF0000" }}>Dropdown is not available</p>
                )}
            </div>

            <div className="div-1of3">
                <Label>
                    <b>Year : </b>
                </Label>
                <Input
                    type="number"
                    placeholder="Set Year"
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>

            <CountryCard country={country}/>

            <Divider />

            <div className="div-center">
                <Button
                    size="large"
                    icon={<CalendarMonthRegular />}
                    onClick={handleFindHolidaysClick}
                    appearance="primary"
                >
                    Find out holidays
                </Button>
            </div>

            <Divider />

            <HolidaysTable holidays={holidays} />
        </div>
    );
}

export default App;
