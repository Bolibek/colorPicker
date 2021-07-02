import React, { Component } from "react";


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { num: 1 };
        this.genRand = this.genRand.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.makeTimer();
    }

    // makeTimer(){
    //     setInterval(()=>{
    //         let rand = Math.floor(Math.random()*this.props.maxNum);
    //         this.setState({num:rand})
    //     }, 1000)
    // }

    // handleClick(e) {
    //     this.setState({ clicked: true })
    // }

    genRand(){
        let rand = Math.floor(Math.random()*10)+1;
        this.setState({num: rand})
    }

    render() {
        return (
            <div>
                <h1>Your number is {this.state.num}</h1>
                {this.state.num === 7 
                  ? <h2>You win!!! </h2>
                  : <button onClick={this.genRand}>Clicker</button>}
                
                {/* <h1>Your button is {this.state.clicked? "clicked" : "not clicked"}</h1>
                <button onClick={this.handleClick}>Clicker</button> */}
            </div>

        )
    }
}

export default Game;;