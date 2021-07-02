import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        console.log("in constructor")
        this.state = {time: new Date()};
    }
    componentDidMount(){
        console.log("com did mount");
        // this.timerID= setInterval(() => {
        //     this.setState({time : new Date()})
        // }, 1000);
    }
    render() {
        console.log("in render")
        return (
            <div>
                <h1>{this.state.time.getSeconds()}</h1>
            </div>
        );
    }
}



export default Timer;
