import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { baseService } from '../../../service/apiService';
import Alert from '@material-ui/lab/Alert';
import * as constants from '../../../constants';

import './Register.scss';

/**
 * Define constant for Login form initial state
 */
const initialState = {
    name: "",
    username: "",
    password: "",
    submitted: false,
    serverError: "",
    userMsg: "",
    hideMsg: false
}


/**
 * @name Register
 * @extends Component
 */
class Register extends Component {

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
        this.setState({
            [name]: value
        }, () => {
            if (this.state.hideMsg) {
                this.setState({
                    hideMsg: false
                })
            }
        })
    }


    backToLogin = () => {
        this.props.history.push('/');
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
        const { name, username, password } = this.state;
        const data = {
            name: name,
            username: username,
            password: password
        }
        if (name && username && password) {

            baseService.post('/register', data).then(response => {
                if (response.status === 200) {
                    this.setState({
                        userMsg: "User Created Successfully",
                        name: "",
                        username: "",
                        password: "",
                        submitted: false,
                        hideMsg: true
                    })
                }
            }

            ).catch(error => {
                if (error.response.status === 401) {
                    this.setState({
                        serverError: constants.duplicateUser,
                        hideMsg: true
                    })
                }
            })
        }

    }
    render() {
        const { name, username, password, submitted, serverError, userMsg, hideMsg } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <div className="login-wrapper">
                    <Typography component="h1" variant="h5">
                        User Register
                </Typography>
                    {serverError && hideMsg && <Alert variant="outlined" severity="error">{serverError}</Alert>}
                    {userMsg && hideMsg && <Alert variant="outlined" severity="success">{userMsg}</Alert>}
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            autoFocus
                            size="small"
                            value={name}
                            onChange={this.handleChange}
                            error={!name && submitted}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
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
                            size="small"
                            onChange={this.handleChange}
                            error={!password && submitted}
                        />
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={6} >
                                <Button fullWidth type="submit" variant="contained" size="large" color="primary">
                                    Register
                  </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="outlined" onClick={this.backToLogin} size="large" color="primary">
                                    Back to Login
                  </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default Register;