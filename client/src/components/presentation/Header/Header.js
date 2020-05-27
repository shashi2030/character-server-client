import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import * as constants from '../../../constants';
import * as utils from '../../../utils';
import './Header.scss';


export const Header = (props) => {
    const [age, setAge] = React.useState('');

    const handleSorting = (event) => {
        setAge(event.target.value);
        props.handleSorting(event.target.value)
    };
    const logOut = () => {
        utils.removeFromLocalStorage(["name", "loginId", "userId"]);
        props.handleLogout();
    }
    const getUser = () => {
        return localStorage.getItem('name');
    }
    return (
        <header>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <h1>{constants.APP_HEADING}</h1>
                    <span className="username">Welcome <span>{getUser()}</span></span>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth={true} id="outlined-search" onChange={props.searchByName} label="Search by Name" type="search" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4} className="select">
                    <FormControl variant="outlined" className='formControl'>
                        <InputLabel id="demo-simple-select-outlined-label">Sort by ID</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={age}
                            onChange={handleSorting}
                            label="sortingbyid"                        >
                            <MenuItem value={'asc'}>Ascending</MenuItem>
                            <MenuItem value={'dsc'}>Descending</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" size="large" onClick={logOut} color="primary">
  Logout
</Button>
                </Grid>
            </Grid>
        </header>
    )
}