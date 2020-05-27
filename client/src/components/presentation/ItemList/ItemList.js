import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './ItemList.scss';
import * as constants from '../../../constants';
import { getCreatedYear } from "../../../utils/";

export const ItemList = (props) => {
    return (
        // <div className="item-container">
        <Grid container spacing={0}>

        {
                props.data && props.data.map((item, ind) => {
                    return (
                        <Grid className="item-container" item key={ind} xs={6} sm={4} md={3} lg={3} xl={2}>
                            <Paper className="item" >
                        
                            <img src={item.image} alt="" />
                            <div className="name-container">
                                <h3>{item.name}</h3>
                                <div className="id">{`Id: ${item.id} - created ${getCreatedYear(item.created)} years ago`}</div>
                            </div>
                            <ul className="bottom-container">
                                <li><label>{constants.STATUS_LIST}</label> <span>{item.status}</span></li>
                                <li><label>{constants.SPECIES_LIST}</label> <span>{item.species}</span></li>
                                <li><label>{constants.GENDER_LIST}</label> <span>{item.gender}</span></li>
                                <li><label>{constants.ORIGIN_LIST}</label> <span>{item.origin.name}</span></li>
                                <li><label>{constants.LOCATION_LIST}</label> <span>{item.location.name}</span></li>
                            </ul>

                       
                        </Paper>
                        </Grid>
                    )
                })
            }
            </Grid>
        // </div>
        // <div className="item-container">
        //     {
        //         props.data && props.data.map((item, ind) => {
        //             return (
        //                 <div key={ind} className="item">
        //                     <img src={item.image} />
        //                     <div className="name-container">
        //                         <h3>{item.name}</h3>
        //                         <div className="id">{item.id}: this is a id</div>
        //                     </div>
        //                     <ul className="bottom-container">
        //                         <li><label>{constants.STATUS_LIST}</label> <span>{item.status}</span></li>
        //                         <li><label>{constants.SPECIES_LIST}</label> <span>{item.species}</span></li>
        //                         <li><label>{constants.GENDER_LIST}</label> <span>{item.gender}</span></li>
        //                         <li><label>{constants.ORIGIN_LIST}</label> <span>{item.origin.name}</span></li>
        //                         <li><label>{constants.LOCATION_LIST}</label> <span>{item.location.name}</span></li>
        //                     </ul>

        //                 </div>
        //             )
        //         })
        //     }
        // </div>
    )
}