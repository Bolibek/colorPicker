import React, { Component } from "react";
import "./Food.css";
import { Redirect } from "react-router-dom";

class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    const name = this.props.match.params.name;
    if(/\d/.test(name)) this.props.history.push(`/notfound`)
    const url = `https://source.unsplash.com/1600x900/?${name}`;
    return (
      <div className="Food">
        {/\d/.test(name) ? (
          <Redirect to="/notfound" />
        ) : (
          <div>
            <h1>I hate some {name}</h1>
            <img src={url} alt={name} />
          </div>
        )}
      </div>
    );
  }
}

export default Food;
