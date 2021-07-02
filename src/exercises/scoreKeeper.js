import React,{Component} from "react";

class ScoreKeeper extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0
        }
        this.singleKill = this.singleKill.bind(this)
        this.tripleKill = this.tripleKill.bind(this)
    }

    incSc(cS) {
        return {score: cS.score +1}
    }

    tripleKill(){
        this.setState(this.incSc);
        this.setState(this.incSc);
        this.setState(this.incSc);
    }
    singleKill(){
        this.setState({score: this.state.score +1})
    }
    render(){
        return (
            <div>
              <h1>Score is {this.state.score}</h1>
              <button onClick={this.singleKill}>Single kill!</button>
              <button onClick={this.tripleKill}>Triple kill!</button>
            </div>
        )
    }
}

export default ScoreKeeper;