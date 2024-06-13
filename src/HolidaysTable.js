import {
    Table,
    TableBody,
    TableCell,
    TableCellLayout,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "@fluentui/react-components";
import {CalendarMonthRegular} from "@fluentui/react-icons";
import React from "react";

export const HolidaysTable = ({ holidays = [] }) => {

    const tableColumns = [
        {columnKey: "date", label: "Date"},
        {columnKey: "name", label: "Holiday's Name"},
        {columnKey: "localName", label: "Holiday's Local Name"},
    ];

    return (
        <div className="div-center">
            <Table
                arial-label="Default table"
                style={{
                    width: "90%",
                }}
            >
                <TableHeader style={{backgroundColor: "darkgray"}}>
                    <TableRow>
                        {tableColumns.map((column) => (
                            <TableHeaderCell key={column.columnKey}>
                                <h3>{column.label}</h3>
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                {holidays ? (
                    <TableBody style={{backgroundColor: "lightgrey"}}>
                        {holidays.map((item) => (
                            <TableRow key={item.date}>
                                <TableCell>
                                    <TableCellLayout media={<CalendarMonthRegular/>}>
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
    );
};