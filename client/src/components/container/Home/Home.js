import React, { Component } from "react";
import { ItemList } from '../../presentation/ItemList/ItemList';
import { Header } from '../../presentation/Header/Header';
import Accordion from '../Accordion/Accordion';
import { baseService } from '../../../service/apiService';
import * as constants from '../../../constants';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            filteredDataList:[],
            filteredOption: constants.FILTERED_OPTIONS,
            searchText : '',
            sortOption:''
        }
    };

    componentDidMount(){
        this.getAllCharacter()
    };

    getAllCharacter = () =>{
        baseService.get('/character').then(response => {
            if(response.status === 200){
                // console.log(response.data)
                this.setState({
                    dataList:response.data,
                    filteredDataList:response.data
                })
            }
        }).catch(error =>{
            console.log(error)
        })
    };

    getFilteredData = () => {
        const {searchText, sortOption, filteredOption} = this.state;
        const data = {
            sorting: sortOption,
            searchName: searchText,
            filters: {
                species: filteredOption.species,
                gender:filteredOption.gender,
                origin:filteredOption.origin
            }
        };
        console.log(data)
        // console.log(`sortOption=${sortOption}&searchName=${searchText}
        // &species=[${filteredOption.species}]&gender=[${filteredOption.gender}]&origin=[${filteredOption.origin}]`)


        // const url = `/filters?sortOption=${sortOption}&searchName=${searchText}
        // &genderFilter=${filteredOption.gender}`;
        // console.log("test")
        baseService.post('/filters',data).then(response =>{
            this.setState({filteredDataList: response.data})
        }).catch(error => {
            console.log(error)
        })
    }


    addedFilterOption = (options) => {
        this.setState({
            filteredOption:options
        }, () =>{
            this.getFilteredData();
        })
    }

    searchByName = (e) =>{
        const searchText = e.target.value.trim();
        this.setState({
            searchText:searchText
        }, () => {
            this.getFilteredData();
        });
    }

    handleSorting = (sortOption) => {   
        this.setState({
            sortOption:sortOption
        }, () =>{
            this.getFilteredData();
        });        
    }

    handleLogout = () =>{
        this.props.history.push('/');
    }

    render() {
        return (
            <>
                <Header searchByName={this.searchByName} handleSorting={this.handleSorting} handleLogout={this.handleLogout} />
                <Accordion data={this.state.dataList} filteredOption={this.addedFilterOption} />
                <ItemList data={this.state.filteredDataList} />
            </>
        )
    }
}

export default Home;