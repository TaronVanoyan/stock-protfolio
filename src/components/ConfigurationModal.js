import React, { useState } from "react";

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const ConfigurationModal = ({ open, onSave, onClose, stocks }) => {
    const [state, setState] = useState({});

    const onChangePercentage = (id, value) => {
        setState(prevState => ({
            ...prevState,
            [id]: Number(value)
        }))
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Configure portfolio weight</DialogTitle>
            <DialogContent>
                {stocks.map(stock => (
                    <TextField
                        key={stock.id}
                        autoFocus
                        margin="dense"
                        label={stock.name}
                        type="number"
                        defaultValue={stock.percentage}
                        onChange={(event) => {
                            onChangePercentage(stock.id, event.target.value)
                        }}
                        fullWidth
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="default">Cancel</Button>
                <Button onClick={() => {
                    onClose(false);
                    onSave(state)
                }} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfigurationModal;