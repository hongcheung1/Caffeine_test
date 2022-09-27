import { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default () => {
    const [drinks, setDrinks] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:5000/api/drinks').then((res) => {
        setDrinks(res.data.drinks);
      });
    }, []);

    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Drink Name</TableCell>
            <TableCell>Caffeine per Serving</TableCell>
            <TableCell>Servings per Can</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drinks.map((drink) => (
            <TableRow
              key={drink.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="drink">
                {drink.name}
              </TableCell>
              <TableCell>{drink.caffeine}</TableCell>
              <TableCell>{drink.serving}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
};