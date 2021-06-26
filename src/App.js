import React, { useCallback, useEffect, useState } from "react";

// Styling
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import "./App.css";

import { calculatePercentage, generateInteger, toOppositeSign } from "./helpers/utils";
import ConfigurationModal from "./components/ConfigurationModal";
import { StockList } from "./contstants/stocks";
import Stocks from "./components/Stocks";

function App() {
    const [state, setState] = useState({
        stocks: StockList,
        sumValue: 0,
        isBalanced: false
    });
    const [openModal, setOpenModal] = useState(false);

    const changePrice = useCallback(() => {
        let totalValue = 0;

        const stocks = state.stocks.map((stock, index) => {
            const price = generateInteger();
            const value = stock.units * price;
            totalValue += value;

            return {
                ...stock,
                value,
                price
            }
        });

        const updatedStocks = stocks.map(stock => {
            return {
                ...stock,
                portfolio_weight: calculatePercentage(stock.value, totalValue)
            }
        });

        setState({
            stocks: updatedStocks,
            sumValue: totalValue,
            isBalanced: false
        })
    }, [state.stocks]);

    const onSave = useCallback((percentages) => {
        const stocks = state.stocks.map(stock => {
            return {
                ...stock,
                percentage: percentages[stock.id]
            }
        });

        setState({
            ...state,
            isBalanced: false,
            stocks
        });
    }, [state]);

    const calculateBalancingStocks = () => {
        const stocks = state.stocks.map(stock => {
            const value = (state.sumValue / 100) * stock.percentage;
            const countOfUnits = (stock.value - value) / stock.price;
            const units = stock.units - countOfUnits;

            return {
                ...stock,
                units,
                value,
                unitsDiff: toOppositeSign(countOfUnits),
                portfolio_weight: stock.percentage
            };
        });
        setState(prevState => ({
            ...prevState,
            isBalanced: true,
            stocks
        }));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => changePrice(), []);

    return (
        <div className="App">
            <div className="data-table-container">
                <Stocks data={state} />
                <div>
                    <List>
                        <ListItem>
                            <InfoIcon color="primary" style={{ fontSize: 20, marginRight: 5 }} />
                            <ListItemText primary={<Typography style={{ fontSize: 13 }}><span className="active-text" onClick={changePrice}>Change</span> price</Typography>}/>
                        </ListItem>

                        <ListItem>
                            <InfoIcon color="primary" style={{ fontSize: 20, marginRight: 5 }} />
                            <ListItemText primary={<Typography style={{ fontSize: 13 }}>The calculation is made in the following percentages, which you can <span className="active-text" onClick={() => setOpenModal(true)}>change</span>։ {`${state.stocks[0].percentage} / ${state.stocks[1].percentage}`}</Typography>}/>
                        </ListItem>

                        {!state.isBalanced ? <ListItem>
                            <InfoIcon style={{ color: "orange", fontSize: 20, marginRight: 5 }} />
                            <ListItemText primary={<Typography style={{fontSize: 13}}>The prices was changed and you should <span className="active-text" onClick={calculateBalancingStocks}>rebalance</span> your profile weight.</Typography>} />
                        </ListItem> : null}
                    </List>
                </div>
            </div>

            {state.stocks.length ? <ConfigurationModal open={openModal} onClose={() => setOpenModal(false)} onSave={onSave} stocks={state.stocks}/> : null}
        </div>
    );
}

export default App;
