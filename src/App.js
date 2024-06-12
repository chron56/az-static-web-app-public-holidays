import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { CalendarMonthRegular } from "@fluentui/react-icons";
import {
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    Dropdown,
    Card,
    CardHeader,
    Input,
    Label,
    Button,
    Body1,
    Caption1,
    Divider,
    Option,
} from "@fluentui/react-components";

function App() {
    const [countries, setCountries] = useState(null);
    const [country, setCountry] = useState(null);
    const [year, setYear] = useState("");
    const [holidays, setHolidays] = useState(null);

    const tableColumns = [
        { columnKey: "date", label: "Date" },
        { columnKey: "name", label: "Holiday's Name" },
        { columnKey: "localName", label: "Holiday's Local Name" },
    ];

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

            <div className="div-1of3">
                <Card appearance="outline" style={{ backgroundColor: "lightgrey" }}>
                    <CardHeader
                        header={
                            <Body1>
                                <b>Country's Info Card</b>
                            </Body1>
                        }
                        description={<Caption1>Details</Caption1>}
                    />

                    {country ? (
                        <div>
                            <ul>
                                <li style={{ listStyleType: "circle" }}>
                                    <b>Official Country Name : </b> {country.officialName}
                                </li>
                                <li style={{ listStyleType: "circle" }}>
                                    <b>Region of the Country: </b> {country.region}
                                </li>
                                <li style={{ listStyleType: "circle" }}>
                                    <b>Country Code : </b> {country.countryCode}
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <p style={{ color: "#FF0000" }}>Please select a country</p>
                    )}
                </Card>
            </div>

            <Divider />

            <div className="div-center">
                <Button
                    size="large"
                    icon={<CalendarMonthRegular />}
                    onClick={handleFindHolidaysClick}
                    appearance="success"
                >
                    Find out holidays
                </Button>
            </div>

            <Divider />

            <div className="div-center">
                <Table
                    arial-label="Default table"
                    style={{
                        width: "90%",
                    }}
                >
                    <TableHeader style={{ backgroundColor: "darkgray" }}>
                        <TableRow>
                            {tableColumns.map((column) => (
                                <TableHeaderCell key={column.columnKey}>
                                    <h3>{column.label}</h3>
                                </TableHeaderCell>
                            ))}
                        </TableRow>
                    </TableHeader>
                    {holidays ? (
                        <TableBody style={{ backgroundColor: "lightgrey" }}>
                            {holidays.map((item) => (
                                <TableRow key={item.date}>
                                    <TableCell>
                                        <TableCellLayout media={<CalendarMonthRegular />}>
                                            {item.date}
                                        </TableCellLayout>
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.localName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody></TableBody>
                    )}
                </Table>
            </div>
            
        </div>
    );
}

export default App;
