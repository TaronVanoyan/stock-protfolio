import React, { useCallback, useEffect, useState } from "react";

// Styling
import "./App.css";

import { calculatePercentage, generateInteger, roundNumber, toOppositeSign } from "./helpers/utils";
import ConfigurationModal from "./components/ConfigurationModal";
import InformationMessage from "./components/InformationMessage";
import { StockList } from "./constants/stocks";
import Stocks from "./components/Stocks";

function App() {
    const [state, setState] = useState({
        stocks: StockList,
        sumValue: 0,
        sumPercent: 0,
        isPriceChanged: false
    });
    const [openModal, setOpenModal] = useState(false);

    const changePrice = useCallback((isCalculateStock) => {
        let totalValue = 0,
            totalPercent = 0;

        const stocks = state.stocks.map(stock => {
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
            let percent = calculatePercentage(stock.value, totalValue);
            totalPercent += percent;

            return {
                ...stock,
                portfolio_weight: percent
            };
        });

        setState(prevState => ({
            ...prevState,
            stocks: updatedStocks,
            sumValue: totalValue,
            sumPercent: roundNumber(totalPercent),
            isPriceChanged: isCalculateStock
        }));
    }, [state.stocks]);

    const calculateStock = useCallback(() => {
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
            stocks,
            isPriceChanged: false
        }));
    }, [state.stocks, state.sumValue]);

    useEffect(() => changePrice(), []);

    useEffect(() => {
        if (state.isPriceChanged) {
            calculateStock();
        }
    }, [state.isPriceChanged, calculateStock]);

    return (
        <div className="App">
            <div className="data-table-container">
                <Stocks data={state} />
                <InformationMessage stocks={state.stocks}
                                    changePrice={() => changePrice(true)}
                                    openModal={() => setOpenModal(true)} />
            </div>

            {state.stocks.length
                ? <ConfigurationModal stocks={state.stocks}
                                      open={openModal}
                                      closeModal={() => setOpenModal(false)}
                                      onSave={setState} />
                : null}
        </div>
    );
}

export default App;
