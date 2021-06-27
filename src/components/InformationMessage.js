import React from "react";

import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

const InformationMessage = ({ stocks, changePrice, openModal }) => {

    return (
        <List>
            <ListItem>
                <InfoIcon color="primary" style={{ fontSize: 20, marginRight: 5 }} />
                <ListItemText primary={<Typography style={{ fontSize: 13 }}><span className="active-text" onClick={changePrice}>Change</span> price</Typography>}/>
            </ListItem>

            <ListItem>
                <InfoIcon color="primary" style={{ fontSize: 20, marginRight: 5 }} />
                <ListItemText primary={<Typography style={{ fontSize: 13 }}>The calculation is made in the following percentages, which you can <span className="active-text" onClick={openModal}>change</span>։ {stocks.map((stock, index) => `${stock.percentage}${index !== stocks.length - 1 ? ' / ' : ''}`)}</Typography>}/>
            </ListItem>
        </List>
    )
};

export default InformationMessage;