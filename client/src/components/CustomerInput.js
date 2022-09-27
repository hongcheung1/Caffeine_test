import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';  
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default () => {
    const [drinks, setDrinks] = useState([]);
    const [drink, setDrink] = React.useState(0);
    const [consumed, setConsumed] = React.useState(0);
    const [left, setLeft] = React.useState(0);
    const [result, setResult] = React.useState(0);

    useEffect(() => {
      axios.get('http://localhost:5000/api/drinks').then((res) => {
        setDrinks(res.data.drinks);
      });
    }, []);

    console.log(drinks);

    const handleChange = (event) => {
        setDrink(event.target.value);
    };

    const handleCalc = () => {
        axios.post('http://localhost:5000/api/drinks/calc', {
            favourite: drink,
            consumed: consumed
        }).then((res) => {
            console.log(res.data);
            setResult(res.data.result);
            setLeft(res.data.avail);
        });
    }
    return (
        <>
            <Grid container spacing={2} className="calc-container" justifyContent="flex-start" alignItems="center">
                <Grid item xs={5} md={5} sm={5}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Your Favourite</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Drink"
                        onChange={handleChange}
                        >
                            { 
                                drinks.map(drink => <MenuItem value={drink.id}>{drink.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={4} sm={4}>
                    <TextField id="outlined-basic" label="Consumed * Servings" variant="outlined" type="number" value={consumed} onChange={e => setConsumed(Number(e.target.value))}/>
                </Grid>
                <Grid item xs={3} md={3} sm={3} justifyContent="flex-start" alignItems="center">
                    <Button variant="contained" onClick={handleCalc}>Calculate</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} className="res-container">
                {
                    result === -1 ? 
                        (<h3>Input correct data!</h3>) : 
                        result === 0 ? 
                            (<h3>You've already exceed your limits</h3>)
                            :
                            (<h3>You will be able to consume more <b>{left}</b> servings</h3>)
                }
            </Grid>
        </>
    )
}