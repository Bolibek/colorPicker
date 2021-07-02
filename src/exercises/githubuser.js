import React, { Component } from 'react';
import axios from 'axios';
import "./GitHubUser.css"


class GitHubUser extends Component {
    constructor(props) {
        super(props);
        this.state = {imgUrl: "", name: "" };
    }
    async componentDidMount() {
        const url = `https://api.github.com/users/${this.props.username}`
        let response = await axios.get(url);
        // .then(response => {
        //     setTimeout(
        //         function () {
        //             this.setState({ quote: response.data, isLoaded: true })
        //         }.bind(this), 3000
        //     )
        

        // })
        let data = response.data;
        this.setState({ imgUrl: data.avatar_url, name: data.name })
    }
    render() {
        return (
            <div>
                <h1>Git hub user</h1>
                <img src={this.state.imgUrl} />
            </div>
        );
    }
}


export default GitHubUser;
