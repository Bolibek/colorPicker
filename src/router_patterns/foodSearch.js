import React, {Component} from 'react';
import {Link} from "react-router-dom";

class FoodSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {query:""};
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(evt){
        this.setState({query: evt.target.value})
    }
    handleSubmit(){
        alert("aaa");
        this.props.history.push(`/food${this.state.query}`)
    }
    render() {
        return (
            <div>
                <h1>Search for a food</h1>
                <input 
                type="text"
                placehlder="search for food"
                value={this.state.query}
                onChange={this.handleChange}
                />
                <Link to={`/food/${this.state.query}`}>Go!</Link>
                <button onClick={this.handleSubmit}>Push</button>
            </div>
        );
    }
}



export default FoodSearch;
