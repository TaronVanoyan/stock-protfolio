import React from "react";

import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";

const Stocks = ({ data: { stocks, sumValue, sumPercent } }) => {
    return (<TableContainer component={Paper}>
            <Table className="data-table" aria-label="simple table">
                <TableHead style={{backgroundColor: "#0b0b0b0d"}}>
                    <TableRow>
                        <TableCell>Stock</TableCell>
                        <TableCell>Sector</TableCell>
                        <TableCell>Units</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Portfolio Weight</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map((row) => (<TableRow key={row.id} hover={true}>
                        <TableCell scope="row">{row.name}</TableCell>
                        <TableCell><span>{row.sector}</span></TableCell>
                        <TableCell title={row.units}>
                            {row.unitsDiff ? <span className={`units-diff animation-blink ${row.unitsDiff > 0 ? "decrease" : "increase"}`} title={row.unitsDiff}>{row.unitsDiff}</span> : null }
                            <span className="ellipsis-text">{row.units}</span>
                        </TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell title={row.value}><span className="ellipsis-text">{row.value}</span></TableCell>
                        <TableCell>{`${row.portfolio_weight} %`}</TableCell>
                    </TableRow>))}
                    {sumValue ? <TableRow>
                        <TableCell colSpan={4} />
                        <TableCell>{sumValue}</TableCell>
                        <TableCell>{sumPercent} %</TableCell>
                    </TableRow> : null}
                </TableBody>
            </Table>
        </TableContainer>);
};

export default Stocks;