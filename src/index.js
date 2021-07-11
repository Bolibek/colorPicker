import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Palette from "./colorPicker/Palette";
import PaletteList from "./colorPicker/PaletteList";
import SingleColorPalette from "./colorPicker/SingleColorPalette";
import Page from "./colorPicker/Page";
import NewPaletteForm from "./colorPicker/NewPaletteForm";
import seedColors from "./colorPicker/seedColors";
import { generatePalette } from "./colorPicker/colorHelper";

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  deletePalette(id) {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    );
  }
  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }
  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='page' timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path='/palette/new'
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        palettes={this.state.palettes}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path='/palette/:paletteId/:colorId'
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path='/'
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path='/palette/:id'
                  render={routeProps => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}



// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import { Route, Switch } from "react-router-dom";
// import Palette from "./colorPicker/Palette";
// import seedColors from "./colorPicker/seedColors";
// import {generatePalette} from "./colorPicker/colorHelper";
// import PaletteList from "./colorPicker/PaletteList";
// import SingleColorPalette from "./colorPicker/SingleColorPalette";
// import NewPaletteForm from "./colorPicker/NewPaletteForm";

// import Food from "./router_patterns/Food";
// import Meal from "./router_patterns/Meal";
// import FoodSearch from "./router_patterns/foodSearch";
// import Navbar from "./router_patterns/Navbar"
// import Navbar from "./vendingMachine/Navbar";
// import VendingMachine from "./vendingMachine/VendingMachine";
// import Soda from "./vendingMachine/Soda";
// import Sardines from "./vendingMachine/Sardines";
// import Chips from "./vendingMachine/Chips";
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
        {/*  <Lottery />
         <Lottery title='Mini Daily' maxNum={15} numBalls={5} /> */}
        {/* // <IconList /> */}
        {/* <ScoreKeeper /> */}
        {/* <Rolldice /> */}
        {/* <Game /> */}
        {/* <Game maxNum={7}/> */}
        {/* <Pokegame /> */}
     

ReactDOM.render(
  <BrowserRouter>
    <App />,
 </BrowserRouter>,
  document.getElementById("root")
);
