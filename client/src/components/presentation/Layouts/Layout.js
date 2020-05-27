import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import TopNav from '../../presentational/Nav/Nav';

export const Layout = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <Grid container>
            <Grid item xs={3}>
                filter
            </Grid>
            <Grid container item xs={9}>
                <Grid container item xs={12} spacing={3}>
                    <div >fsdfsdfsdf</div>
                </Grid>
                <Grid item xs={12} container spacing={3} >
                {props.children}
                </Grid>
            </Grid>
        </Grid>
        </div>
    )

}