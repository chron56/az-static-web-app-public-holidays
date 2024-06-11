import {useEffect, useState} from "react";
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);
    const [country, setCountry] = useState(null);
    const [year, setYear] = useState("");
    const [holidays, setHolidays] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();

        async function fetchData3() {
            try {
                const response = await axios.get('https://date.nager.at/api/v3/PublicHolidays/' + year + '/' + country.countryCode);
                console.log(response.data);
                setHolidays(response.data)

            } catch (error) {
                console.error(error);
            }
        }

        fetchData3();
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const fetchCountryDetails = (e) => {
        let x = e.target.innerHTML;
        // console.log(e);
        console.log('ddddd')
        console.log(x);
        e.preventDefault();
        console.log('The Country was clicked.');

        async function fetchData2() {
            try {
                const response = await axios.get('https://date.nager.at/api/v3/CountryInfo/' + x);
                console.log(response.data);
                setCountry(response.data);
                console.log(country)
                setHolidays(null)
            } catch (error) {
                console.error(error);
            }
        }

        fetchData2();
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Enter the year for the public holidays:
                        <input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </label>
                    <input type="submit"/>
                </form>
            </div>
            {holidays ? (
                <div>
                    {holidays.map((item) => {
                        return (
                            <div>
                                <ul>
                                    <li style={{"list-style-type": "square"}}>{item.date} - {item.name} - {item.localName} </li>
                                </ul>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>Loading2...</p>
            )}
            <div>
                {country ? (
                    <div>
                        <div>
                            <h2>Country : {country.commonName}</h2>
                            <h3>Details</h3>
                            <ul>
                                <li style={{"list-style-type": "circle"}}>Official Name : {country.officialName}</li>
                                <li style={{"list-style-type": "circle"}}>Region : {country.region}</li>
                                <li style={{"list-style-type": "circle"}}>Code Country : {country.countryCode}</li>
                            </ul>
                        </div>


                    </div>
                ) : (
                    <p>No country Clicked</p>
                )}
            </div>
            <div>
                <h2>List of Countries</h2>
                {data ? (
                    <div>
                        {data.map((item) => {
                            return (
                                <div>
                                    <ul>
                                        <li style={{"list-style-type": "square"}}>
                                            <button onClick={fetchCountryDetails}>{item.countryCode} </button>
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

        </div>
    );
}

export default App;
