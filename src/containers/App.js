import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll"


class App extends Component {

    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }


    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(user => this.setState({ robots: user }))
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })

    };


    render() {
        const {robots,searchField}=this.state;
        const filteredRobots = robots.filter(robot => {
            return (robot.name.toLowerCase().includes(searchField.toLowerCase()));
        });

        if (!robots.length) {
            return (
                <h1 className='heading tc'>Loading...</h1>
            )
        }
        else {
            return (
                <div className="tc">
                    <h1 className="heading f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }
    }
};

export default App;