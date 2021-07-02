import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import { Route, Switch } from "react-router-dom";
import Palette from "./colorPicker/Palette";
import seedColors from "./colorPicker/seedColors";
import {generatePalette} from "./colorPicker/colorHelper"

// import Food from "./router_patterns/Food";
// import Meal from "./router_patterns/Meal";
// import FoodSearch from "./router_patterns/foodSearch";
// import Navbar from "./router_patterns/Navbar"
// import Navbar from "./vendingMachine/Navbar";
// import VendingMachine from "./vendingMachine/VendingMachine";
// import Soda from "./vendingMachine/Soda";
// import Sardines from "./vendingMachine/Sardines";
// import Chips from "./vendingMachine/Chips";
import "./index.css";
// import JokeList from "./dadjoke/jokeList";
// import GitHubUser from './exercises/githubuser';
// import Zenquote from './exercises/zenquote';
// import Timer from './exercises/timer';
// import ToDoList from "./todolist/todolist"
// import Board from "./lightout/Board"
// import BoxContainer from "./colorBox/BoxContainer";
// import Hangman from "./hangman/Hangman"
// import CoinContainer from './coin/CoinContainer';
// import Lottery from './exercises/Lottery';
// import Rolldice from "./dice/Rolldice";
// import IconList from './exercises/IconList';
// import ScoreKeeper from './scoreKeeper';
// import Game from "./game/state"
// import Pokegame from "./PokeGame/pokegame.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Palette palette={generatePalette(seedColors[4])}/>






        {/* <Navbar />
        <Switch>
          <Route
            exact
            path="/food/:name"
            render={(routeProps) => <Food {...routeProps} />}
          />
          <Route
            exact
            path="/food/:foodName/drink/:drinkName"
            component={<Meal />}
          />
          <Route exact path="/" render={(foodProps)=> <FoodSearch {...foodProps}/>} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch> */}

        {/* <Route path="/food/banana" render={()=> <Food name="banana"/>}/>
        <Route path="/food/beef" render={()=> <Food name="beef"/>}/> */}

        {/* <Navbar />
        <Switch>
          <Route exact path='/' render={() => <VendingMachine />} />
          <Route exact path='/soda' render={() => <Soda />} />
          <Route exact path='/sardines' render={() => <Sardines />} />
          <Route exact path='/chips' render={() => <Chips />} />                 
        </Switch> */}
        {/* <Route exact path="/dadjoke/jokeList" component={JokeList}/> */}
        {/* <JokeList /> */}
        {/* <GitHubUser username="facebook"/>
        <GitHubUser username="bolibek"/> */}
        {/* <Zenquote /> */}
        {/* <Timer /> */}
        {/* <ToDoList /> */}
        {/* <Board /> */}
        {/* <Hangman /> */}
        {/* <BoxContainer /> */}
        {/* <CoinContainer /> */}
        {/* <Lottery />
        <Lottery title='Mini Daily' maxNum={15} numBalls={5} /> */}
        {/* <IconList /> */}
        {/* <ScoreKeeper /> */}
        {/* <Rolldice /> */}
        {/* <Game /> */}
        {/* <Game maxNum={7}/> */}
        {/* <Pokegame /> */}
      </div>
    );
  }
}

ReactDOM.render(
  // <BrowserRouter>
    <App />,
  // </BrowserRouter>,
  document.getElementById("root")
);
