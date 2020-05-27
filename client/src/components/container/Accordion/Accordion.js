import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import * as constants from '../../../constants';
import {getCheckboxData} from '../../../utils';
import { Checkbox } from '../../presentation/Checkbox/Checkbox';

import './Accordion.scss';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: true,
            filteredOption:constants.FILTERED_OPTIONS
        }
    }
    handleAccordion = () => {
        this.setState({
            filtered: !this.state.filtered
        })
    }

    filterClick = (e,option) => {
        const filterName = (e.target.id);
        let data = {...this.state.filteredOption};
        if(e.target.checked){
            data[option].push(filterName)
        }else{
            data[option].splice(data[option].indexOf(filterName),1)
        }
        this.setState({
            ...this.state,
            filteredOption:data
        }, () =>{
            this.props.filteredOption(this.state.filteredOption);
        });
    }

  
    
    render() {
        const accordionclass = this.state.filtered ? "right" : "down";
        const activeclass = !this.state.filtered ? "active" : "";
        const all_character = this.props.data;
        const species = getCheckboxData(all_character,constants.SPECIES);
        const gender = getCheckboxData(all_character,constants.GENDER);
        const origin = getCheckboxData(all_character,constants.ORIGIN, true);
        return (
            <Grid container className="accordion">
                <Grid item >           
                <div className="accordion-title" onClick={this.handleAccordion}>{constants.FILTERED_SOMETHING} <span className={`arrow ${accordionclass}`}></span></div>
                <div className={`filter-container ${activeclass}`}>
                    <div className="box">
                        <h4>Species Filter:</h4>
                        
                        {
                            species && species.map((item,i)=>{
                                return <Checkbox key={i} handleFilter={this.filterClick} option={constants.SPECIES} item={item} />
                            })
                        }
                        
                    </div>
                    <div className="box">
                        <h4>Gender Filter:</h4>
                        {
                            gender && gender.map((item,i)=>{
                                return <Checkbox handleFilter={this.filterClick} option={constants.GENDER} key={i} item={item} />
                            })
                        }
                    </div>
                    <div className="box">
                        <h4>Origin Filter:</h4>
                        {
                            origin && origin.map((item,i)=>{
                                return <Checkbox handleFilter={this.filterClick} option={constants.ORIGIN} key={i} item={item} />
                            })
                        }
                    </div>
                </div>
           
            </Grid>
            </Grid>
        )
    }
}

export default Accordion;
