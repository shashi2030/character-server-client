import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { baseService } from '../../../service/apiService';
import Alert from '@material-ui/lab/Alert';
import * as utils from '../../../utils';

import './Login.scss';

/**
 * Define constant for Login form initial state
 */
const initialState = {
    username: "",
    password: "",
    submitted: false,
    serverError: ""
}

/**
 * @name Login
 * @extends Component
 */
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { ...initialState }
    }

    /**
     * Description: handleChange will call when user change any text in input control
     * @param  {event} e
     * @return {null}
     */
    handleChange = (e) => {
        let { name, value } = e.target;
        value = value.trim();
        this.setState({
            [name]: value
        }, () => {
            if (this.state.serverError) {
                this.setState({
                    serverError: ""
                })
            }
        })
    }


    registerNewUser = () => {
        this.props.history.push('/register');
    }

    /**
     * Description: Submit the data when user click on submit button
     * @param  {event} e
     * @return {null}
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        });
        const { username, password } = this.state;
        const data = {
            username: username,
            password: password
        }
        if (username && password) {
            baseService.post('/login', data).then(response => {
                if(response.status === 200){
                    const userData = {
                        name:response.data.name,
                        loginId:response.data._id,
                        userId:response.data.username
                    }
                    utils.setLocalstorage(userData);
                    this.props.history.push('/home');
                }
            }
            ).catch(error => {
                if (error.response.status === 401) {
                    this.setState({
                        serverError: error.response.data.error
                    })
                }
            })
        }

    }
    render() {
        const { username, password, submitted, serverError } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <div className="login-wrapper">
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {serverError && <Alert variant="outlined" severity="error">{serverError}</Alert>}
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            size="small"
                            value={username}
                            onChange={this.handleChange}
                            error={!username && submitted}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            autoComplete="current-password"
                            size="small"
                            onChange={this.handleChange}
                            error={!password && submitted}
                        />
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={6} >
                                <Button fullWidth type="submit" variant="contained" size="large" color="primary">
                                    Sign In
                  </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="outlined" onClick={this.registerNewUser} size="large" color="primary">
                                    Register
                  </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default Login;