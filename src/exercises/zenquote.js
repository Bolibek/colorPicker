import React, { Component } from 'react';
import axios from 'axios';
import "./zenquote.css"


class Zenquote extends Component {
    constructor(props) {
        super(props);
        this.state = { quote: "", isLoaded: false };
    }
    componentDidMount() {
        
        axios.get("https://api.github.com/zen").then(response => {
            setTimeout(
                function () {
                    this.setState({ quote: response.data, isLoaded: true })
                }.bind(this), 3000
            )
        

        })
    }
    render() {
        return (
            <div>
                {/* {
                this.state.isLoaded ? (
                <div>
                    <h1>Quote</h1>
                    <p>{this.state.quote}</p>
                </div>):(
                <div>
                    <h1>Wait!</h1>
                    <div className="loader" />
                </div>
                    )
                } */}
            </div>
        );
    }
}


export default Zenquote;
