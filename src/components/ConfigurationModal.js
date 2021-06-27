import React, { useEffect, useState } from "react";

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const ConfigurationModal = ({ open, onSave, closeModal, stocks }) => {
    const [state, setState] = useState({});

    const onChangePercentage = (id, value) => {
        setState(prevState => ({
            ...prevState,
            [id]: Number(value)
        }))
    };

    const onSavePercentage = () => {
        const updatedStocks = stocks.map(stock => {
            return {
                ...stock,
                percentage: state[stock.id]
            }
        });

        onSave(prevValue => ({
            ...prevValue,
            isPriceChanged: true,
            stocks: updatedStocks
        }));

        closeModal();
    };

    useEffect(() => {
        const newState = {};
        stocks.forEach(stock => newState[stock.id] = stock.percentage);

        setState(newState);
    }, [stocks]);

    return (
        <Dialog open={open} onClose={closeModal} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Configure portfolio weight</DialogTitle>
            <DialogContent>
                {stocks.map(stock => (
                    <TextField
                        key={stock.id}
                        autoFocus
                        fullWidth
                        margin="dense"
                        label={stock.name}
                        type="number"
                        defaultValue={stock.percentage}
                        onChange={event => onChangePercentage(stock.id, event.target.value)}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="default">Cancel</Button>
                <Button onClick={onSavePercentage} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfigurationModal;