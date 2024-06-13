import {Body1, Caption1, Card, CardHeader} from "@fluentui/react-components";
import React from "react";


export const CountryCard = ({ country  = [] }) => {

    return (
        <div className="div-1of3">
            <Card appearance="outline" style={{backgroundColor: "lightgrey"}}>
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
                            <li style={{listStyleType: "circle"}}>
                                <b>Official Country Name : </b> {country.officialName}
                            </li>
                            <li style={{listStyleType: "circle"}}>
                                <b>Region of the Country: </b> {country.region}
                            </li>
                            <li style={{listStyleType: "circle"}}>
                                <b>Country Code : </b> {country.countryCode}
                            </li>
                        </ul>
                    </div>
                ) : (
                    <p style={{color: "#FF0000"}}>Please select a country</p>
                )}
            </Card>
        </div>
    );
};