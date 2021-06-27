import React from "react";

import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { maxUnits } from "../constants/stocks";

const InformationMessage = ({ stocks, changePrice, openModal, sumUnits }) => {
    return (
        <List>
            { sumUnits < maxUnits
                ? (<>
                    <ListItem>
                        <InfoIcon color="primary" style={{ fontSize: 20, marginRight: 5 }} />
                        <ListItemText primary={<Typography style={{ fontSize: 13 }}><span className="active-text" onClick={changePrice}>Change</span> price</Typography>}/>
                    </ListItem>

                    <ListItem>
                        <InfoIcon color="primary" style={{ fontSize: 20, marginRight: 5 }} />
                        <ListItemText primary={<Typography style={{ fontSize: 13 }}>The calculation is made in the following percentages, which you can <span className="active-text" onClick={openModal}>change</span>։ {stocks.map((stock, index) => `${stock.percentage}${index !== stocks.length - 1 ? ' / ' : ''}`)}</Typography>}/>
                    </ListItem>
                </>)
                : <ListItem>
                    <InfoIcon style={{ color: "red", fontSize: 20, marginRight: 5 }} />
                    <ListItemText primary={<Typography style={{ fontSize: 13 }}>Your units count can't be more then {maxUnits}</Typography>}/>
                </ListItem>
            }
        </List>
    )
};

export default InformationMessage;